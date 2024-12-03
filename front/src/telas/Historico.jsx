import { Link } from 'react-router-dom';
import Header from "../content/Header.jsx"
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../styles/Historico.css'
import Modal from "../content/Modal.jsx"

function Historico() {
    const [historico, setHistorico] = useState([])
    const [apoio, setApoio] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(0)

    const pegar_historico = async () => {
        const response = await axios.get("http://localhost:6969/historico")
        setHistorico(response.data)
        setApoio(response.data)
    }

    const feitos = () => {
        setHistorico(apoio.filter((item) => item.horario_devolvido !== null))
    }

    const nao_devolvido = () => {
        setHistorico(apoio.filter((item) => item.horario_devolvido === null))
    }

    const devolver = async (item) => {
        const response = await axios.post("http://localhost:6969/devolver_api", { id: item.id, id_epis: item.EPI.id, qtd: item.qtd })
        console.log(response)
        openModal({ status: response })
        pegar_historico()
    }

    const openModal = ({ status }) => {
        setStatus(status);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => { pegar_historico() }, [])

    return (
        <div className='historico-container'>
            <Modal isOpen={isModalOpen} closeModal={closeModal} response={status} />
            <Header nome={"Histórico"} svg={<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M7 9H2V7h5v2zm0 3H2v2h5v-2zm13.59 7-3.83-3.83c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59 20.59 19zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3zM2 19h10v-2H2v2z"></path></svg>} />
            <div onClick={feitos}>devolvidos</div>
            <div onClick={nao_devolvido}>nao devolvidos</div>
            <div onClick={() => setHistorico(apoio)}>todos</div>
            <input type="text" onChange={(e) => setHistorico(apoio.filter(item => item.Funcionario.nome.toLowerCase().includes(e.target.value.toLowerCase()) || item.EPI.nome.toLowerCase().includes(e.target.value.toLowerCase()) || item.horario_pego.includes(e.target.value) || item.horario_devolvido.includes(e.target.value)))} />
            <div className='conteiner-map-historico'>
                {historico?.map((item, index) => (
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
                        {item.horario_devolvido ? null : <div onClick={() => devolver(item)}>Devolver</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Historico;