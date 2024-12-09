import { Link } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation } from "react-router-dom";

// Component to show the after payment is successfully done
const PaymentSuccess = () => {

  //using the react uselocation functionality to gtet the current path 
  const location = useLocation();
  //getting the paid amount query parameter form the url
  const params = new URLSearchParams(location.search);
  const amountPaid = params.get("amount")

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 px-6 py-8 ">
        <div className="flex flex-col items-center gap-3 font-semibold text-green-700 mb-6">
          <IoIosCheckmarkCircle className="text-green-700 text-5xl" />
          <h2 className="font-semibold text-black text-3xl">Payment Successful</h2>
          <h4 className="font-light text-black text-xl">Thank you for your order!</h4>
        </div>
        {/* Payment sucess message for user */}
        <p className="text-center text-lg mb-6 font-light">
          Your payment of {amountPaid} has been successfully received
          <br /> and your order has been successfully placed ,
          you will receive a confirmation email shortly.
        </p>

        <div className="flex justify-center mb-6">
          <div className="border-t-2 border-gray-200 w-32 my-4"></div>
        </div>
        {/* Link to home */}
        <div className="text-center">
          <Link
            to="/"
            className="bg-black text-white py-3 px-8 
          rounded-md text-lg font-semibold hover:opacity-75">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
