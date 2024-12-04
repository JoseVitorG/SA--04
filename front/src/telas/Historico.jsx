import { Link } from 'react-router-dom';
import Header from "../content/Header.jsx"
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../styles/Historico.css'
import Modal from "../content/Modal.jsx"
import Dropdown from "../content/Dropdown.jsx";

function Historico() {
    const [historico, setHistorico] = useState([]);
    const [apoio, setApoio] = useState([]);
    const [total, setTotal] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(0);
    const [filtroSelecionado, setFiltroSelecionado] = useState("todos");

    const pegar_historico = async () => {
        const response = await axios.get("http://localhost:6969/historico");
        setHistorico(response.data);
        setApoio(response.data);
        setTotal(response.data);
    };

    const feitos = () => {
        setFiltroSelecionado("feitos");
        const filtro = total.filter((item) => item.horario_devolvido !== null);
        setApoio(filtro);
        setHistorico(filtro);
    };

    const nao_devolvido = () => {
        setFiltroSelecionado("nao_devolvido");
        const filtro = total.filter((item) => item.horario_devolvido === null);
        setApoio(filtro);
        setHistorico(filtro);
    };

    const todos = () => {
        setFiltroSelecionado("todos");
        setApoio(total);
        setHistorico(total);
    };

    const devolver = async (item) => {
        const response = await axios.post("http://localhost:6969/devolver_api", { id: item.id, id_epis: item.EPI.id, qtd: item.qtd });
        console.log(response);
        openModal({ status: response });
        pegar_historico();
    };

    const openModal = ({ status }) => {
        setStatus(status);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const mudar = (opcaoSelecionada) => {
        opcaoSelecionada.action();
    };

    useEffect(() => {
        pegar_historico();
    }, []);

    const opcao = [
        { value: "todos", label: "Todos", action: todos },
        { value: "feitos", label: "Devolvidos", action: feitos },
        { value: "nao_devolvido", label: "Não Devolvidos", action: nao_devolvido },
    ];


    const aplicarFiltro = (inputValue) => {
        if (inputValue === "") {

            if (filtroSelecionado === "feitos") {
                setHistorico(apoio.filter((item) => item.horario_devolvido !== null));
            } else if (filtroSelecionado === "nao_devolvido") {
                setHistorico(apoio.filter((item) => item.horario_devolvido === null));
            } else {
                setHistorico(apoio);
            }
        } else {
            setHistorico(
                apoio.filter(
                    (item) =>
                        item.Funcionario.nome.toLowerCase().includes(inputValue.toLowerCase()) ||
                        item.EPI.nome.toLowerCase().includes(inputValue.toLowerCase()) ||
                        item.horario_pego.includes(inputValue) ||
                        item.horario_devolvido.includes(inputValue)
                )
            );
        }
    };

    return (
        <div className='historico-container'>
            <Modal isOpen={isModalOpen} closeModal={closeModal} response={status} />
            <Header nome={"Histórico"} svg={<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M7 9H2V7h5v2zm0 3H2v2h5v-2zm13.59 7-3.83-3.83c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59 20.59 19zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3zM2 19h10v-2H2v2z"></path></svg>} />
            <div className='conteiner_pesquisa'>
                <Dropdown opcoes={opcao} aoSelecionar={mudar} />
                <input
                    type="text"
                    className="input_pesquisa"
                    onChange={(e) => aplicarFiltro(e.target.value)}
                />
            </div>
            <div className='conteiner-map-historico'>
                {historico.length > [] ?
                    (
                        <>
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
                                    {item.horario_devolvido ? null : <div onClick={() => devolver(item)} className='botao_devolver'>Devolver</div>}
                                </div>
                            ))}
                        </>
                    )
                    :
                    (
                        <><p>Nenhum dado encontrado</p></>
                    )
                }
            </div>
        </div>
    );
}

export default Historico;