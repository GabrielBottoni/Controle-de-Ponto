import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login"; // Caminho correto para o Login
import Registro from "./components/Registro/Registro"; // Caminho correto para o Registro
import Home from "./components/Home/Home";
import "./App.css"; // Certifique-se de que o CSS global seja importado

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de login */}
        <Route path="/" element={<Login />} />

        {/* Rota para a página de registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Rota para a página do usuário */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
