import React, { useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import greting from "../assets/greting.png";

const Auth = () => {
  const { openSignUp, openSignIn } = useClerk();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      const userData = {
        externalAccounts: [
          {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            emailAddress: user.primaryEmailAddress?.emailAddress || "",
            imageUrl: user.imageUrl || ""
          }
        ]
      };
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/home");
    }
  }, [isLoaded, user, navigate]);

  const handleSignUp = () => {
    openSignUp({ afterSignUpUrl: "/home" });
  };

  const handleSignIn = () => {
    openSignIn({ afterSignInUrl: "/home" });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-teal-500 text-white flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back To Shopiy!</h2>
          <p className="text-center mb-8">
            Empowering Your Lifestyle with Endless Choices, Unbeatable Value,
            and Fast, Reliable Delivery — All in One Place
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-teal-500 mb-10 text-center">Get Started With Us</h2>
          <div className="flex justify-center space-x-4 mb-6">
            <img src={greting} alt="hello" className="w-24 h-24 object-contain" />
          </div>
          <div className="flex flex-col w-full space-y-4">
            <button
              onClick={handleSignIn}
              className="w-full px-4 py-2 font-semibold bg-teal-500 text-white rounded-full hover:bg-white hover:border-2 hover:border-teal-500 hover:text-black transition duration-300"
            >
              SIGN IN
            </button>
            <button
              onClick={handleSignUp}
              className="w-full px-4 py-2 font-semibold bg-teal-500 text-white rounded-full hover:bg-white hover:border-2 hover:border-teal-500 hover:text-black transition duration-300"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
