import express, { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { updateStatus } from "./utils";
import pool from "../mysql";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");

const endpointSecret = process.env.ENDPOINT_SECRET || "";

export const webhookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const eventType = req.body.type;
  const eventData = req.body.data.object;
  // Handle the event
  switch (eventType) {
    case "payment_intent.payment_failed":
      console.log(eventType);
      const customerId = eventData.customer;

      // Retrieve the customer to get user metadata (if stored) or email to find the user
      try {
        const customer = await stripe.customers.retrieve(customerId);

        if (!customer.deleted) {
          const userId: string = customer.metadata.userId; // or const userEmail = customer.email;

          // Update the database to restrict user access
          const queryRestrictUserAccess = `UPDATE data_users_subscriptions SET active = 0 WHERE uid = ?`;
          await pool.execute(queryRestrictUserAccess, [userId]);

          console.log(
            `Restricted access for user ${userId} due to payment failure`
          );
        } else {
          console.error(
            `Customer ${customerId} is deleted, cannot restrict access`
          );
        }
      } catch (error) {
        console.error(
          `Error restricting access for user due to payment failure:`,
          error
        );
      }
      break;

    case "invoice.payment_failed":
      console.log(eventType);
      console.log(eventData);

      const invoiceSubId = eventData.subscription;
      const hostedInvoiceUrl = eventData.hosted_invoice_url;

      try {
        const queryUpdateInvoiceUrl = `UPDATE data_users_subscriptions SET stripeInvoiceUrl = ? WHERE stripeSubId = ?`;
        await pool.execute(queryUpdateInvoiceUrl, [
          hostedInvoiceUrl,
          invoiceSubId,
        ]);

        console.log(
          `Updated invoice ${invoiceSubId} with hosted URL ${hostedInvoiceUrl}`
        );
      } catch (error) {
        console.error(
          `Error updating invoice ${invoiceSubId} with hosted URL:`,
          error
        );
      }

      break;

    case "checkout.session.completed":
      const sessionId = eventData.id;
      const subId = eventData.subscription;

      if (sessionId && subId) {
        try {
          const session = await stripe.checkout.sessions.retrieve(sessionId);
          const clientReferenceId: any = session.client_reference_id;
          const [userId, planId] = clientReferenceId.split("-");

          const added = new Date();
          const enddate = new Date();
          enddate.setDate(added.getDate() + 7);

          // Infoga prenumerationen i databasen
          const queryDataUserSubscription = `INSERT INTO data_users_subscriptions (subscriptionid, uid, added, enddate, active, stripeSubId)
                                             VALUES (?, ?, ?, ?, ?, ?)`;
          const values = [planId, userId, added, enddate, 1, subId];

          await pool.execute(queryDataUserSubscription, values);

          console.log(`Updated user ${userId} with subscription ${planId}`);
          console.log(`Created subscription with ID: ${subId}`);
        } catch (error) {
          console.error(
            `Error updating user with subscription ID ${subId}:`,
            error
          );
        }
      }
      break;

    case "customer.subscription.deleted":
      const subscriptionId = eventData.id;

      try {
        // Update the database to mark the subscription as inactive
        const queryUpdateSubscription = `UPDATE data_users_subscriptions SET active = ? WHERE stripeSubId = ?`;
        await pool.execute(queryUpdateSubscription, [0, subscriptionId]);

        console.log(`Subscription ${subscriptionId} marked as inactive`);
      } catch (error) {
        console.error(
          `Error handling subscription deletion for ${subscriptionId}:`,
          error
        );
      }
      break;
    case "invoice.paid":
      const paidCustomerId = eventData.customer;
      const invoiceSubIdPaid = eventData.subscription;

      try {
        const customer = await stripe.customers.retrieve(paidCustomerId);

        if (!customer.deleted) {
          const userId: string = customer.metadata.userId;

          // Update the database to set active to 1 and stripeInvoiceUrl to null
          const queryUpdateUserAccess = `UPDATE data_users_subscriptions SET active = 1, stripeInvoiceUrl = NULL WHERE stripeSubId = ?`;
          await pool.execute(queryUpdateUserAccess, [invoiceSubIdPaid]);

          console.log(
            `Restored access for user ${userId} with subscription ${invoiceSubIdPaid}`
          );
        } else {
          console.error(
            `Customer ${paidCustomerId} is deleted, cannot restore access`
          );
        }
      } catch (error) {
        console.error(
          `Error restoring access for user after invoice payment:`,
          error
        );
      }
      break;
    /*
    case "payment_intent.succeeded":
      console.log(eventData);
      break;
    case "invoice.paid":
      console.log(eventData);
      // Logic to handle customer.subscription.created event
      break;
    case "invoice.payment.succeeded":
      console.log(eventData);
      break; */
    case "customer.subscription.updated":
      // console.log(eventData);

      break;
    default:
      console.log(`Unhandled event type ${req.body.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ recieved: true });
};

// Denna funktion skapar en session där man kan betala med sitt kort

export const checkoutSession = async (req: Request, res: Response) => {
  const { planId, userId, userEmail } = req.body;
  console.log("retrieved userid: ", userId);
  console.log("Received request to create checkout session:", req.body);

  let subscriptionPlan: string;

  if (planId === 2) {
    subscriptionPlan = "price_1PQ5SNGtY97KMuDYUzPSaoeq";
  } else if (planId === 3) {
    subscriptionPlan = "price_1PQ5ShGtY97KMuDYUY112zee";
  } else {
    console.error("Invalid plan ID:", planId);
    res.status(400).json({ error: "Invalid plan ID" });
    return;
  }

  try {
    // Sends the customer from website to Stripe to avoid double customer in Stripe
    let customer;
    const existingCustomers = await stripe.customers.list({ email: userEmail });
    console.log("Existing customers retrieved from Stripe:", existingCustomers);
    customer = existingCustomers.data[0];

    // If the user does not have an active subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: customer.id,
      line_items: [
        {
          price: subscriptionPlan,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/user/dashboard",
      cancel_url: "http://localhost:5173/",
      client_reference_id: `${userId}-${planId}`,
    });
    console.log(userId);
    console.log("Created checkout session with Stripe:", session);

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

// Register Stripe Customer
export const register = async (req: Request, res: Response) => {
  const { email, name, userId } = req.body;

  try {
    const stripeUser = await stripe.customers.create({
      email: email,
      name: name,
      metadata: { userId: userId },
    });
    // Retrieve the Stripe customer ID
    const stripeCustomerId = stripeUser.id;

    // Update the data_users table with the Stripe customer ID
    const queryUpdateUser = `UPDATE data_users SET stripecustomerid = ? WHERE id = ?`;
    await pool.execute(queryUpdateUser, [stripeCustomerId, userId]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Cancel subscription
export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Query the database to get the stripeSubId
    const [rows]: [any[], any] = await pool.query(
      "SELECT stripeSubId FROM data_users_subscriptions WHERE uid = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const stripeSubId = rows[0].stripeSubId;

    if (!stripeSubId) {
      return res.status(400).json({ error: "No subscription found for user" });
    }

    // Cancel the subscription with Stripe
    const subscription = await stripe.subscriptions.update(stripeSubId, {
      cancel_at_period_end: true,
    });
    // Update the database to reflect the cancellation if needed
    // Example: set activesubscriptionid to null or another appropriate field

    res
      .status(200)
      .json({ message: "Subscription canceled successfully", subscription });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

//Denna kod skapar en prenumeration baserat på ett knapptryck

export default {
  webhookHandler,
  checkoutSession,
  cancelSubscription,
  register,
};
