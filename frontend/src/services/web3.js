import { ethers } from "ethers";

import {
  NFTCollectionABI,
  NFTMarketplaceABI,
  NFT_MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../utils/config";

export const connectWallet = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("Please install MetaMask!");
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

export const getContracts = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("Please install MetaMask!");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFTMarketplaceABI,
      signer
    );

    const nftContract = new ethers.Contract(
      NFT_COLLECTION_ADDRESS,
      NFTCollectionABI,
      signer
    );

    return { marketplaceContract, nftContract };
  } catch (error) {
    console.error("Error getting contracts:", error);
    throw error;
  }
};
