import React, { useState } from 'react';
import Header from "../content/Header.jsx";
import '../styles/Cadastrar.css';

function Cadastrar() {
    const [data, setData] = useState([]);
    const [item, setItem] = useState({ nome: "", senha: "", email: "" });

    // const add_

    return (
        <>
            <Header
                nome="Cadastrar"
                svg={
                    <svg viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path>
                    </svg>
                }
            />
            <div className="conteiner_cadastro">
                <div className="input_group">
                    <input
                        type="text"
                        name="nome"
                        value={item.nome}
                        onChange={handleChange}
                        placeholder="Nome"
                    />
                </div>
                <div className="input_group">
                    <input
                        type="email"
                        name="email"
                        value={item.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                <div className="input_group">
                    <input
                        type="password"
                        name="senha"
                        value={item.senha}
                        onChange={handleChange}
                        placeholder="Senha"
                    />
                </div>
                <button onClick={() => setData([...data, item])}>Cadastrar</button>
            </div>
        </>
    );
}

export default Cadastrar;
