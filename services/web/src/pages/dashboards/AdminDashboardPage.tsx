import { useState } from "react";
import { Link } from "react-router-dom";
import { users } from "../../data/users";

type userFilter = "all" | "buyer" | "seller";

export const AdminDashboardPage = () => {
  const [filteredUsers, setFilteredUsers] = useState<userFilter>("all");
  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mt-10">Admin Dashboard</h1>
      <p className="text-center mt-4">
        Welcome to your admin dashboard. Here you can manage users and view
        sales statistics.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 px-4">
        <div className="bg-white p-6 rounded shadow-md m-4 text-3xl text-gray-600">
          <strong className="text-6xl text-black font-bold">
            {users.length}
          </strong>{" "}
          Users
        </div>
        <div className="bg-white p-6 rounded shadow-md m-4 text-3xl text-gray-600">
          <strong className="text-6xl text-black font-bold">4</strong> Orders
        </div>
        <div className="bg-white p-6 rounded shadow-md m-4 text-3xl text-gray-600">
          <Link to="/add-product">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Product
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow-md m-4 text-3xl text-gray-600">
        {/* seller products go here */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="userFilter"
                value="all"
                checked={filteredUsers === "all"}
                onChange={() => setFilteredUsers("all")}
                className="mr-2"
              />
              All
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="userFilter"
                value="buyer"
                checked={filteredUsers === "buyer"}
                onChange={() => setFilteredUsers("buyer")}
                className="mr-2"
              />
              Buyers
            </label>
            <label>
              <input
                type="radio"
                name="userFilter"
                value="seller"
                checked={filteredUsers === "seller"}
                onChange={() => setFilteredUsers("seller")}
                className="mr-2"
              />
              Sellers
            </label>
          </div>
        </div>
        <hr className="mb-4 border-gray-300 border-b-2" />
        <div>
          {filteredUsers === "all"
            ? users.map((user, index) => (
                <div
                  key={index}
                  className="border-b hover:bg-gray-50 hover:cursor-pointer px-2 py-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    {user.accountType === "seller" ? (
                      <img
                        className="w-12 h-12"
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Seller Icon"
                      />
                    ) : (
                      <img
                        className="w-12 h-12"
                        src="https://cdn.vectorstock.com/i/500p/20/76/man-profile-icon-round-avatar-vector-21372076.jpg"
                        alt="Buyer Icon"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-black">
                        {user.username} - {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}
                      </h3>
                      <p className="text-gray-600 text-xl">
                        Email: {user.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : filteredUsers === "buyer"
            ? users
                .filter((user) => user.accountType === "buyer")
                .map((user, index) => (
                  <div
                    key={index}
                    className="border-b hover:bg-gray-50 hover:cursor-pointer px-2 py-4 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        className="w-12 h-12"
                        src="https://cdn.vectorstock.com/i/500p/20/76/man-profile-icon-round-avatar-vector-21372076.jpg"
                        alt="Buyer Icon"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-black">
                          {user.name} - {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}
                        </h3>
                        <p className="text-gray-600 text-xl">
                          Email: {user.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            : users
                .filter((user) => user.accountType === "seller")
                .map((user, index) => (
                  <div
                    key={index}
                    className="border-b hover:bg-gray-50 hover:cursor-pointer px-2 py-4 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        className="w-12 h-12"
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Seller Icon"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-black">
                          {user.name} - {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}
                        </h3>
                        <p className="text-gray-600 text-xl">
                          Email: {user.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};
