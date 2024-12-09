import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoChevronBack } from "react-icons/io5";
import productType from './ProductType';
import { addToCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductDescription = () => {
    //geting the id parameter the route url
    const { id } = useParams();
    //state to store the products data , error and products loading
    const [product, setProduct] = useState<productType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    //sate to store the selected color of product
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    //getting the add to cart function from cart
    const dispatch = useDispatch();

    //when component is mounted the clicked product is shown
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    //function to handle adding product to cart
    const handleAddToCart = () => {
        // if color is selected and product is present then add it to cart
        if (product && selectedColor) {
            dispatch(addToCart({product, selectedColor}));
            // if color is not selected then show appropriate message to user
        } else if (!selectedColor) {
            toast.info("Please select a color before adding to the cart.");
        } else {
            //if product is not available
            toast.error("Product is not available.");
        }
    };


    //if product is not available or any error
    if (error || !product) {
        return <h1 className="text-xl text-black p-4 mx-auto my-6">Product not found......</h1>;
    }

    //if products is laoding
    if (loading) {
        return <h1 className="text-xl text-black p-4 mx-auto my-6">Loading......</h1>;
    }

    return (
        <div className="max-w-screen-xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
            {/* link to go back to products page  */}
            <Link to="/products" className="flex items-center w-max gap-2 text-black 
            font-light hover:underline hover:underline-offset-4 mb-4">
                <IoChevronBack className="text-lg" />
                Back to Products
            </Link>
            {/* Product information */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain border border-gray-300 
                        rounded-lg p-6 max-h-[500px]" />
                </div>

                {/* Product Details */}
                <div className="flex flex-col text-left">
                    {/* Product Name and Price */}
                    <div className="p-4 flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl sm:text-xl font-bold">{product.name}</h1>
                        <p className="text-xl md:text-2xl font-medium">${product.price.toFixed(2)}</p>
                    </div>

                    {/* Product Description */}
                    <div className="p-4">
                        <h2 className="font-medium text-lg mb-1">Description</h2>
                        <p className="font-light text-gray-700">{product.description}</p>
                    </div>

                    {/* Product Brand */}
                    <div className="p-4 border-t">
                        <h2 className="font-medium text-lg mb-1">Brand</h2>
                        <p className="font-light text-gray-700">{product.brand}</p>
                    </div>

                    {/* Product Color Options */}
                    <div className="p-4 border-y">
                        <h2 className="font-medium text-lg mb-1">Color</h2>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => (
                                <div
                                    key={color.color}
                                    onClick={() => color.stock > 0 && setSelectedColor(color.color)}
                                    className={`w-10 h-10 relative cursor-pointer rounded-full flex items-center justify-center
                                        ${selectedColor === color.color ? 'ring-2 ring-blue-600 ring-offset-4 border border-black' : 'border-2 border-black'}
                                        ${color.stock === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    style={{ backgroundColor: color.colorCode }}>
                                    {color.stock === 0 && <span className="text-xs text-red-500 absolute">Out of Stock</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="bg-black text-white rounded-md text-xl border
                         border-black p-4 mt-6 w-full hover:opacity-75">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
