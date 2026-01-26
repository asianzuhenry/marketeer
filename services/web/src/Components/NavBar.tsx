import { useState } from "react";

export const NavBar = ({ cartItems, isLoggedIn }: { cartItems: string[], isLoggedIn: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-green-700 text-white p-4 h-24 align-middle flex items-center px-8 justify-between relative">
      <a
        href="/"
        className="text-2xl font-bold hover:text-blue-700 cursor-pointer"
      >
        Marketeer
      </a>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-24 left-0 w-full bg-green-700 text-white p-4 flex flex-col space-y-4 z-50 shadow-lg">
          <a href="/" className="hover:text-blue-700 text-xl">
            Home
          </a>
          <a href="/about" className="hover:text-blue-700 text-xl">
            About
          </a>
          <a href="/products" className="hover:text-blue-700 text-xl">
            Products
          </a>

          {isLoggedIn ? (
            <>
              <a href="/profile" className="hover:text-blue-700 text-xl">
                Profile
              </a>
            </>
          ) : (
            <>
              <a href="/signin" className="hover:text-blue-700 text-xl">
                Sign In
              </a>
              <a href="/signup" className="hover:text-blue-700 text-xl">
                Sign Up
              </a>
            </>
          )}

          <a
            href="/cart"
            className="hover:text-blue-700 bg-amber-700 min-w-12 px-6 py-3 text-base rounded cursor-pointer flex items-center gap-2 justify-between"
          >
            Cart
            <div className="bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center">
              {cartItems.length}
            </div>
          </a>
        </nav>
      )}

      {/* Desktop Navigation */}
      <nav className="items-center ml-8 sm:hidden hidden md:block lg:block">
        <ul className="flex space-x-4 ml-8 h-full items-center">
          <li>
            <a href="/" className="hover:text-blue-700 text-xl">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-700 text-xl">
              About
            </a>
          </li>
          <li>
            <a href="/products" className="hover:text-blue-700 text-xl">
              Products
            </a>
          </li>
          {isLoggedIn == true ? (
            <>
              <li>
                <a href="/profile" className="hover:text-blue-700 text-xl">
                  Profile
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/signup" className="hover:text-blue-700 text-xl">
                  Sign Up
                </a>
              </li>
            </>
          )}

          <li className="flex items-center gap-2">
            <a
              href="/cart"
              className="hover:text-blue-700 bg-amber-700 min-w-12 px-6 py-3 text-base rounded-2xl flex items-center justify-between gap-3"
            >
              Cart
              <div className="bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center">
                {cartItems.length}
              </div>
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded sm:block md:hidden lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};
