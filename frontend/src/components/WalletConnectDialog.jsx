import React from "react";
import { Wallet } from "lucide-react";

const WalletConnectDialog = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center p-8">
          <div className="mb-6">
            <Wallet className="w-10 h-10 text-gray-500" />
          </div>
          <p className="text-lg text-gray-600 text-center">
            Please connect your wallet to proceed
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectDialog;
