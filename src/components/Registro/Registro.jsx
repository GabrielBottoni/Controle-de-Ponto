import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../estilos/Formulario.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registro = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Função para registrar o usuário no banco de dados
    const registerUser = async () => {
        try {
            const response = await fetch("https://api.seuprojeto.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                toast.success("Cadastro realizado com sucesso!");
                navigate("/");  // Redireciona para a página de login
            } else {
                const error = await response.json();
                toast.error(error.message || "Erro ao conectar ao servidor.");
            }
        } catch (error) {
            toast.error("Erro ao se comunicar com o servidor.");
        }
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validações simples de entrada
        if (!name || !email || !password) {
            toast.error("Por favor, preencha todos os campos!");
            return;
        }
        if (!email.includes("@")) {
            toast.error("Por favor, insira um e-mail válido.");
            return;
        }
        if (password.length < 6) {
            toast.error("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        await registerUser();  // Chama a função de registro após validações
    };

    return (
        <div className={styles.container}>
            <div className={styles.formcontainer}>
                <form onSubmit={handleSubmit}>
                    <h1>Realize o seu cadastro</h1>

                    {/* Nome */}
                    <div className={styles.inputField}>
                        <label>Nome</label>
                        <input 
                            type="text"
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            className={styles.input}
                        />
                        <FaUser className={styles.icon} />
                    </div>

                    {/* E-mail */}
                    <div className={styles.inputField}>
                        <label>E-mail</label>
                        <input 
                            type="email"
                            placeholder="Digite seu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className={styles.input}
                        />
                        <FaEnvelope className={styles.icon} />
                    </div>

                    {/* Senha */}
                    <div className={styles.inputField}>
                        <label>Senha</label>
                        <input 
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className={styles.input}
                        />
                        <FaLock className={styles.icon} />
                    </div>

                    {/* Botões */}
                    <div className={styles.formButtonsContainer}>
                        <button type="submit" className={styles.submitRegistro}>Registrar</button>
                        <Link to="/" className={styles.voltarLink}>Voltar</Link>
                    </div>
                </form>

                <ToastContainer position="top-center" autoClose={3000} />
            </div>
        </div>
    );
};

export default Registro;
