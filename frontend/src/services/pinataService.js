// // services/pinataService.js
// import axios from "axios";

// const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
// const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

// export const uploadToPinata = async (file, metadata) => {
//   try {
//     // First, upload the image file
//     const formData = new FormData();
//     formData.append("file", file);

//     const imageRes = await axios.post(
//       "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       formData,
//       {
//         headers: {
//           "Content-Type": `multipart/form-data;`,
//           pinata_api_key: PINATA_API_KEY,
//           pinata_secret_api_key: PINATA_SECRET_KEY,
//         },
//       }
//     );

//     const imageHash = imageRes.data.IpfsHash;

//     // Then, upload the metadata
//     const nftMetadata = {
//       name: metadata.name,
//       description: metadata.description,
//       image: `ipfs://${imageHash}`,
//       attributes: [],
//     };

//     const metadataRes = await axios.post(
//       "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//       nftMetadata,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           pinata_api_key: PINATA_API_KEY,
//           pinata_secret_api_key: PINATA_SECRET_KEY,
//         },
//       }
//     );

//     return {
//       imageHash,
//       metadataHash: metadataRes.data.IpfsHash,
//       metadataUri: `ipfs://${metadataRes.data.IpfsHash}`,
//     };
//   } catch (error) {
//     console.error("Error uploading to Pinata:", error);
//     throw error;
//   }
// };
