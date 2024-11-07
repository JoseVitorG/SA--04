import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cadastrar() {
    const [data, setData] = useState([])
    const [item, setItem] = useState({nome: "", senha: "", email: ""})

    return (
        <>
            <div className='conteiner_cadastro'>
                <input type="text" onChange={(e) => item.nome = e.target.value}/>
                <input type="text" onChange={(e) => item.email = e.target.value}/>
                <input type="text" onChange={(e) => item.senha = e.target.value}/>
                <div>Cadastrar</div>
            </div>
        </>
    )
}

export default Cadastrar;