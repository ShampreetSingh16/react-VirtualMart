import { useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { IoBagHandleOutline } from 'react-icons/io5';
import { RiUser6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { logout , checkAuth } from '../../redux/slices/authSlices';

// navbar links type
type navType = {
  name: string;
  href: string;
};

// navbar Links
const navLinks: navType[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
];

const Navbar = () => {
  const cartCounter = useSelector((state: RootState) => state.cart.cartCounter);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch<AppDispatch>();

  // function to handle logout
  const handleLogout = async () => {
    await dispatch(logout());
    setIsDropdownOpen(false);
  };

  // function to handle the logout dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // check the user state on component mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  return (
    <>
      <nav className="sticky top-0 z-50 bg-white w-full flex items-center justify-between p-4 border-b border-gray-100">
        {/* Logo */}
        <NavLink to={"/"} className="p-2">
          <img
            className="max-h-10 sm:h-8 md:h-10 w-auto cursor-pointer object-contain"
            src="/logo.png"
            alt="logo"
          />
        </NavLink>

        <ul className="flex space-x-6 list-none text-sm items-center text-black font-light">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-black p-2 cursor-pointer text-base hover:underline hover:underline-offset-4"
                    : "text-black p-2 cursor-pointer text-base hover:underline hover:underline-offset-4"
                }>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sign In and Cart */}
        <div className="flex space-x-3 items-center divide-x">
          {/* If user is logged in, show username and logout button */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-black text-base flex items-center gap-2 cursor-pointer pl-4">
                <RiUser6Line className="text-xl" /> Hello, {username}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // If user is not logged in, show Sign In button
            <NavLink
              to={"/login"}
              className="bg-black p-2 rounded-md text-white hover:opacity-75 cursor-pointer">
              Sign In
            </NavLink>
          )}

          {/* Cart Link */}
          <NavLink
            to={"/cart"}
            className="text-black p-2 flex items-center relative text-base cursor-pointer">
            <IoBagHandleOutline className="text-2xl" />
            {cartCounter > 0 && (
              <span
                className="absolute -top-2 -right-2 text-xs text-white font-bold bg-red-600 
                rounded-full p-2 w-6 h-6 flex items-center justify-center">
                {cartCounter}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
