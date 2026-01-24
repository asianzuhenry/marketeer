import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/localStorage";

const environment = import.meta.env.VITE_ENVIRONMENT;

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  bio?: string;
  phoneNumber?: string;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/signin");
      return;
    }

    // Fetch user profile
    if (environment === "development") {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) {
            if (response.status === 401) {
              // Token is invalid or expired
              removeToken();
              navigate("/signin");
              return;
            }
            throw new Error("Failed to fetch profile");
          }

          const data = await response.json();
          setUserData(data.user);

          //
        } catch (err: unknown) {
          console.error("Profile fetch error:", err);
          setError("An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else if (environment === "production") {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            "https://marketeer.onrender.com/api/users/profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) {
            if (response.status === 401) {
              // Token is invalid or expired
              removeToken();
              navigate("/signin");
              return;
            }
            throw new Error("Failed to fetch profile");
          }

          const data = await response.json();
          setUserData(data.user);

          //
        } catch (err: unknown) {
          console.error("Profile fetch error:", err);
          setError("An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gray-100 p-4 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate("/signin")}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mt-10 flex flex-col items-center">
        {userData?.role === "buyer" ? (
          <img
            className="w-60 h-60 rounded-full mb-4"
            src="https://cdn.vectorstock.com/i/500p/20/76/man-profile-icon-round-avatar-vector-21372076.jpg"
            alt="Profile page"
          />
        ) : userData?.role === "seller" ? (
          <img
            className="w-60 h-60 rounded-full mb-4"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile page"
          />
        ) : (
          <img
            className="w-60 h-60 rounded-full mb-4"
            src="https://cdn.vectorstock.com/i/500p/20/76/man-profile-icon-round-avatar-vector-21372076.jpg"
            alt="Profile page"
          />
        )}
        <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>

        {userData && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4 w-full">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-2xl font-semibold">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {userData.role}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  User ID
                </label>
                <p className="text-gray-900">{userData.id}</p>
              </div>

              {userData.phoneNumber && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  <p className="text-gray-900">{userData.phoneNumber}</p>
                </div>
              )}

              {userData.bio && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Bio
                  </label>
                  <p className="text-gray-900">{userData.bio}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t flex gap-3">
              <button
                onClick={() => navigate("/edit-profile")}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              {userData.role === "seller" && (
                <Link
                  to="/seller/dashboard"
                  className="flex-1 px-4 py-2 text-center bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  View Dashboard
                </Link>
              )}
              {userData.role === "admin" && (
                <Link
                  to="/seller/dashboard"
                  className="flex-1 px-4 py-2 text-center bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  View Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
