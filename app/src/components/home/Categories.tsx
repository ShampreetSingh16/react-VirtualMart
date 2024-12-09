import { ReactElement } from "react";
import { IoTvSharp, IoWatchSharp, IoLaptopSharp } from "react-icons/io5";
import { FaHeadphones, FaTabletAlt } from "react-icons/fa";
import { FaCameraRetro, FaRadio, FaMobileScreenButton } from "react-icons/fa6";
import { SiPcgamingwiki } from "react-icons/si";
import { GiCctvCamera } from "react-icons/gi";
import { BsFillUsbDriveFill } from "react-icons/bs";
import { MdCable } from "react-icons/md";
import { IoMdBatteryCharging } from "react-icons/io";

// Icon prop type
type IconProp = {
  name: string;
  icon: ReactElement;
};

// Icon data
const icons: IconProp[] = [
  { name: "TV", icon: <IoTvSharp /> },
  { name: "Headphones", icon: <FaHeadphones /> },
  { name: "Cameras", icon: <FaCameraRetro /> },
  { name: "Tablets", icon: <FaTabletAlt /> },
  { name: "Gaming", icon: <SiPcgamingwiki /> },
  { name: "Radio", icon: <FaRadio /> },
  { name: "Cctv", icon: <GiCctvCamera /> },
  { name: "Smart Watches", icon: <IoWatchSharp /> },
  { name: "USB", icon: <BsFillUsbDriveFill /> },
  { name: "Cables", icon: <MdCable /> },
  { name: "Batteries", icon: <IoMdBatteryCharging /> },
  { name: "Laptops", icon: <IoLaptopSharp /> },
  { name: "Mobile", icon: <FaMobileScreenButton /> }
];

const Categories = () => {
  return (
    <div className="w-11/12 mx-auto my-4 sm:my-6">
      <h2 className="text-black font-mono text-2xl font-semibold text-left">
        Our Top Categories
      </h2>
      <div className="mt-4 p-2 sm:p-4 flex flex-row gap-5 flex-wrap">
        {/* Loop to show the icons */}
        {icons.map((iconObj) => (
          <div key={iconObj.name} className="flex flex-col items-center">
            <div className="bg-gray-100 rounded-full p-2 w-24 h-24 md:h-20 md:w-20 sm:w-16 sm:h-16 flex 
                items-center justify-center">
              <span className="text-2xl sm:text-xl">{iconObj.icon}</span>
            </div>
            <span className="mt-2 text-center text-sm font-medium text-wrap">{iconObj.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
