import React, { useState, useEffect } from 'react';
import Header from "../content/Header.jsx";
import '../styles/Funcionario.css';

function Funcionarios() {
    // Simulação de dados dos funcionários
    const [funcionarios, setFuncionarios] = useState([
        { id: 1, nome: "Alice Silva", foto: "https://cdn-icons-png.flaticon.com/512/11320/11320006.png" },
        { id: 2, nome: "Bruno Costa", foto: "https://cdn-icons-png.flaticon.com/512/11320/11320006.png" },
        { id: 3, nome: "Carla Souza", foto: "https://cdn-icons-png.flaticon.com/512/11320/11320006.png" }
    ]);

    useEffect(() => {
        // Aqui você poderia fazer a chamada para API para buscar os dados reais dos funcionários
        // e atualizar o estado com setFuncionarios(data)
    }, []);

    return (
        <>
            <Header nome="Funcionários" svg={<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm13.1-8.16c.01-.11.02-.22.02-.34 0-.12-.01-.23-.03-.34l.74-.58c.07-.05.08-.15.04-.22l-.7-1.21c-.04-.08-.14-.1-.21-.08l-.86.35c-.18-.14-.38-.25-.59-.34l-.13-.93A.182.182 0 0 0 20.2 3h-1.4c-.09 0-.16.06-.17.15l-.13.93c-.21.09-.41.21-.59.34l-.87-.35c-.08-.03-.17 0-.21.08l-.7 1.21c-.04.08-.03.17.04.22l.74.58a1.953 1.953 0 0 0 0 .68l-.74.58c-.07.05-.08.15-.04.22l.7 1.21c.04.08.14.1.21.08l.87-.35c.18.14.38.25.59.34l.13.93c.01.09.08.15.17.15h1.4c.09 0 .16-.06.17-.15l.13-.93c.21-.09.41-.21.59-.34l.87.35c.08.03.17 0 .21-.08l.7-1.21c.04-.08.03-.17-.04-.22l-.73-.58zm-2.6.91a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm.42 3.93-.5-.87c-.03-.06-.1-.08-.15-.06l-.62.25c-.13-.1-.27-.18-.42-.24l-.09-.66A.15.15 0 0 0 18 10h-1c-.06 0-.11.04-.12.11l-.09.66c-.15.06-.29.15-.42.24l-.62-.25c-.06-.02-.12 0-.15.06l-.5.87c-.03.06-.02.12.03.16l.53.41c-.01.08-.02.16-.02.24 0 .08.01.17.02.24l-.53.41c-.05.04-.06.11-.03.16l.5.87c.03.06.1.08.15.06l.62-.25c.13.1.27.18.42.24l.09.66c.01.07.06.11.12.11h1c.06 0 .12-.04.12-.11l.09-.66c.15-.06.29-.15.42-.24l.62.25c.06.02.12 0 .15-.06l.5-.87c.03-.06.02-.12-.03-.16l-.52-.41c.01-.08.02-.16.02-.24 0-.08-.01-.17-.02-.24l.53-.41c.05-.04.06-.11.04-.17zm-2.42 1.65c-.46 0-.83-.38-.83-.83 0-.46.38-.83.83-.83s.83.38.83.83c0 .46-.37.83-.83.83zM4.74 9h8.53c.27 0 .49-.22.49-.49v-.02a.49.49 0 0 0-.49-.49H13c0-1.48-.81-2.75-2-3.45v.95c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.14C9.68 4.06 9.35 4 9 4s-.68.06-1 .14V5.5c0 .28-.22.5-.5.5S7 5.78 7 5.5v-.95C5.81 5.25 5 6.52 5 8h-.26a.49.49 0 0 0-.49.49v.03c0 .26.22.48.49.48zM9 13c1.86 0 3.41-1.28 3.86-3H5.14c.45 1.72 2 3 3.86 3z"></path></svg>} 
            />
            <div className="funcionarios-lista">
                {funcionarios.map(funcionario => (
                    <div key={funcionario.id} className="funcionario-card">
                        <img src={funcionario.foto} alt={`${funcionario.nome} foto`} className="funcionario-foto" />
                        <p className="funcionario-nome">{funcionario.nome}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Funcionarios;
