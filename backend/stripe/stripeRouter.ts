import express from "express";
import { cancelSubscription, checkoutSession, register, webhookHandler } from "./stripeController";


const router = express.Router();

// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post("/webhook", webhookHandler);

router.post("/create-checkout-session", checkoutSession);
// Cancel a subscription
router.post('/cancel-subscription', cancelSubscription);
router.post('/register', register);


export default router;
