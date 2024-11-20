import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../estilos/Formulario.module.css';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    console.log("Usuário:", username);
    console.log("Senha:", password);
    // Adicione aqui a lógica para autenticação ou redirecionamento

    // Limpar os campos após o envio do formulário
    setUsername("");
    setPassword("");
  };


  return (
    <div className={styles.container}> {/* Referência correta ao CSS Module */}
      <div className={styles.formcontainer}>
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          <div className={styles.inputField}> {/* Referência correta */}
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className={styles.icon} /> {/* Referência correta */}
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
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </div>
          <div className={styles.formButtonsContainer}>
          <button className={styles.submitButton} type="submit">Entrar</button>
          <div className={styles.signupLink}>
            <p>
              Não tem uma conta? <Link to="/Registro">Registrar</Link>
            </p>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
