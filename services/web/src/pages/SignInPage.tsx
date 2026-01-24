import { useState } from "react";
// import type { User } from "../types/basetypes";

export const SignInPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: ""
  });

  return (
    <div  
    style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/007/077/577/small_2x/natural-green-background-with-curved-pattern-suitable-for-nature-theme-banner-vector.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    className="w-full h-screen bg-gray-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-[90%] max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
          <p className="m-6">Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</a></p>
        </form>
      </div>
    </div>
  );
};
