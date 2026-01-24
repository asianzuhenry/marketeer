import { useState } from "react";
import type { User } from "../types/basetypes";
import { useNavigate } from "react-router-dom";

// const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:3000";

export const SignUpPage = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    accountType: "buyer",
    phoneNumber: "",
  });
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.accountType,
        phoneNumber: user.phoneNumber,
        // Add other fields as needed
      }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    console.log('Signup successful:', data.message);
    navigate('/signin');
    
    // Handle success (redirect, show message, etc.)
    
  } catch (error) {
    console.error('Signup failed:', error);
    // Handle error (show error message to user)
  }
};

  return (
    <div 
    style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/007/077/577/small_2x/natural-green-background-with-curved-pattern-suitable-for-nature-theme-banner-vector.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    className="w-full h-screen bg-gray-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-[90%] max-w-md ">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
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
              onChange={(e) => setUser({ ...user, name: e.target.value })}
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Account Type
            </label>
            <select
              id="accountType"
              onChange={(e) =>
                setUser({
                  ...user,
                  accountType: e.target.value as "buyer" | "seller",
                })
              }
              className="shadow appearance-none border cursor-pointer rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            {user.accountType === "seller" && (
              <div className="mt-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p className="m-6">Already have an account? <a href="/signin" className="text-blue-500 hover:text-blue-700">Sign In</a></p>
        </form>
      </div>
    </div>
  );
};
