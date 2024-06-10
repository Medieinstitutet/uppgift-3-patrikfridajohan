import express, { Request, Response, NextFunction } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");

const endpointSecret = process.env.ENDPOINT_SECRET || "";

export const webhookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  /*  const sig = req.headers["stripe-signature"];
  if (!sig) {
    return res.status(400).send("Missing Stripe signature");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error: any) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      // Logic to handle customer.subscription.created event
      break;
    case "customer.subscription.deleted":
      // Logic to handle customer.subscription.deleted event
      break;
    case "customer.subscription.updated":
      // Logic to handle customer.subscription.updated event
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  } */

  // Return a 200 response to acknowledge receipt of the event
  res.json({});
};

// Denna funktion skapar en session där man kan betala med sitt kort

export const checkoutSession = async (req: Request, res: Response) => {
  const subscription = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1PQ5SNGtY97KMuDYUzPSaoeq", // Lägg till rätt pris-ID för din prenumeration
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/user/dashboard",
      cancel_url: "http://localhost:5173/",
    });

    res.status(200).json({ url: session.url, sessionId: session.id }); // Returnera sessionens ID till klienten
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

//Denna kod skapar en prenumeration baserat på ett knapptryck

export default { webhookHandler, checkoutSession};
