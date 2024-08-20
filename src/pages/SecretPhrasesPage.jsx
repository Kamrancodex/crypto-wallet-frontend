import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createWallets } from "../utils/api";

function SecretPhrasesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mnemonic, setMnemonic] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (location.state?.mnemonic) {
      setMnemonic(location.state.mnemonic.split(" "));
    }
  }, [location.state]);

  const handleProceed = async () => {
    try {
      const wallets = await createWallets(mnemonic.join(" "));
      navigate("/wallet", { state: { wallets, mnemonic: mnemonic.join(" ") } });
    } catch (error) {
      console.error("Failed to create wallets:", error);
      // Handle error
    }
  };

  const copyPhrase = (phrase) => {
    navigator.clipboard.writeText(phrase);
    // Add some visual feedback here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Secret Phrases</h1>
      <p className="mb-4">Copy and store these phrases in a secure place:</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
        {mnemonic.map((word, index) => (
          <div
            key={index}
            onClick={() => copyPhrase(word)}
            className="bg-white p-2 rounded cursor-pointer hover:bg-gray-200 text-center"
          >
            {word}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          id="copiedCheck"
          checked={copied}
          onChange={() => setCopied(!copied)}
          className="mr-2"
        />
        <label htmlFor="copiedCheck">
          I have copied the phrases to a secure place
        </label>
      </div>
      <button
        onClick={handleProceed}
        disabled={!copied}
        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
          !copied ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        Proceed
      </button>
    </div>
  );
}

export default SecretPhrasesPage;
