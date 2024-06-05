import express, { Request, Response, NextFunction } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");

const endpointSecret = process.env.ENDPOINT_SECRET || "";

export const webhookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sig = req.headers["stripe-signature"];
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
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
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
          price: "price_1PNtkVP8wgatYK4XDpWe9ZZL", // Lägg till rätt pris-ID för din prenumeration
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/dashboard",
      cancel_url: "http://localhost:5173/dashboard",
    });

    res.status(200).json({ url: session.url, sessionId: session.id }); // Returnera sessionens ID till klienten
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

//Denna kod skapar en prenumeration baserat på ett knapptryck
export const createSubscription = async (req: Request, res: Response): Promise<void> => {
    const customerId = "cus_Pv1FMTbo4mFLOQ";

    try {
      // Retrieve customer details
      const customer = await stripe.customers.retrieve(customerId);
      
      // Type assertion to handle the possibility of undefined
      const invoiceSettings = (customer as Stripe.Customer).invoice_settings;
      let defaultPaymentMethod: string | undefined = invoiceSettings?.default_payment_method as string | undefined;
      
      // If no default payment method, create one
      if (!defaultPaymentMethod) {
        // Use a test payment method token
        const paymentMethodToken = 'pm_card_visa';
        
        // Attach the payment method to the customer
        const paymentMethod = await stripe.paymentMethods.attach(paymentMethodToken, { customer: customerId });
        
        // Set the payment method as the default for the customer
        await stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: paymentMethod.id,
          },
        });
        
        defaultPaymentMethod = paymentMethod.id;
      }
  
      // Create the subscription with the default payment method
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: "price_1PNtkVP8wgatYK4XDpWe9ZZL",
          },
        ],
        default_payment_method: defaultPaymentMethod,
      });
  
      res.status(200).json(subscription);
    } catch (error:any) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ error: error.message });
    }
  };
export default { webhookHandler, checkoutSession, createSubscription };
