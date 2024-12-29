import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Search } from "./components/SearchPage";
import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/Header";
import Navbar from "./components/Navbar";
import PokedexPage from "./components/PokedexPage";

function App() {
  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/search" element={<Search searchValue={""} />} />
          <Route path="/pokedex" element={<PokedexPage />} />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
