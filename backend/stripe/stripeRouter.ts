import express from "express";
<<<<<<< errorHandling-backend
import { checkoutSession, createSubscription, getPlans, getPrice, webhookHandler } from "./stripeController";
=======
import { checkoutSession, webhookHandler } from "./stripeController";
>>>>>>> main

const router = express.Router();

// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post("/webhook", webhookHandler);

router.post("/create-checkout-session", checkoutSession);
<<<<<<< errorHandling-backend
router.post("/create-subscription", createSubscription)
router.get("/plans", getPlans)
router.get("/price", getPrice)
=======

>>>>>>> main

export default router;
