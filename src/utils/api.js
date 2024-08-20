import axios from "axios";

const API_BASE_URL = "https://crypto-wallet-backend-crfl.onrender.com/api";

export const generateMnemonic = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/generate-mnemonic`);
    return response.data.mnemonic;
  } catch (error) {
    console.error("Error generating mnemonic:", error);
    throw error;
  }
};

export const createWallets = async (mnemonic) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-wallets`, {
      mnemonic,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating wallets:", error);
    throw error;
  }
};

export const generateNewAddresses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/generate-new-addresses`);
    return response.data;
  } catch (error) {
    console.error("Error generating new addresses:", error);
    throw error;
  }
};
