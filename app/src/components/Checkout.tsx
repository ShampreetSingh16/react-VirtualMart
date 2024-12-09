import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../redux/selectCartTotal";
import { RootState } from "../redux/store";

const Checkout = () => {
    const navigate = useNavigate();
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const amountToPay = useSelector(selectCartTotal).total;
  useEffect(() => {
    const initializeStripe = async () => {
      try {
        if (!isLoggedIn) {
          navigate("/login");
          return;
        }
        if (!stripePromise) {
          const { data: config } = await axios.get("https://virtualmartserver.onrender.com/config");
          setStripePromise(loadStripe(config.key));
        }
        if (amountToPay > 0 && !clientSecret) {
          const { data } = await axios.post("https://virtualmartserver.onrender.com/create-payment-intent",
            { amount: amountToPay * 100 },
            { withCredentials: true }
          );
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.error("Error initializing Stripe:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn && amountToPay > 0 && (!stripePromise || !clientSecret)) {
      initializeStripe();
    }
  }, [isLoggedIn, navigate, stripePromise, amountToPay, clientSecret]);
  
    
    if (isLoading) {
        return <p className="text-lg text-black font-extralight my-16 sm:my-28 text-center">Loading...</p>;
    }

    if (!isLoggedIn) {
        return <p className="text-lg text-black font-extralight 
        my-16 sm:my-28 text-center">You must be logged in to complete the payment.</p>;
    }

    if (amountToPay <= 0) {
        return <p className="text-lg text-black font-extralight my-16
        sm:my-28 text-center">Your cart is empty. Please add items to proceed with the payment.</p>;
    }

    return (
        <>
            {clientSecret && stripePromise ? (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                    <CheckoutForm amount={amountToPay} />
                </Elements>
            ) : (
                <p>Failed to initialize payment. Please try again later.</p>
            )}
        </>
    );
};

export default Checkout;
