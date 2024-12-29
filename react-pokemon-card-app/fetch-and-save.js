import fetch from "node-fetch";
import { writeFileSync } from "fs";

const url = "https://api.pokemontcg.io/v2/cards";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    writeFileSync("cards.json", JSON.stringify(data, null, 2));
    console.log("Data saved to cards.json");
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
