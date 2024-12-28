import React, { useState } from "react";
import Header from "./header";
import pubAddressData from "../context/UserContext";
import NFTMarketplace from "./NFTMarketplace";
import WalletConnectDialog from "./WalletConnectDialog";

const Body = () => {
  const [pubAddress, setPubAddress] = useState("");

  return (
    <div>
      {/* Provide both pubAddress and setPubAddress */}
      <pubAddressData.Provider value={{ pubAddress, setPubAddress }}>
        <Header setPubAddress={setPubAddress} />
        <div>
          {pubAddress === "" ? <WalletConnectDialog /> : <NFTMarketplace />}
        </div>
      </pubAddressData.Provider>
    </div>
  );
};

export default Body;
export { pubAddressData };
