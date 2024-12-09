import { BiMinus, BiPlus } from "react-icons/bi";
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { RootState } from '../redux/store';
import { removerFromCart , increaseQty , decreaseQty , clearCart } from '../redux/slices/cartSlice';
import { selectCartTotal } from "../redux/selectCartTotal";

const Cart = () => {

  const cart = useSelector((state : RootState) => state.cart.items);
  const dispatch = useDispatch();
   
  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("Cart");
  }

  const { subTotal, shippingFee , total } = useSelector(selectCartTotal);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      {/* checking if there is product in cart */}
      {cart.length === 0 ? (
        <p className="text-2xl text-black font-extralight my-16 sm:my-28 text-center">Your cart is empty.</p>
      ) : (
        // If product is in cart then show the product info
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12 w-full">
          <div className="overflow-x-auto flex-1">
            <h1 className="text-2xl sm:text-3xl font-medium pb-4 text-left">Your Cart</h1>
            <table className="min-w-full table-auto border-collapse p-2">
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product.id} className="border-b-2 border-gray-100">
                    <td className="p-4 text-start">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        {/* Product Image and Info */}
                        <div className="flex space-x-4 w-full md:w-auto">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 object-contain bg-zinc-100 border rounded-lg p-2"
                          />
                          <div className="flex flex-col justify-center space-y-2">
                            <p className="font-semibold text-base sm:text-lg">{item.product.name}</p>
                            <p className="font-medium text-sm text-gray-700">Brand: {item.product.brand}</p>
                            <p className="font-medium text-sm text-gray-700">Color: {item.selectedColor}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-4 pt-4">
                              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                <button
                                  onClick={() => dispatch(decreaseQty({productID : item.product.id, selectedColor:item.selectedColor}))}
                                  aria-label={`Decrease quantity of ${item.product.name}`}
                                  className="text-black px-2 py-2 border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                                  <BiMinus />
                                </button>
                                <span className="text-sm font-semibold px-4">{item.quantity}</span>
                                <button
                                  onClick={() => dispatch(increaseQty({productID : item.product.id, selectedColor:item.selectedColor}))}
                                  aria-label={`Increase quantity of ${item.product.name}`}
                                  className="text-black px-2 py-2 border-l border-gray-300 hover:bg-gray-200 cursor-pointer">
                                  <BiPlus />
                                </button>
                              </div>
                              <button
                                onClick={() => dispatch(removerFromCart({productID : item.product.id, selectedColor:item.selectedColor}))}
                                className="hover:text-red-700 text-2xl">
                                <MdDelete />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="font-medium text-base sm:text-lg text-right md:text-left mt-4 md:mt-0">
                          <p>${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 flex-shrink-0 p-4">
            <h1 className="text-2xl sm:text-3xl font-medium pb-4 text-left">Summary</h1>
            <div className="flex justify-between py-3">
              <span className="font-light text-lg">Subtotal</span>
              <span className="font-normal text-lg">${subTotal.toFixed(2)}</span>
            </div>


            <div className="flex justify-between py-3">
              <span className="font-light text-lg">Shipping & Delivery Fee</span>
              <span className="font-normal text-lg">${shippingFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-3 border-t border-b my-4">
              <span className="font-light text-lg">Total:</span>
              <span className="font-normal text-lg">${total.toFixed(2)}</span>
            </div>

            {/* Checkout and Clear Button */}
            <Link to={"/checkout"}>
              <button
                className="bg-black text-white text-lg px-4 py-3 w-full 
                rounded-md hover:opacity-75 text-center">
                Checkout
              </button>
            </Link>
            <div className="my-6 border-2 rounded-md bg-gray-50">
              <button
                onClick={() => handleClearCart()}
                className="text-gray-700 text-lg px-4 py-3 w-full 
                hover:bg-gray-100 text-center">
                Clear cart
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
