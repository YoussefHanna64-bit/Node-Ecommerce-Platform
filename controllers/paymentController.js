import Stripe from "stripe";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatus from "../utils/httpStatus.js";
import appError from "../utils/appError.js";

export const createPaymentIntent = asyncWrapper(async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { amount } = req.body;

    if (!amount) {
        const error = appError.create(
            "Amount is required",
            400,
            httpStatus.FAIL
        );
        return next(error);
    }

    if (amount <= 0) {
        const error = appError.create(
            "Amount must be greater than 0",
            400,
            httpStatus.FAIL
        );
        return next(error);
    }

    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",

    });

    res.status(200).json({
        status: httpStatus.SUCCESS,
        clientSecret: paymentIntent.client_secret
    });
});