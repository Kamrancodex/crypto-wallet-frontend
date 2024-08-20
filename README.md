# Crypto Wallet Generator Frontend

This is the frontend application for a cryptocurrency wallet generator supporting Ethereum and Solana.

## 🚀 Features

- User-friendly interface for wallet generation
- Display and management of Ethereum and Solana wallets
- Secure viewing and copying of private keys and addresses
- Responsive design for desktop and mobile use

## 🛠️ Technology Stack

- React.js
- React Router
- Tailwind CSS
- Axios
- React Icons
- React Toastify

## 📦 Installation

1. Clone the repository:

```
git clone https://github.com/kamrancodex/crypto-wallet-frontend.git
```

```
cd crypto-wallet-frontend
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## 🔧 Configuration

Update the API base URL in `src/utils/api.js` if your backend is hosted at a different URL:

javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
🚀 Deployment
This React app can be deployed to platforms like Netlify, Vercel, or GitHub Pages. Make sure to configure your build settings and environment variables accordingly.
🔒 Security Considerations

Never store sensitive information like private keys in local storage or expose them in the frontend code.
Implement proper error handling and user feedback for failed API requests.

📄 License
This project is MIT licensed.
