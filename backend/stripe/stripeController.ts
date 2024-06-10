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
    /* case "checkout.session.completed":
      console.log(eventData);
      break;
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
      console.log(eventData);

      break;
    default:
      console.log(`Unhandled event type ${req.body.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ recieved: true });
};

// Denna funktion skapar en session där man kan betala med sitt kort

export const checkoutSession = async (req: Request, res: Response) => {
  const { planId, userId } = req.body;
  console.log("retrieved userid: ", userId);

  let subscriptionPlan: string;

  if (planId === 2) {
    subscriptionPlan = "price_1PQ5SNGtY97KMuDYUzPSaoeq";
  } else if (planId === 3) {
    subscriptionPlan = "price_1PQ5ShGtY97KMuDYUY112zee";
  } else {
    res.status(400).json({ error: "Invalid plan ID" });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: subscriptionPlan, // Lägg till rätt pris-ID för din prenumeration
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/user/dashboard",
      cancel_url: "http://localhost:5173/",
      metadata: { userId: userId.toString() },
    });
    console.log(userId);

    const added = new Date();
    const updated = new Date();
    const enddate = new Date();
    enddate.setDate(added.getDate() + 7);

    // Infoga prenumerationen i databasen
    const queryDataUserSubscription = `INSERT INTO data_users_subscriptions (subscriptionid, uid, added, enddate, active)
                   VALUES (?, ?, ?, ?, ?)`;
    const values = [planId, userId, added, enddate, 1];

    const queryUpdateDataUser = `UPDATE data_users SET activesubscriptionid = ?, updated = ? WHERE id = ?`;
    const updateValues = [planId, updated, userId];

    const [result] = await pool.execute(queryDataUserSubscription, values);
    const [result2] = await pool.execute(queryUpdateDataUser, updateValues);

    res.status(200).json({ url: session.url, sessionId: session.id }); // Returnera sessionens ID till klienten
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export const cancelSubscription = async (req: Request, res: Response) => {
    try {
        const { userId, subscriptionId } = req.body;
  
        // DO SOMETHING WITH STRIPE HERE =)
      /*   const subscription = await stripe.subscriptions.cancel(
          'sub_1MlPf9LkdIwHu7ixB6VIYRyX'
        ); */
  
        res.status(200).json({ message: 'Subscription canceled successfully' });
    } catch (error) {
        console.error('Error canceling subscription:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }


//Denna kod skapar en prenumeration baserat på ett knapptryck

export default { webhookHandler, checkoutSession, cancelSubscription};
