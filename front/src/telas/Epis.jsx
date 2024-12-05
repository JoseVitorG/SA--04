import React, { useState, useEffect } from 'react';
import Header from "../content/Header.jsx";
import '../styles/Epis.css';
import axios from 'axios'

function Epis() {
    const [epis, setEpis] = useState([]);
    const [cadastro, setMostrarCadastro] = useState(false)
    const [novoApi, setNovoApi] = useState({ nome: '', descri: "", qtd: 0, foto: '' })
    const [editarApi, setEditarAPI] = useState({ nome: '', descri: "", qtd: 0, foto: '' })
    const [editar, setEditar] = useState(false)

    const pegar_epi = async () => {
        const response = await axios.get("http://localhost:6969/listar_epi")
        setEpis(response.data)
    }

    const cadastrar_api = async () => {
        try {
            console.log()
            await axios.post("http://localhost:6969/add_epi", novoApi);
            setMostrarCadastro(false);
            setNovoApi({ nome: '', descri: "", qtd: 0, foto: '' });
            await pegar_epi();
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            alert("Erro ao cadastrar funcionário.");
        }
    };

    const pegar_um_epi = async (id) => {
        const response = await axios.get(`http://localhost:6969/listar_epi/${id}`)
        setEditarAPI(response.data)
    }

    const editar_api = async () => {
        try {
            const response = await axios.put(`http://localhost:6969/atualizar_epi/${editarApi.id}`, editarApi)
            pegar_epi()
        } catch (e) {
            console.log(e)
        }
    }

    const deletar_epi = async () => {
        try {
            const response = await axios.delete(`http://localhost:6969/delete_epi/${editarApi.id}`)
            setEditar(false)
            pegar_epi()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => { pegar_epi() }, [])

    return (
        <>
            <Header nome={"EPIs"} svg={<svg viewBox="0 0 576 512"><path d="M544 280.9c0-89.17-61.83-165.4-139.6-197.4L352 174.2V49.78C352 39.91 344.1 32 334.2 32H241.8C231.9 32 224 39.91 224 49.78v124.4L171.6 83.53C93.83 115.5 32 191.7 32 280.9L31.99 352h512L544 280.9zM574.7 393.7C572.2 387.8 566.4 384 560 384h-544c-6.375 0-12.16 3.812-14.69 9.656c-2.531 5.875-1.344 12.69 3.062 17.34C7.031 413.8 72.02 480 287.1 480s280.1-66.19 283.6-69C576 406.3 577.2 399.5 574.7 393.7z"></path></svg>} />
            <div className="epis-container">
                <div
                    className="epi-item"
                    onClick={() => setMostrarCadastro(!cadastro)}
                >
                    <div className="img_epis_conteiner">
                        <p>+</p>
                    </div>
                    <p>Cadastrar EPI</p>
                </div>
                {epis.map((epi) => (
                    <div key={epi.id} className="epi-item" onClick={() => { setEditar(!editar), pegar_um_epi(epi.id) }}>
                        <div className="img_epis_conteiner">
                            <img src={epi.foto} alt={epi.nome} className="epi-image" />
                        </div>
                        <p className="epi-name">{epi.nome}</p>
                        <p className="epi-name">{epi.qtd}</p>
                    </div>
                ))}

                {cadastro && (
                    <div className="formulario-cadastro">
                        <h2>Cadastrar EPI</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            onChange={(e) => novoApi.nome = e.target.value}
                        />
                        <input
                            type="text"
                            placeholder="Descricao"
                            onChange={(e) => novoApi.descri = e.target.value}
                        />
                        <input
                            type="text"
                            placeholder="Quantidade"
                            onChange={(e) => novoApi.qtd = e.target.value}
                        />
                        <input
                            type="text"
                            placeholder="Foto"
                            onChange={(e) => novoApi.foto = e.target.value}
                        />

                        <button onClick={cadastrar_api}>Cadastrar</button>
                        <button className="close" onClick={() => setMostrarCadastro(false)}>Cancelar</button>
                    </div>
                )}

                {editar && (
                    <div className="formulario-cadastro">
                        <div className='conteiner_editar_func'>
                            <h2>Ediatar EPI</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16" onClick={deletar_epi}>
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={editarApi.nome}
                            onChange={(e) => setEditarAPI({ ...editarApi, nome: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Descricao"
                            value={editarApi.descri}
                            onChange={(e) => setEditarAPI({ ...editarApi, descri: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Quantidade"
                            value={editarApi.qtd}
                            onChange={(e) => setEditarAPI({ ...editarApi, qtd: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Foto"
                            value={editarApi.foto}
                            onChange={(e) => setEditarAPI({ ...editarApi, foto: e.target.value })}
                        />

                        <button onClick={editar_api}>Editar</button>
                        <button className="close" onClick={() => setEditar(false)}>Cancelar</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Epis;
