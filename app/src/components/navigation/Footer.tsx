import { Link } from "react-router-dom";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";

// Footer data
const footerLinks = [
  {
    title: "Virtumart",
    links: [
      { name: "Home", href: "/" },
      { name: "Shop", href: "/products" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "My Account", href: "#" },
      { name: "Orders", href: "#" },
      { name: "Wishlist", href: "#" },
      { name: "Login", href: "/login" },
      { name: "Register", href: "/register" },
    ],
  },
  {
    title: "Categories",
    links: [
      { name: "Laptops & Computers", href: "#" },
      { name: "Mobile Phones", href: "#" },
      { name: "Audio & Headphones", href: "#" },
      { name: "Accessories", href: "#" },
    ],
  },
  {
    title: "Information",
    links: [
      { name: "About Us", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

// Social media icons
const Icons = [
  { icon: FaXTwitter, href: "https://twitter.com" },
  { icon: FaInstagram, href: "https://www.instagram.com" },
  { icon: FaFacebook, href: "https://www.facebook.com" },
  { icon: FaYoutube, href: "https://www.youtube.com" },
];

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 w-full text-left bg-zinc-50 border-t p-4">
      <div className="container mx-auto grid  grid-cols-3 md:grid-cols-3 sm:grid-cols-2 
      gap-6 sm:gap-10 p-6 sm:p-8 sm:text-center md:text-start">
        {/* Footer Links */}
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h4 className="text-base font-medium mb-4 text-black">
              {section.title}
            </h4>
            <ul>
              {section.links.map((link, i) => (
                <li key={i} className="mb-2">
                  <Link
                    to={link.href}
                    className="text-zinc-600 hover:text-zinc-800 hover:underline hover:underline-offset-4">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="container mx-auto flex flex-row items-center gap-12 pt-8 pb-10 pl-6 border-t sm:w-max md:w-full lg:w-full">
        <span className="text-center text-zinc-600 sm:text-sm md:text-base">
          &copy; 2024 Virtumart.
        </span>
        <div className="flex space-x-6">
          {Icons.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-700 text-2xl sm:text-lg md:text-xl">
              <social.icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
