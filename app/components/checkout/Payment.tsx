import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";

export const Payment: React.FC = () => {
  const elements = useElements();
  const stripe = useStripe();
  const cart = useSelector((state: RootState) => state.cart.value);

  const cartTotal = cart.reduce((acc, book) => {
    return acc + book.price;
  }, 0);

  console.log(cartTotal);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { data: response } = await axios.post(
      `https://localhost:7147/create-payment-intent?amount=${cartTotal}`
    );

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(response.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: "John",
          },
        },
      });

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(stripeError);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="card-element">Card</label>
      <CardElement id="card-element" />
      <button
        className="text-lg font-bold w-[92%] ml-[4%] my-auto mb-4 mt-4 bg-blue-900 h-12 text-white
         rounded-md px-4 hover:brightness-[60%]"
      >
        Complete Order
      </button>
    </form>
  );
};

export default Payment;
