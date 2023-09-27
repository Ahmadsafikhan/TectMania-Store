import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const StripeCheckoutScreen = ({ totalPrice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStripeCheckout = async () => {
    try {
      const response = await axios.post("/api/orders/create-checkout-session", {
        amount: totalPrice * 100, // Stripe expects the amount in cents
      });
      const sessionId = response.data.sessionId;

      const stripe = await loadStripe("pk_test_51NpSHnA4QkeJV4C9beuN1K4v4MoBHt4BtKellFkysjyVoC6Vr8e2J27L6l1rlqwPZdIhGCuSiuOyTCJixuytc3AP003RDlSEnv"); // Replace with your actual Stripe publishable key

      // Redirect to the Stripe checkout page
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("An error occurred while processing your payment.");
    }
  };

  return (
    <button
      type="button"
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      disabled={totalPrice === 0}
      onClick={handleStripeCheckout}
    >
      Pay with Stripe
    </button>
  );
};

export default StripeCheckoutScreen