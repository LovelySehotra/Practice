import {
    STRIPE_SECRET,
    PAYMENT_SUCCESS_REDIRECT,
    PAYMENT_CANCEL_REDIRECT,
  } from "@/config";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SECRET);

export class CheckoutService{
    constructor(){}
    async create(){
        const session = await stripe.checkout.sessions.create({
            success_url: 'https://example.com/success',
            line_items: [
              {
                quantity: 2,
                price_data: {
                    product_data: {
                      name: "StoneTEKK",
                    },
                    currency: "INR",
                    unit_amount: 300 * 100,
                  },
                },
            ],
            mode: 'payment',
          })
          return session.url
    }
    async stripeWebhook(payload) {
        return true
      }
}