import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ImagePlus, ShoppingCart, RefreshCw, Search } from "lucide-react";
import { useWeb3 } from "../hooks/useWeb3";

const NFTMarketplace = () => {
  const { account, mintNFT, listNFT, buyNFT, loading, connectWallet } =
    useWeb3();

  const [activeTab, setActiveTab] = useState("explore");
  const [searchTerm, setSearchTerm] = useState("");
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    if (!loading) {
      loadNFTs();
    }
  }, [loading, account]);

  const loadNFTs = async () => {
    try {
      setIsLoading(true);
      // Load NFTs logic here - you'll need to implement this based on your contract methods
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleMintSubmit = async (e) => {
    e.preventDefault();
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      const metadataURI = "ipfs://your-metadata-uri"; // Replace with actual IPFS URI
      const mintTx = await mintNFT(metadataURI);
      await mintTx.wait();

      const tokenId = mintTx.events[0].args.tokenId.toNumber();
      const priceInEth = ethers.utils.parseEther(formData.price.toString());
      await listNFT(tokenId, priceInEth);

      setFormData({
        name: "",
        description: "",
        price: "",
        image: null,
      });
      loadNFTs();
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error minting NFT. See console for details.");
    }
  };

  const handleBuyNFT = async (itemId, price) => {
    try {
      await buyNFT(itemId, price);
      loadNFTs();
    } catch (error) {
      console.error("Error buying NFT:", error);
      alert("Error buying NFT. See console for details.");
    }
  };

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
          <span className="font-bold">
            {ethers.utils.formatEther(nft.price)} ETH
          </span>
        </div>
      </div>
      <div className="p-4 border-t flex justify-between">
        <button className="px-4 py-2 text-sm border rounded hover:bg-gray-50">
          View Details
        </button>
        {nft.seller !== account && (
          <button
            onClick={() => handleBuyNFT(nft.itemId, nft.price)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );

  const MintNFTForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Mint New NFT</h2>
        <p className="text-gray-600">Create your unique digital asset</p>
      </div>

      <form onSubmit={handleMintSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-2">NFT Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter NFT name"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Price (ETH)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="0.0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Mint NFT
        </button>
      </form>
    </div>
  );

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

      {!account ? (
        <div className="text-center">
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
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
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "mint" && <MintNFTForm />}

          {activeTab === "buy" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nfts.map((nft) => (
                <NFTCard key={nft.tokenId} nft={nft} />
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
        </>
      )}
    </div>
  );
};

export default NFTMarketplace;
