export const NavBar = () => {
  return (
    <div className="bg-green-700 text-white p-4 h-24 align-middle flex items-center px-8 justify-between">
      <h1 className="text-2xl font-bold hover:text-blue-700 cursor-pointer">
        Marketeer
      </h1>
      <nav className="flex items-center">
        <ul className="flex space-x-4 ml-8 h-full items-center">
          <li>
            <a href="/" className="hover:text-blue-700 text-xl">
              Home
            </a>
          </li>
          <li>
            <a href="/products" className="hover:text-blue-700 text-xl">
              Products
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-700 text-xl">
              About
            </a>
          </li>
          <li>
            <a href="/signup" className="hover:text-blue-700 text-xl">
              SignUp
            </a>
          </li>
          <li
          className="flex items-center gap-2"
          >
            <a
              href="/cart"
              className="hover:text-blue-700 text-xl bg-amber-700 p-1 rounded-2xl"
            >
              Cart
            </a>
              <div className="bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center">
                5
              </div>
              {/* cart item count */}
          </li>
        </ul>
      </nav>
    </div>
  );
};
