import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <>
      <div className="flex h-auto w-full items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-10 grid-rows-auto sm:grid-rows-auto md:grid-rows-4 gap-4 h-full w-full">

          {/* div 1 */}
          <div className="col-span-1 md:col-span-4 row-span-1 md:row-span-2 rounded-3xl flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-left leading-normal lg:mt-24 md:mt-16 mb-2 mx-2 text-black">
              Uncover <strong>Affordable Prices </strong>on <strong> Premium Products!</strong>
            </h1>
            <p className="text-base sm:text-lg text-left leading-relaxed font-light mx-2 text-gray-800">
              Shop the latest electronics at the best prices and enhance your tech collection with high-quality gadgets for less.
            </p>
            <Link to={"/products"}
              className="bg-black text-white font-bold p-3 sm:p-4 w-max mx-2 mt-2 rounded-md flex space-x-2 items-center justify-center hover:opacity-75">
              <span className="text-sm sm:text-lg">Shop Now</span>
              <FaArrowRightToBracket className="text-xl sm:text-2xl" />
            </Link>
          </div>

          {/* div 2 and 3 */}
          <div className="col-span-1 sm:col-span-1 md:col-span-3 row-span-1 sm:row-span-1 md:row-span-2 flex flex-col gap-4">
            <div className="w-full h-full border border-gray-300 rounded-3xl flex flex-col justify-center items-center gap-2 p-2
            sm:p-6 md:p-4">
              <h6 className="text-xl sm:text-2xl font-bold text-gray-800">Exclusive <i>Discounts</i> and <i>Offers!</i></h6>
              <p className="text-sm sm:text-base text-center font-light mx-2 text-gray-800">
                Unlock savings on your favorite tech with exclusive deals tailored just for you.
              </p>
            </div>
            <div className="w-full h-full bg-amber-400 rounded-3xl sm:p-6 md:p-4 flex justify-center items-center">
              <img
                src="https://res.cloudinary.com/ddyg6pwml/image/upload/v1727344322/tablet_o7ofut.png"
                className="object-contain h-28 sm:h-32 md:h-40 w-full">
              </img>
            </div>
          </div>

          {/* div 4 */}
          <div className="col-span-1 sm:col-span-1 md:col-span-3 row-span-1 sm:row-span-1 md:row-span-2 rounded-3xl flex 
          justify-center items-center border-2 bg-zinc-950">
            <img
              src="https://res.cloudinary.com/ddyg6pwml/image/upload/v1728255548/AirpodsMax_jbehf0.png"
              className="object-contain h-full w-full sm:p-4 sm:h-48 sm:w-48 md:h-full md:w-full p-4">
            </img>
          </div>

          {/* div 5 */}
          <div className="col-span-1 sm:col-span-1 md:col-span-4 row-span-1 sm:row-span-1 md:row-span-2 rounded-3xl">
            <img
              src="https://res.cloudinary.com/ddyg6pwml/image/upload/v1728258277/person-watch_nutche.jpg"
              className="object-cover h-full w-full sm:h-52 sm:w-full md:h-full md:w-full rounded-3xl">
            </img>
          </div>

          {/* div 6 */}
          <div className="col-span-1 sm:col-span-1 md:col-span-6 row-span-1 sm:row-span-1 md:row-span-2 rounded-3xl flex flex-col justify-center items-center font-light p-2 gap-4">
            <h6 className="text-xl sm:text-2xl md:text-3xl text-black font-normal">
              Your<strong> One-Stop </strong>Shop for <strong> High Quality </strong>Electronics
            </h6>
            <p className="text-sm sm:text-lg text-black">
              We bring you the best in electronics at unbeatable prices.
              Whether you're looking for the latest gadgets or trusted brands, 
              we have everything you need to elevate your tech game.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default HeroSection;
