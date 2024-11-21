import { FaUser, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../estilos/Formulario.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Verifica se o usuário já está salvo no Local Storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      navigate("/home", { state: { user } });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // Atualize a URL para o backend correto em produção
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        toast.error("Erro ao encontrar usuários.");
        return;
      }

      const users = await response.json();
      const user = users.find(
        (user) => user.email === username && user.password === password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home", { state: { user } });
      } else {
        toast.error("Email ou senha inválidos!");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formcontainer}>
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          <div className={styles.inputField}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className={styles.icon} />
          </div>
          <div className={styles.recallForget}>
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <Link to="/">Esqueceu a senha?</Link>
          </div>
          <div className={styles.formButtonsContainer}>
            <button className={styles.submitButton} type="submit">
              Entrar
            </button>
            <div className={styles.signupLink}>
              <p>
                Não tem uma conta? <Link to="/Registro">Registrar</Link>
              </p>
            </div>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
