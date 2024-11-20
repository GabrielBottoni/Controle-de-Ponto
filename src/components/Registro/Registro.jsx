import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // useNavigate importado corretamente
import styles from '../estilos/Home.module.css';

const Registro = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  // useNavigate chamado corretamente dentro do componente

    const registerUser = async () => {
        const response = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            alert("Usuário registrado com sucesso!");
            navigate("/");  // Redireciona para a página de login diretamente aqui
        } else {
            const error = await response.json();
            alert(error.message || "Erro ao registrar usuário.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        if (!email.includes("@")) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }
        if (password.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        console.log({ name, email, password });
        await registerUser();  // Chama a função de registro após validação
    };

    return (
        <div className={styles.container}>
            <div className={styles.formcontainer}>
                <form onSubmit={handleSubmit}>
                    <h1>Realize o seu cadastro</h1>
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
                    <div className={styles.inputField}>
                        <label>E-mail</label>
                        <input 
                            type="email"
                            placeholder="Digite seu Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className={styles.input}
                        />
                        <FaEnvelope className={styles.icon} />
                    </div>
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
                    <div className={styles.formButtonsContainer}>
                        <button type="submit" className={styles.submitRegistro}>Registrar</button>
                        <Link to="/" className={styles.voltarLink}>Voltar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registro;
