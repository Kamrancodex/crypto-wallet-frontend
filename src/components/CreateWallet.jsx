import React, { useState } from "react";
import axios from "axios";

const CreateWallet = ({ onMnemonicGenerated }) => {
  const [mnemonic, setMnemonic] = useState(null);

  const createWallet = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/generate-wallets"
      );
      setMnemonic(response.data.mnemonic);
      onMnemonicGenerated(response.data.mnemonic);
    } catch (error) {
      console.error("Error generating mnemonic", error);
    }
  };

  return (
    <div>
      <button onClick={createWallet}>Create Wallet</button>
      {mnemonic && (
        <div>
          <p>Your 12-word phrase: {mnemonic}</p>
          <button onClick={() => onMnemonicGenerated(mnemonic)}>Proceed</button>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
