import Marquee from "react-fast-marquee";

// logos list
const brandPartners = [
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727762907/Apple-Logo_kjzcsa.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727762907/Samsung-Symbol_hseufl.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727762908/Bose-logo_ocvqrd.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727762907/dell_wpon1c.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727762907/Marshall_logo_druh4u.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727763101/microsoft_wyxnce.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727763684/lenovo_z3xaga.png"
];
const brandPartners2 = [
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1728336290/JBL-logo_tigl6p.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1728336290/Logitech-Logo_iavzzk.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1728336289/acer_wcrmas.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1728336289/google-logo_suojli.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727762908/lg_x6av3c.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1727762907/Fujifilm-logo_a79qvl.png",
    "https://res.cloudinary.com/ddyg6pwml/image/upload/v1728336471/beats-logo_l4muyi.png"
];


const BrandPartner = () => {
    return (
        <div className="p-20 mt-6 sm:mt-8 md:mt-4 sm:mb-28 md:mb-20 mb-16 w-full">
            <h1 className="w-max mx-auto text-3xl md:text-3xl sm:text-2xl font-normal mb-6">
                Brands You Love, Products You Trust!
            </h1>
            {/* Marquee to show the logos */}
            <Marquee autoFill gradient gradientWidth={50} gradientColor="#fafafa">
                <div className="flex space-x-16 my-12 sm:space-x-10 md:space-x-12 lg:space-x-16">
                    {brandPartners.map((brand, index) => (
                        <img
                            key={index}
                            src={brand}
                            alt="Brand Partner"
                            className="w-32 h-16 sm:w-28 sm:h-14 md:w-36 md:h-18 lg:w-44 lg:h-20"
                        />
                    ))}
                </div>
            </Marquee>
            
            <Marquee autoFill gradient gradientWidth={50} gradientColor="#fafafa" direction="right">
                <div className="flex space-x-16 sm:space-x-10 md:space-x-12 lg:space-x-16">
                    {brandPartners2.map((brand, index) => (
                        <img
                            key={index}
                            src={brand}
                            alt="Brand Partner"
                            className="w-32 h-16 sm:w-28 sm:h-14 md:w-36 md:h-18 lg:w-44 lg:h-20"
                        />
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default BrandPartner;
