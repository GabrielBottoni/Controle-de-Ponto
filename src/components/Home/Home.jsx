import React from "react";
import { FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import styles from '../estilos/Home.module.css';

const Home = () => {
  return (
    <div className="main-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <p className="navbar-brand">
            <FaUser /> Usuário
          </p>
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className="nav-link">
                <Link to="/">Sair</Link>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <div className="content">
        <section>
          <div className="d-flex justify-content-center">
            <form>
              <div>
                <label htmlFor="time">Horário de entrada:</label>
                <input type="time" id="time" name="time" />
                <label htmlFor="time">Horário de saída:</label>
                <input type="time" id="time" name="time" />
                <label htmlFor="time">Horário de Pausa:</label>
                <input type="time" id="time" name="time" />
              </div>
            </form>
          </div>
        </section>
        <section>
          <div className="d-flex justify-content-center">
            <h1>Relatório Semanal</h1>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer>
        <p>Desenvolvido por Briel</p>
      </footer>
    </div>
  );
};

export default Home;
