import React, { useState } from 'react';
import '../styles/Header.css';

function Header({ nome, svg }) {
    const [user, setUser] = useState(null);
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [credenciais, setCredenciais] = useState({ email: '', senha: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredenciais({ ...credenciais, [name]: value });
    };

    const handleLogin = () => {
        if (credenciais.email && credenciais.senha) {
            setUser({ email: credenciais.email });
            setMostrarLogin(false);
            setCredenciais({ email: '', senha: '' });
            alert('Login realizado com sucesso!');
        } else {
            alert('Preencha os campos de email e senha!');
        }
    };

    const handleLogout = () => {
        setUser(null);
        alert('Você foi deslogado!');
    };

    return (
        <header className="home-header">
            <div className='local'>
                {svg}
                <h1>{nome}</h1>
            </div>
            <div className='botoes'>
                {user ? (
                    <>
                        <p>Bem-vindo, {user.email}</p>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setMostrarLogin(!mostrarLogin)} className="login-button">
                            Login
                        </button>
                        {mostrarLogin && (
                            <div className="login-modal">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={credenciais.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="password"
                                    name="senha"
                                    placeholder="Senha"
                                    value={credenciais.senha}
                                    onChange={handleInputChange}
                                />
                                <button onClick={handleLogin}>Entrar</button>
                                <button onClick={() => setMostrarLogin(false)}>Fechar</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
