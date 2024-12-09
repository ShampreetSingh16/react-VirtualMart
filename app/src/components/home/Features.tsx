import { ReactElement } from "react";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { PiShootingStarFill } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";

// Features prop type
type FeaturesProp = {
    name: string;
    icon: ReactElement;
    description: string;
};

// Features Data
const featuresData: FeaturesProp[] = [
    {
        name: "Low Price",
        icon: <FaHandHoldingDollar />,
        description: "Unbeatable prices on all products to give you the best value for your money."
    },
    {
        name: "Premium Quality",
        icon: <PiShootingStarFill />,
        description: "Top-notch electronics from trusted brands, ensuring durability and performance."
    },
    {
        name: "Fast Shipping",
        icon: <FaShippingFast />,
        description: "Get your orders delivered quickly and efficiently, right to your doorstep."
    },
    {
        name: "Customer Satisfaction",
        icon: <FaUserCheck />,
        description: "We stand by our products with a satisfaction guarantee. Your happiness is our priority."
    },
];

const Features = () => {
    return (
        <>
            <div className="p-12 md:p-8 sm:p-10">
                <h2 className="text-4xl md:text-3xl sm:text-2xl font-bold text-gray-900 text-center mb-4">
                    What Sets Us Apart
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-6 p-6 max-w-5xl mx-auto">
                       {/* Loop to show the features*/}
                    {featuresData.map((feature) => (
                        <div
                            key={feature.name}
                            className="rounded-xl p-6 text-left flex gap-4 bg-white shadow-sm border border-gray-300">
                            <span className="text-2xl bg-teal-800 p-4 rounded-xl text-gray-50 h-max">{feature.icon}</span>
                            <div className="flex flex-col">
                                <p className="text-xl font-bold text-gray-700">{feature.name}</p>
                                <p className="text-lg font-light text-gray-800">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}
export default Features;
