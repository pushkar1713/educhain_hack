import React, { useState } from "react";
import { ImagePlus, ShoppingCart, RefreshCw, Search } from "lucide-react";

// TODO: Add Web3 and Contract Imports
// import { ethers } from 'ethers';
// import NFTMarketplace from './artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
// import { marketplaceAddress } from '../config';

const NFTMarketplace = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: Add Web3 State Management
  // const [account, setAccount] = useState('');
  // const [provider, setProvider] = useState(null);
  // const [marketplaceContract, setMarketplaceContract] = useState(null);

  // Sample NFT data - replace with contract data
  const [nfts] = useState([
    {
      id: 1,
      name: "Cosmic Dreamer #1",
      creator: "0x1234...5678",
      price: "0.5 ETH",
      image: "/api/placeholder/300/300",
      collection: "Cosmic Dreams",
    },
    {
      id: 2,
      name: "Digital Beast #7",
      creator: "0x8765...4321",
      price: "0.8 ETH",
      image: "/api/placeholder/300/300",
      collection: "Digital Beasts",
    },
  ]);

  const NFTCard = ({ nft }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{nft.name}</h3>
        <p className="text-gray-600">Collection: {nft.collection}</p>
      </div>
      <div className="p-4">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">Creator: {nft.creator}</span>
          <span className="font-bold">{nft.price}</span>
        </div>
      </div>
      <div className="p-4 border-t flex justify-between">
        <button className="px-4 py-2 text-sm border rounded hover:bg-gray-50">
          View Details
        </button>
        {/* TODO: Connect buy button to smart contract */}
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          Buy Now
        </button>
      </div>
    </div>
  );

  const MintNFTForm = () => {
    // TODO: Add form state management
    // const [formData, setFormData] = useState({
    //   name: '',
    //   collection: '',
    //   price: '',
    //   image: null
    // });

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Mint New NFT</h2>
          <p className="text-gray-600">Create your unique digital asset</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">NFT Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter NFT name"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Collection Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter collection name"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Price (ETH)</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="0.0"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Upload Image</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer">
              <ImagePlus className="mx-auto mb-4" />
              <p className="text-sm text-gray-500">
                Drop your image here or click to browse
              </p>
            </div>
          </div>
        </div>

        {/* TODO: Connect to mintNFT function */}
        <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Mint NFT
        </button>
      </div>
    );
  };

  const TabButton = ({ active, children, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-50"
      } rounded-lg`}
    >
      {children}
    </button>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex space-x-4">
        <TabButton
          active={activeTab === "explore"}
          onClick={() => setActiveTab("explore")}
        >
          <Search className="mr-2 h-4 w-4" />
          Explore
        </TabButton>
        <TabButton
          active={activeTab === "mint"}
          onClick={() => setActiveTab("mint")}
        >
          <ImagePlus className="mr-2 h-4 w-4" />
          Mint
        </TabButton>
        <TabButton
          active={activeTab === "buy"}
          onClick={() => setActiveTab("buy")}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy
        </TabButton>
        <TabButton
          active={activeTab === "trade"}
          onClick={() => setActiveTab("trade")}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Trade
        </TabButton>
      </div>

      {activeTab === "explore" && (
        <div className="space-y-6">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "mint" && <MintNFTForm />}

      {activeTab === "buy" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      )}

      {activeTab === "trade" && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-2">Trade NFTs</h2>
          <p className="text-gray-600 mb-4">
            Exchange your NFTs with other collectors
          </p>
          <p className="text-center text-gray-500">
            Trading feature coming soon...
          </p>
        </div>
      )}
    </div>
  );
};

export default NFTMarketplace;

/* TODO: Required Project Structure

/contracts
  - NFTMarketplace.sol     // Main marketplace contract
  - NFTCollection.sol      // NFT collection contract

/scripts
  - deploy.js             // Hardhat deployment script
  - verify.js            // Contract verification script

/test
  - NFTMarketplace.test.js // Contract tests

/config
  - index.js             // Network and contract addresses

/backend
  - server.js            // Express/Node.js backend
  - db/
    - models/           // MongoDB/PostgreSQL models
    - migrations/       // Database migrations
  - routes/            // API routes
  - middlewares/       // Auth and other middlewares
  - services/         // Business logic
    - ipfs.js        // IPFS integration
    - blockchain.js  // Web3 integration

/frontend
  - components/       // React components
  - hooks/           // Custom React hooks
    - useWeb3.js    // Ethereum interactions
    - useIPFS.js    // IPFS interactions
  - utils/          // Helper functions
  - pages/          // Next.js pages
  - styles/         // CSS/Tailwind styles

Required Dependencies:
- Hardhat: npm install --save-dev hardhat
- OpenZeppelin: npm install @openzeppelin/contracts
- Web3.js or Ethers.js: npm install ethers
- IPFS HTTP Client: npm install ipfs-http-client
- MongoDB/PostgreSQL driver
- Express.js: npm install express
*/
