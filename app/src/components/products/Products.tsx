import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaArrowsUpDown } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import productType from './ProductType';
import ProductFilter from './ProductFilter';
import { Link } from 'react-router-dom';

const Products = () => {

  //State to store products data
  const [products, setProducts] = useState<productType[]>([]);
  //State to store distinct brands and categories extracted from products
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  //State for handling errors and loading status
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //Reference to manage and cancel API requests when the component unmounts or re-renders
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    //Cancel any existing request before creating a new one
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    //Function to fetch products data from the api
    const fetchedData = async () => {
      try {
        //Set loading to true and error to false before starting the fetch
        setLoading(true);
        setError(false);
        //Fetch products data with a signal to enable request cancellation
        const response = await axios.get<productType[]>("https://virtualmartserver.onrender.com/products", {
          signal: abortControllerRef.current?.signal,
        });
        //Set the products data from the api response  
        setProducts(response.data);

        //Extract unique brands and categories from the products data
        const brandNames = Array.from(new Set(response.data.map((product) => product.brand)));
        setBrands(brandNames);
        const categoryNames = Array.from(new Set(response.data.map((product) => product.category)));
        setCategories(categoryNames);
      } catch (err) {
        //Check if the error was due to request cancellation
        if (axios.isCancel(err)) {
          console.log("Request canceled");
        } else {
          //Set error state if there was a problem with fetching
          setError(true);
          console.log("Failed to fetch products");
        }
      } finally {
        //Always set loading to false after the fetch completes or fails
        setLoading(false);
      }
    };
    //Call the function to fetch data
    fetchedData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  //Destructure the properties and function from the Product Filter 
  const {
    selectedBrand,
    selectedCategory,
    searchTerm,
    sortedBy,
    sortedProducts,
    handleBrandChange,
    handleCategoryChange,
    handleSearchChange,
    handleSortChange,
    handleClearFilter,
  } = ProductFilter(products);

  //Return error message if there's an error in fetching products
  if (error) {
    return <h1 className="w-max mx-auto text-xl text-black p-4">Something Went Wrong!</h1>;
  }
  //Display loading message while fetching products
  if (loading) {
    return <h1 className="w-max mx-auto text-xl text-black p-4">Loading......</h1>;
  }

  return (
    <>
      {/* Filter and Products Container */}
      <div className="flex flex-col lg:flex-row p-4 w-full lg:divide-x">

        {/* Filter Section */}
        <section className="w-full lg:w-1/5 lg:pr-6 mb-6 lg:mb-0">
          <div className="p-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />

            {/* Sort Dropdown */}
            <span className="block mt-2 mb-2 font-semibold text-left">Sort By</span>
            <div className="relative mb-4">
              <select
                value={sortedBy}
                onChange={handleSortChange}
                className="p-2 w-full border border-gray-300 rounded appearance-none pr-8 font-sans text-base">
                <option value="">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <MdKeyboardArrowDown className="w-6 h-6 text-black" />
              </span>
            </div>

            {/* Category Dropdown */}
            <span className="block mb-2 font-semibold text-left">Category</span>
            <div className="relative mb-4">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="p-2 w-full border border-gray-300 rounded appearance-none pr-8 font-sans text-base">
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaArrowsUpDown className="w-5 h-4" />
              </span>
            </div>

            {/* Brand Filters */}
            <span className="block mb-2 font-semibold text-left">Brand</span>
            <div className="flex flex-col text-left sm:flex-row gap-3 lg:flex-col sm:text-sm lg:text-base md:text-base">
              {brands.map((brand) => (
                <label className="mb-1" key={brand}>
                  <input
                    type="checkbox"
                    name="brand"
                    value={brand}
                    className="mr-2"
                    onChange={handleBrandChange}
                    checked={selectedBrand.includes(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>

            {/* Clear Filter Button */}
            <button
              onClick={handleClearFilter}
              className="mt-4 p-2 bg-black text-white hover:opacity-75 w-full rounded-md">
              Clear Filters
            </button>
          </div>
        </section>

        {/* Products Section */}
        <section className="w-full lg:w-4/5 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Link
                to={`/products/${product.id}`}
                className="flex flex-col border border-gray-300 cursor-pointer rounded-md
                bg-white h-full p-4 hover:border-b-4 hover:border-black"
                key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-48 mb-4 bg-gray-50 rounded-lg p-2"
                />
                <div className="flex flex-col text-left gap-2">
                  <div className="flex flex-row items-start gap-2 justify-between">
                    <h3 className="font-medium text-base">{product.name}</h3>
                    <p className="font-medium text-base">${product.price}</p>
                  </div>
                  <p className="font-normal text-sm">{product.brand}</p>
                  <p className="font-light text-sm line-clamp-3">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
