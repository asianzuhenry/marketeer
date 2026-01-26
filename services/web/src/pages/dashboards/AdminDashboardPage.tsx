import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

type UserFilter = "all" | "buyer" | "seller";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  createdAt?: string;
}

const environment = import.meta.env.VITE_ENVIRONMENT;

export const AdminDashboardPage = () => {
  const [filteredUsers, setFilteredUsers] = useState<UserFilter>("all");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem('token');
    
    if (!token) {
      setError("You must be logged in as admin");
      setLoading(false);
      navigate("/signin");
      return;
    }

    const apiUrl =
      environment === "development"
        ? "http://localhost:3000/api/users"
        : "https://marketeer.onrender.com/api/users";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      console.log("Users fetched successfully:", data);
      setUsers(data.users || data || []);
    } catch (error) {
      console.error("Fetch users failed:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch users",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    const token = localStorage.getItem('token');
    const apiUrl =
      environment === "development"
        ? `http://localhost:3000/api/users/${userId}`
        : `https://marketeer.onrender.com/api/users/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers(prev => prev.filter(u => u._id !== userId));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Delete user failed:", error);
      alert(error instanceof Error ? error.message : "Failed to delete user");
    }
  };

  const getFilteredUsers = () => {
    if (filteredUsers === "all") return users;
    return users.filter(user => user.role === filteredUsers);
  };

  const filteredUsersList = getFilteredUsers();
  const buyersCount = users.filter(u => u.role === "buyer").length;
  const sellersCount = users.filter(u => u.role === "seller").length;

  const UserCard = ({ user }: { user: User }) => (
    <div className="border-b hover:bg-gray-50 hover:cursor-pointer px-2 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {user?.role === "admin" ? (
          <img
            className="w-24 h-24 rounded-full mb-4"
            src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png"
            alt="Profile page"
          />
        ) : user?.role === "seller" ? (
          <img
            className="w-24 h-24 rounded-full mb-4"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile page"
          />
        ) : (
          <img
            className="w-24 h-24 rounded-full mb-4"
            src="https://cdn.vectorstock.com/i/500p/20/76/man-profile-icon-round-avatar-vector-21372076.jpg"
            alt="Profile page"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-black">
            {user.name} - <span className="text-blue-600">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
          </h3>
          <p className="text-gray-600 text-base">Email: {user.email}</p>
          {user.phoneNumber && (
            <p className="text-gray-600 text-sm">Phone: {user.phoneNumber}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => navigate(`/admin/users/${user._id}`)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
        >
          View
        </button>
        <button 
          onClick={() => handleDeleteUser(user._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mt-10">Admin Dashboard</h1>
      <p className="text-center mt-4">
        Welcome to your admin dashboard. Here you can manage users and view
        sales statistics.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 max-w-4xl mx-auto">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 px-4">
        <div className="bg-white p-6 rounded shadow-md text-3xl text-gray-600">
          <strong className="text-6xl text-black font-bold">
            {users.length}
          </strong>
          <p className="text-base mt-2">Total Users</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md text-3xl text-gray-600">
          <strong className="text-6xl text-blue-600 font-bold">
            {buyersCount}
          </strong>
          <p className="text-base mt-2">Buyers</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md text-3xl text-gray-600">
          <strong className="text-6xl text-green-600 font-bold">
            {sellersCount}
          </strong>
          <p className="text-base mt-2">Sellers</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md flex items-center justify-center">
          <Link to="/signup">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add User
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow-md m-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="userFilter"
                value="all"
                checked={filteredUsers === "all"}
                onChange={() => setFilteredUsers("all")}
                className="mr-2"
              />
              <span className="text-lg">All ({users.length})</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="userFilter"
                value="buyer"
                checked={filteredUsers === "buyer"}
                onChange={() => setFilteredUsers("buyer")}
                className="mr-2"
              />
              <span className="text-lg">Buyers ({buyersCount})</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="userFilter"
                value="seller"
                checked={filteredUsers === "seller"}
                onChange={() => setFilteredUsers("seller")}
                className="mr-2"
              />
              <span className="text-lg">Sellers ({sellersCount})</span>
            </label>
          </div>
        </div>

        <hr className="mb-4 border-gray-300 border-b-2" />

        {loading ? (
          <div className="w-full p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          </div>
        ) : filteredUsersList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-xl">No {filteredUsers === "all" ? "users" : filteredUsers + "s"} found</p>
          </div>
        ) : (
          <div>
            {filteredUsersList.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};