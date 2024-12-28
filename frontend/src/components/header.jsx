import React, { useState, useEffect } from "react";
import { Wallet } from "lucide-react";

const Header = ({ setPubAddress }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        localStorage.setItem("connectedAccount", accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to use this dApp.");
    }
  };

  useEffect(() => {
    if (account) {
      setPubAddress(account); // This should work if setPubAddress is correctly passed.
    }
  }, [account, setPubAddress]);

  return (
    <div className="flex justify-between items-center mb-3 mt-3 p-2">
      <h1 className="text-3xl font-bold ">NFT Marketplace</h1>
      <button
        className="flex items-center px-4 py-2 border rounded hover:bg-gray-50"
        onClick={connectWallet}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {account
          ? `${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Header;
