import express from "express";
import { checkoutSession, createSubscription, getPlans, getPrice, webhookHandler } from "./stripeController";

const router = express.Router();

// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post("/webhook", webhookHandler);

router.post("/create-checkout-session", checkoutSession);
router.post("/create-subscription", createSubscription)
router.get("/plans", getPlans)
router.get("/price", getPrice)

export default router;
