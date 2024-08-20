import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.png";
import { generateMnemonic } from "../utils/api";

function LandingPage() {
  const navigate = useNavigate();

  const handleCreateWallet = async () => {
    try {
      const mnemonic = await generateMnemonic();
      navigate("/secret-phrases", { state: { mnemonic } });
    } catch (error) {
      console.error("Failed to create wallet:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <img
        src={logo}
        alt="Company Logo"
        className="w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-8"
      />
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-center">
        Your Personal Crypto Wallet
      </h1>
      <p className="text-lg sm:text-xl mb-4 sm:mb-8 text-center">
        Secure and supports hundreds of cryptocurrencies
      </p>
      <button
        onClick={handleCreateWallet}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
      >
        Create Wallet
      </button>
    </div>
  );
}

export default LandingPage;
