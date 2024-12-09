import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import productType from './ProductType';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { IoChevronForward } from 'react-icons/io5';

const PopularProducts = () => {

  // state to store product data , error , and product loading
  const [products, setProducts] = useState<productType[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

//when component is mounted the products that are popular will be fetched
  useEffect(() => {
    const fetchedData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("http://localhost:8000/products?isPopular=true");
        setProducts(response?.data || []);
      } catch (err) {
        setError(true);
        console.log("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchedData();
  }, []);

  //if error show appropriate message to user
  if (error) {
    return <h1 className="w-max mx-auto text-xl text-black my-6">Something Went Wrong!</h1>;
  }

//if laoding show appropriate message to user
  if (loading) {
    return <h1 className="w-max mx-auto text-xl text-black my-6">Loading......</h1>;
  }

  return (
    <>
      <div className="w-11/12 mx-auto my-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black font-mono text-2xl font-semibold">
            Popular Products
          </h2>
          {/* link to all the products */}
          <Link
            to="/products"
            className="text-black font-light tracking-tight cursor-pointer
                  w-max mx-8 mt-12 hover:underline hover:underline-offset-4
                  flex items-center gap-1 text-base">
            See all products
            <IoChevronForward className="text-lg" />
          </Link>
        </div>
        {/* Swiper slide to show the product carousel */}
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          freeMode={true}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="my-2">
          {/* Products data */}
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="flex flex-col border border-gray-300 cursor-pointer rounded-md
                bg-white h-full p-4 mb-12 hover:border-b-4 hover:border-black">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-48 mb-4 p-2 rounded-lg bg-gray-50" />
                <div className="flex flex-col text-left gap-1">
                  <div className="flex flex-row items-start space-x-4 justify-between">
                    <h3 className="font-medium text-base">{product.name}</h3>
                    <p className="font-medium text-base">${product.price}</p>
                  </div>
                  <p className="font-normal text-sm">{product.brand}</p>
                  <p className="font-light text-base line-clamp-2">{product.description}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default PopularProducts;
