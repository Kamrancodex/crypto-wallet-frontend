import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateNewAddresses } from "../utils/api";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WalletPage() {
  const location = useLocation();
  const [wallets, setWallets] = useState([]);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [mnemonic, setMnemonic] = useState("");

  useEffect(() => {
    if (location.state?.wallets && location.state?.mnemonic) {
      setWallets([location.state.wallets]);
      setMnemonic(location.state.mnemonic);
    }
  }, [location.state]);

  const handleGenerateNewWallet = async () => {
    try {
      const newWallets = await generateNewAddresses(mnemonic);
      setWallets((prevWallets) => [...prevWallets, newWallets]);
    } catch (error) {
      console.error("Failed to generate new addresses:", error);
      toast.error("Failed to generate new addresses");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const toggleVisibility = (key) => {
    setVisibleKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderWalletInfo = (wallet, index, type) => (
    <div>
      <h3 className="font-bold">{type}</h3>
      <div className="flex items-center">
        <p className="font-mono mr-2 break-all">
          {wallet[type.toLowerCase()].address}
        </p>
        <button
          onClick={() => copyToClipboard(wallet[type.toLowerCase()].address)}
          className="text-blue-500"
        >
          <FaCopy />
        </button>
      </div>
      <div className="flex items-center">
        <p className="font-mono mr-2 break-all">
          {visibleKeys[`${index}-${type.toLowerCase()}`]
            ? wallet[type.toLowerCase()].privateKey
            : "••••••••••••"}
        </p>
        <button
          onClick={() => toggleVisibility(`${index}-${type.toLowerCase()}`)}
          className="mr-2"
        >
          {visibleKeys[`${index}-${type.toLowerCase()}`] ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </button>
        <button
          onClick={() => copyToClipboard(wallet[type.toLowerCase()].privateKey)}
          className="text-blue-500"
        >
          <FaCopy />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wallets</h1>
      <div className="bg-white p-4 rounded mb-4">
        <h2 className="text-xl mb-2">Secret Phrase</h2>
        <div className="flex items-center">
          <p className="font-mono mr-2 break-all">
            {visibleKeys["mnemonic"] ? mnemonic : "••••••••••••"}
          </p>
          <button onClick={() => toggleVisibility("mnemonic")} className="mr-2">
            {visibleKeys["mnemonic"] ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button
            onClick={() => copyToClipboard(mnemonic)}
            className="text-blue-500"
          >
            <FaCopy />
          </button>
        </div>
      </div>
      {wallets.map((wallet, index) => (
        <div key={index} className="bg-white p-4 rounded mb-4">
          <h2 className="text-xl mb-2">Wallet {index + 1}</h2>
          {renderWalletInfo(wallet, index, "Ethereum")}
          {renderWalletInfo(wallet, index, "Solana")}
        </div>
      ))}
      <button
        onClick={handleGenerateNewWallet}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Generate New Wallet
      </button>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default WalletPage;
