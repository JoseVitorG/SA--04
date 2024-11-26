import { Link } from 'react-router-dom';
import Header from "../content/Header.jsx"
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../styles/Historico.css'

function Historico() {
    const [historico, setHistorico] = useState([])



    const pegar_historico = async () => {
        const response = await axios.get("http://localhost:6969/historico")
        setHistorico(response.data)
        console.log(response.data)
    }

    useEffect(() => { pegar_historico() }, [])

    return (
        <div className='historico-container'>
            <Header nome={"Histórico"} svg={<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M7 9H2V7h5v2zm0 3H2v2h5v-2zm13.59 7-3.83-3.83c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59 20.59 19zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3zM2 19h10v-2H2v2z"></path></svg>} />

            <div className='conteiner-map-historico'>
                {historico.map((item, index) => (
                    <div className="historico-item" key={index}>
                        <div>
                            <p>EPI: {item.EPI.nome}</p>
                            <p>Funcionario: {item.Funcionario.nome}</p>
                        </div>
                        <div>
                            <p>Data e hora: {item.horario_pego}</p>
                            <p>{item.horario_devolvido ? `EPI Devolvido: ${item.horario_devolvido}` : "Usando"}</p>
                        </div>
                        <p>Quantidade: {item.qtd}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Historico;