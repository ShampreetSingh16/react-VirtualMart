import { useStripe, useElements, PaymentElement, AddressElement, LinkAuthenticationElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector , useDispatch} from "react-redux";
import { RootState } from "../redux/store";
import { clearCart } from "../redux/slices/cartSlice";

type CheckoutType = {
  amount: number;
};

const CheckoutForm = ({ amount }: CheckoutType) => {

  //getting stripe and context functionalities
  const stripe = useStripe();
  const elements = useElements();

  //state to store the error and laoding information
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // navigate for redirection after successful payment
  const navigate = useNavigate();
  //to dispatch clear cart function
  const dispatch = useDispatch();

  const items =  useSelector((state : RootState) => state.cart.items);
  const userID = useSelector((state : RootState) => state.auth.userId);

  //function to handle payment sucess and save order in database
  const handleSuccess = async (paymentIntentId: string ,  items: any, userID: string) => {
   
    try {
      const response = await axios.post("https://virtualmartserver.onrender.com/orders", {
        paymentIntentId,
        items,
        userID
      });
      if (response.status === 201) {
        dispatch(clearCart());
        navigate(`/paymentsuccess?amount=${amount}`);
      } else {
        console.error("Failed to save order in MongoDB");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  //function handle the form submission 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe or Elements not properly initialized.");
      setLoading(false);
      return;
    }

    try {
      const { paymentIntent, error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (paymentError) {
        setError(paymentError.message || "Payment failed.");
      } else if (paymentIntent) {
        const paymentIntentId = paymentIntent.id;
        switch (paymentIntent.status) {
          case "succeeded":
            if (userID) {
              await handleSuccess(paymentIntentId, items, userID);
              navigate(`/paymentsuccess?amount=${amount}`);
            }
            break;
          case "processing":
            toast.info("Your payment is being processed...");
            break;
          case "requires_payment_method":
            setError("Payment was not successful. Please try again.");
            break;
          default:
            setError("Payment failed. Please try again.");
            navigate("/paymentfailure");
            break;
        }
      }
    } catch (err) {
      setError("An unexpected error occurred during payment.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-8 my-8 w-3/4 mx-auto" onSubmit={handleSubmit}>
      {error && <div className="text-red-500 my-6 mx-2">{error}</div>}
      <div className="flex sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row space-y-4 space-x-4">
        {/*component to get the customer email  */}
        <div className="flex-1">
          <fieldset className="p-8 my-4 mx-2 border rounded-lg h-max">
            <legend className="text-left font-semibold text-lg md:text-base sm:text-sm">Contact Info</legend>
            <LinkAuthenticationElement />
          </fieldset>
          {/* component to get the shipping information  */}
          <fieldset className="p-8 my-4 mx-2 border flex-1 rounded-lg">
            <legend className="text-left font-semibold text-lg md:text-base sm:text-sm">Shipping Details</legend>
            <AddressElement options={{
              mode: "shipping",
              fields: { phone: "always" },
              validation: {
                phone: { required: "always" }
              }
            }} />
          </fieldset>
        </div>
        {/* component for taking the payment */}
        <fieldset className="p-8 my-4 mx-2 border flex-1 rounded-lg h-max">
          <legend className="text-left font-semibold text-lg md:text-base sm:text-sm">Payment</legend>
          <PaymentElement options={{ layout: "auto" }} />
          <button
            disabled={loading || !stripe || !elements}
            className="bg-black p-4 text-white my-6 mx-2 rounded-md font-bold w-full hover:opacity-75">
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </fieldset>
      </div>
    </form>
  );
};

export default CheckoutForm;
