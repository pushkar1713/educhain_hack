import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { NFTCollectionABI, NFTMarketplaceABI } from "../utils/config";
import {
  NFT_COLLECTION_ADDRESS,
  NFT_MARKETPLACE_ADDRESS,
} from "../utils/config";

export const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initializeContracts = async (signer) => {
    const nftContract = new ethers.Contract(
      NFT_COLLECTION_ADDRESS,
      NFTCollectionABI,
      signer
    );
    const marketplaceContract = new ethers.Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFTMarketplaceABI,
      signer
    );

    return { nftContract, marketplaceContract };
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error(
          "Ethereum wallet not detected. Please install MetaMask."
        );
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAccount = accounts[0];

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstances = await initializeContracts(signer);

      setAccount(userAccount);
      setContracts(contractInstances);
      localStorage.setItem("connectedAccount", userAccount);
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError(err.message);
      setAccount(null);
      localStorage.removeItem("connectedAccount");
    } finally {
      setLoading(false);
    }
  };

  const initializeWeb3 = async () => {
    try {
      if (!window.ethereum) {
        throw new Error(
          "Ethereum wallet not detected. Please install MetaMask."
        );
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstances = await initializeContracts(signer);

      setContracts(contractInstances);
    } catch (err) {
      console.error("Error initializing Web3:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const storedAccount = localStorage.getItem("connectedAccount");
    if (storedAccount) {
      setAccount(storedAccount);
      initializeWeb3();
    }

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        localStorage.setItem("connectedAccount", accounts[0]);
        initializeWeb3();
      } else {
        setAccount(null);
        setContracts(null);
        localStorage.removeItem("connectedAccount");
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  return {
    account,
    contracts,
    loading,
    error,
    connectWallet,
  };
};
