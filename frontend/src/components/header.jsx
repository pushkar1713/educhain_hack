import React from "react";
import { Wallet } from "lucide-react";
import { useWeb3 } from "../hooks/useWeb3"; // Adjust the path as needed

const Header = ({ setPubAddress }) => {
  const { account, connectWallet, loading } = useWeb3();

  // Update parent component whenever account changes
  React.useEffect(() => {
    if (account) {
      setPubAddress(account);
      localStorage.setItem("connectedAccount", account);
    }
  }, [account, setPubAddress]);

  return (
    <div className="flex justify-between items-center mb-3 mt-3 p-2">
      <h1 className="text-3xl font-bold">NFT Marketplace</h1>
      <button
        className="flex items-center px-4 py-2 border rounded hover:bg-gray-50"
        onClick={connectWallet}
        disabled={loading}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {loading
          ? "Connecting..."
          : account
          ? `${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Header;
