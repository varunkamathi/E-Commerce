import React, { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react"; // IMPORT THIS at the top with other imports
import { useNavigate } from "react-router-dom";


const Account = ({ logout, orders = [] }) => {
  const [user, setUser] = useState(null); // Initial state set to null
  const [loading, setLoading] = useState(true); // Loading state
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear your own localStorage user data
      localStorage.removeItem("user");
  
      // Clerk sign out
      await signOut();
  
      // Navigate to home page
      navigate("/");
      
      console.log("User signed out and navigated to home.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    // Get the user data from localStorage
    const storedUserString = localStorage.getItem("user");

    if (storedUserString) {
      try {
        const storedUser = JSON.parse(storedUserString);
        console.log("Stored User:", storedUser);
        setUser(storedUser); // Set parsed user in state
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser(null); // In case of error, treat as no user
      }
    } else {
      console.log("No user found in localStorage.");
    }

    setLoading(false); // Done loading
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No user logged in</h2>
      </div>
    );
  }

  // Access external account data safely
  const externalAccounts = user.externalAccounts || [];
  const googleAccount = externalAccounts.length > 0 ? externalAccounts[0] : null;

  // Create full name and other user details
  const fullName = googleAccount ? `${googleAccount.firstName} ${googleAccount.lastName}` : "Unknown User";
  const email = googleAccount ? googleAccount.emailAddress : "No email found";
  const imageUrl = googleAccount ? googleAccount.imageUrl : "default-image-url";

  console.log("User Name:", fullName);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* User Info */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={imageUrl}
          alt={fullName}
          className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-blue-400 shadow-lg"
        />
        <h2 className="text-3xl font-bold text-gray-800">{fullName}</h2>
        <p className="text-gray-600 mt-2">{email}</p>
      </div>

      {/* My Orders */}
      

        {/* Logout Button */}
        <div className="flex justify-center">
  <button
    onClick={handleLogout}
    className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 font-semibold"
  >
    Logout
  </button>
</div>
    </div>
  );
};

export default Account;
