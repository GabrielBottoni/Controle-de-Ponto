import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import styles from "../estilos/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [ponto, setPonto] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?.id; // Recupera o ID do usuário logado

  const fetchPontos = async () => {
    try {
      const response = await fetch("/api/pontos"); // Chama o endpoint da API
      const data = await response.json();
      setPonto(data[0]?.pontos || []);
    } catch (error) {
      console.error("Erro ao buscar pontos:", error);
      toast.error("Erro ao conectar ao servidor.");
    }
  };
  

  useEffect(() => {
    if (!userId) {
      toast.error("Usuário não logado. Redirecionando...");
      navigate("/");
      return;
    }

    // Buscar pontos do usuário no JSON Server
    const fetchPontos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          setPonto(user.pontos || []);
        } else {
          toast.error("Erro ao carregar pontos.");
        }
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
        toast.error("Erro ao conectar ao servidor.");
      }
    };

    fetchPontos();
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entrada = document.getElementById("entrada").value;
    const saida = document.getElementById("saida").value;
    const pausa = document.getElementById("pausa").value;

    if (!entrada || !saida || !pausa) {
      toast.error("Por favor, preencha todos os horários.");
      return;
    }

    const novoPonto = {
      data: new Date().toISOString().split("T")[0],
      entrada,
      saida,
      pausa,
    };

    try {
      // Atualizar os pontos no JSON Server
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pontos: [...ponto, novoPonto],
        }),
      });

      if (response.ok) {
        setPonto((prev) => [...prev, novoPonto]);
        toast.success("Ponto registrado com sucesso!");
      } else {
        toast.error("Erro ao registrar ponto.");
      }
    } catch (error) {
      console.error("Erro ao salvar o ponto:", error);
      toast.error("Erro ao conectar ao servidor.");
    }

    // Limpar campos do formulário
    document.getElementById("entrada").value = "";
    document.getElementById("saida").value = "";
    document.getElementById("pausa").value = "";
  };

  const calcularHoras = (entrada, saida, pausa) => {
    const [hEntrada, mEntrada] = entrada.split(":").map(Number);
    const [hSaida, mSaida] = saida.split(":").map(Number);
    const [hPausa, mPausa] = pausa.split(":").map(Number);

    const inicio = hEntrada * 60 + mEntrada;
    const termino = hSaida * 60 + mSaida;
    const duracaoPausa = hPausa * 60 + mPausa;

    const minutosTrabalhados = termino - inicio - duracaoPausa;

    const horas = Math.floor(minutosTrabalhados / 60);
    const minutos = minutosTrabalhados % 60;

    return `${horas}h ${minutos}m`;
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove dados do usuário
    toast.success("Logout realizado com sucesso!");
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <div className={styles.mainContainer}>
      {/* Navbar */}
      <div className={styles.navFoot}>
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
          <div className={`container ${styles.navContainer}`}>
            <div className={styles.navTitle}>
              <FaUser className={styles.userIcon} />
              <p className="tituloPrincipal mb-0">Controle de Ponto</p>
            </div>
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <button onClick={handleLogout} className={styles.voltarLink}>
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* Conteúdo Principal */}
      <div className={styles.content}>
        <section>
          <div className={styles.formcontainer}>
            <form onSubmit={handleSubmit}>
              <h1>Bem vindo, *nome do usuário aqui*!</h1>
              <div className="mb-3">
                <label htmlFor="entrada" className="form-label">
                  Horário de entrada:
                </label>
                <input
                  type="time"
                  id="entrada"
                  name="entrada"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="saida" className="form-label">
                  Horário de saída:
                </label>
                <input
                  type="time"
                  id="saida"
                  name="saida"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pausa" className="form-label">
                  Horário de pausa:
                </label>
                <input
                  type="time"
                  id="pausa"
                  name="pausa"
                  className="form-control"
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Registrar Ponto
              </button>
            </form>
          </div>
          <ToastContainer position="top-center" autoClose={3000} />
        </section>

        <section>
          <div className={styles.formcontainer}>
            <div>
              <h1>Relatório Semanal</h1>
            </div>
            <div className="container mt-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Entrada</th>
                    <th>Saída</th>
                    <th>Pausa</th>
                    <th>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  {ponto.map((registro, index) => (
                    <tr key={index}>
                      <td>{registro.data}</td>
                      <td>{registro.entrada}</td>
                      <td>{registro.saida}</td>
                      <td>{registro.pausa}</td>
                      <td>
                        {calcularHoras(
                          registro.entrada,
                          registro.saida,
                          registro.pausa
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className={styles.navFoot}>
        <footer className="text-center p-3 mt-4">
          <p>Desenvolvido por Briel</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
