import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";


// Component to show the payment failure
const PaymentFailure = () => {

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 px-6 py-8">
        <div className="flex flex-col items-center gap-3 font-semibold text-red-700 mb-6">
          <IoIosCloseCircle className="text-red-700 text-5xl" />
          <h2 className="font-semibold text-black text-3xl">Payment Failed</h2>
          <h4 className="font-light text-black text-xl">We encountered an issue with your payment.</h4>
        </div>
        {/* Payment failed message for user */}
        <p className="text-center text-lg mb-6 font-light">
          Unfortunately, we couldn't process your payment.
          <br /> Please try again or contact support if the issue persists.
        </p>

        <div className="flex justify-center mb-6">
          <div className="border-t-2 border-gray-200 w-32 my-4"></div>
        </div>
        {/* Link to cart */}
        <div className="text-center">
          <Link
            to="/cart"
            className="bg-red-700 text-white py-3 px-8 
            rounded-md text-lg font-semibold hover:opacity-75">
            Try Again
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentFailure;
