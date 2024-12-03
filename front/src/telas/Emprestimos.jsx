import React, { useEffect, useState } from 'react';
import Header from "../content/Header.jsx";
import axios from "axios";
import '../styles/Emprestimo.css';
import Modal from "../content/Modal.jsx"




function Emprestimos() {
    const [epis, setEpis] = useState([])
    const [pegos, setPegos] = useState([])
    const [user, setData] = useState({ email: "", senha: "" })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(0)

    const pegar_epis = async () => {
        const response = await axios.get("http://localhost:6969/listar_epi")
        setEpis(response.data)
    }

    const add_pegos = (id) => {
        if (!pegos.find((i) => i.id == id)) {
            setPegos([...pegos, { id, qtd: 1 }])
        } else {
            if (pegos[pegos.findIndex((i) => i.id == id)].qtd < epis[epis.findIndex((i) => i.id == id)].qtd) {
                pegos[pegos.findIndex((i) => i.id == id)].qtd++
                setPegos([...pegos])
            }
        }
    }

    const remover_pegos = (id) => {
        const i = pegos.find((i) => i.id == id)
        if (i) {
            if (i.qtd > 0) {
                setPegos([...pegos, pegos[pegos.findIndex((i) => i.id == id)].qtd--])
            } else {
                setPegos([...pegos, pegos.filter((item) => item.id !== id)])
            }
        }
    }

    const openModal = ({ status }) => {
        setStatus(status);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const enviar = async () => {
        try{
            const response = await axios.post("http://localhost:6969/add_historico", { user, pegos })
            openModal({ status: response })
            setPegos([])
            setData({ email: "", senha: "" })
            pegar_epis()
        } catch (e){
            openModal({status: e.response});
        }
    }

    useEffect(() => { pegar_epis() }, [])

    return (
        <>
            <Header nome="Empréstimos" svg={<svg viewBox="0 0 640 512" ><path d="M0 383.9l64 .0404c17.75 0 32-14.29 32-32.03V128.3L0 128.3V383.9zM48 320.1c8.75 0 16 7.118 16 15.99c0 8.742-7.25 15.99-16 15.99S32 344.8 32 336.1C32 327.2 39.25 320.1 48 320.1zM348.8 64c-7.941 0-15.66 2.969-21.52 8.328L228.9 162.3C228.8 162.5 228.8 162.7 228.6 162.7C212 178.3 212.3 203.2 226.5 218.7c12.75 13.1 39.38 17.62 56.13 2.75C282.8 221.3 282.9 221.3 283 221.2l79.88-73.1c6.5-5.871 16.75-5.496 22.62 1c6 6.496 5.5 16.62-1 22.62l-26.12 23.87L504 313.7c2.875 2.496 5.5 4.996 7.875 7.742V127.1c-40.98-40.96-96.48-63.88-154.4-63.88L348.8 64zM334.6 217.4l-30 27.49c-29.75 27.11-75.25 24.49-101.8-4.371C176 211.2 178.1 165.7 207.3 138.9L289.1 64H282.5C224.7 64 169.1 87.08 128.2 127.9L128 351.8l18.25 .0369l90.5 81.82c27.5 22.37 67.75 18.12 90-9.246l18.12 15.24c15.88 12.1 39.38 10.5 52.38-5.371l31.38-38.6l5.374 4.498c13.75 11 33.88 9.002 45-4.748l9.538-11.78c11.12-13.75 9.036-33.78-4.694-44.93L334.6 217.4zM544 128.4v223.6c0 17.62 14.25 32.05 31.1 32.05L640 384V128.1L544 128.4zM592 352c-8.75 0-16-7.246-16-15.99c0-8.875 7.25-15.99 16-15.99S608 327.2 608 336.1C608 344.8 600.8 352 592 352z"></path></svg>} />
            <Modal isOpen={isModalOpen} closeModal={closeModal} response={status} />
            <div className="conteiner_emprestimo">
                <input type="text" placeholder='Email' onChange={(e) => user.email = e.target.value} className='input' />
                <input type="text" placeholder='Senha' onChange={(e) => user.senha = e.target.value} className='input' />
                <div className='conteiner_quantidade_emprestimo'>
                    {epis.map((epi) => (
                        <div className='section card'>
                            <div className="card-content">
                                <div class="image">
                                    <img src={epi.foto} className="img_emprestimo" alt={epi.nome} />
                                </div>

                                <div class="name-profession">
                                    <span>{epi.nome}</span>
                                    <span>Disponível:</span>
                                    <span>{epi.qtd}</span>
                                </div>

                                {pegos.map((i) => i.qtd > 0 ? i.id == epi.id ? (
                                    <>
                                        <p>Pego:</p>
                                        <p>{i.qtd}</p>
                                    </>
                                ) : null : null)}

                                <div className="button">
                                    <button onClick={() => remover_pegos(epi.id)}>-</button>
                                    <button onClick={() => add_pegos(epi.id)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div onClick={enviar} className="btn btn-4 btn-sep icon-send">enviar</div>
            </div>
        </>
    );
}


export default Emprestimos

