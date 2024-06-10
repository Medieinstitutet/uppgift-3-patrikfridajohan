import express from "express";
import { checkoutSession, webhookHandler } from "./stripeController";

const router = express.Router();

// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post("/webhook", webhookHandler);

router.post("/create-checkout-session", checkoutSession);


export default router;
