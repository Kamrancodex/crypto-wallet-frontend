import React, { useState } from "react";
import axios from "axios";

const GenerateWallets = ({ mnemonic }) => {
  const [wallets, setWallets] = useState(null);

  const generateWallets = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/generate-wallets",
        {
          mnemonic,
        }
      );
      setWallets(response.data.wallets);
    } catch (error) {
      console.error("Error generating wallets", error);
    }
  };

  return (
    <div>
      <button onClick={generateWallets}>Generate Wallets</button>
      {wallets && (
        <div>
          <h3>Ethereum Wallet:</h3>
          <p>Address: {wallets.ethereum.address}</p>
          <p>Private Key: {wallets.ethereum.privateKey}</p>

          <h3>Solana Wallet:</h3>
          <p>Address: {wallets.solana.address}</p>
          <p>Private Key: {wallets.solana.privateKey}</p>

          <h3>Bitcoin Wallet:</h3>
          <p>Address: {wallets.bitcoin.address}</p>
          <p>Private Key: {wallets.bitcoin.privateKey}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateWallets;
