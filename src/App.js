import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Homepage from "./pages/Homepage";
import PokemonPage from "./pages/PokemonPage";
import Header from "./components/header/Header";
import Arrow from "./components/scrolltop/Arrow";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container style={{ marginTop: 50 }}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/pokemon/:id" element={<PokemonPage />} />
        </Routes>
      </Container>
      <Arrow />
    </BrowserRouter>
  );
}

export default App;
