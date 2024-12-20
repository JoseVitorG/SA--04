import React, { useState, useEffect } from 'react';
import Header from "../content/Header.jsx";
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import '../styles/Funcionario.css';

function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [turnos, setTurnos] = useState([])
    const [atualizar, setAtualizar] = useState(false)
    const [editar, setEditar] = useState({
        id: null,
        nome: '',
        id_login: null,
        id_turno: 1,
        cargo: '',
        Login: {
            id: null,
            email: '',
            senha: '',
            foto: ''
        },
        Turno: {
            id: null,
            nome: '',
            ini: '',
            fim: ''
        }
    });
    const [novoFuncionario, setNovoFuncionario] = useState({
        email: "",
        senha: "",
        foto: "",
        nome: "",
        turno: 1,
        cargo: "",
    });

    const pegar_funcionarios = async () => {
        try {
            const turnosD = await axios.get("http://localhost:6969/turnos")
            const response = await axios.get("http://localhost:6969/listar_func");
            setFuncionarios(response.data);
            console.log(turnosD.data)
            setTurnos(turnosD.data)
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
        }
    };

    const cadastrar_funcionario = async () => {
        try {
            const response = await axios.post("http://localhost:6969/add_func", novoFuncionario);
            alert("Funcionário cadastrado com sucesso!");
            setMostrarCadastro(false);
            setNovoFuncionario({
                email: "",
                senha: "",
                foto: "",
                nome: "",
                turno: 1,
                cargo: '',
            });
            pegar_funcionarios();
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            alert("Erro ao cadastrar funcionário.");
        }
    };

    const pegar_um_func = async (id) => {
        try {
            const response = await axios.get(`http://localhost:6969/listar_func/${id}`)
            console.log(response.data)
            setEditar(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const atualizarFuncionarios = async () => {
        try {
            const response = await axios.put(`http://localhost:6969/atualizar_func/${editar.id}`, editar)
            pegar_funcionarios()
        } catch (e) {
            console.log(e)
        }
    }

    const deletar_user = async () => {
        try{
            const response = await axios.delete(`http://localhost:6969/delete_func/${editar.id}`)
            setAtualizar(false)
            pegar_funcionarios()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        pegar_funcionarios();
    }, []);

    return (
        <>
            <Header
                nome="Funcionários"
                svg={
                    <svg viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm13.1-8.16c.01-.11.02-.22.02-.34 0-.12-.01-.23-.03-.34l.74-.58c.07-.05.08-.15.04-.22l-.7-1.21c-.04-.08-.14-.1-.21-.08l-.86.35c-.18-.14-.38-.25-.59-.34l-.13-.93A.182.182 0 0 0 20.2 3h-1.4c-.09 0-.16.06-.17.15l-.13.93c-.21.09-.41.21-.59.34l-.87-.35c-.08-.03-.17 0-.21-.08l-.7 1.21c-.04.08-.03.17.04.22l.74.58a1.953 1.953 0 0 0 0 .68l-.74.58c-.07.05-.08.15-.04.22l.7 1.21c.04.08.14.1.21.08l.87-.35c.18.14.38.25.59.34l.13.93c.01.09.08.15.17.15h1.4c.09 0 .16-.06.17-.15l.13-.93c.21-.09.41-.21.59-.34l.87.35c.08.03.17 0 .21-.08l.7-1.21c.04-.08.03-.17-.04-.22l-.73-.58zm-2.6.91a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm.42 3.93-.5-.87c-.03-.06-.1-.08-.15-.06l-.62.25c-.13-.1-.27-.18-.42-.24l-.09-.66A.15.15 0 0 0 18 10h-1c-.06 0-.11.04-.12.11l-.09.66c-.15.06-.29.15-.42.24l-.62-.25c-.06-.02-.12 0-.15.06l-.5.87c-.03.06-.02.12.03.16l.53.41c-.01.08-.02.16-.02.24 0 .08.01.17.02.24l-.53.41c-.05.04-.06.11-.03.16l.5.87c.03.06.1.08.15.06l.62-.25c.13.1.27.18.42.24l.09.66c.01.07.06.11.12.11h1c.06 0 .12-.04.12-.11l.09-.66c.15-.06.29-.15.42-.24l.62.25c.06.02.12 0 .15-.06l.5-.87c.03-.06.02-.12-.03-.16l-.52-.41c.01-.08.02-.16.02-.24 0-.08-.01-.17-.02-.24l.53-.41c.05-.04.06-.11.04-.17zm-2.42 1.65c-.46 0-.83-.38-.83-.83 0-.46.38-.83.83-.83s.83.38.83.83c0 .46-.37.83-.83.83zM4.74 9h8.53c.27 0 .49-.22.49-.49v-.02a.49.49 0 0 0-.49-.49H13c0-1.48-.81-2.75-2-3.45v.95c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.14C9.68 4.06 9.35 4 9 4s-.68.06-1 .14V5.5c0 .28-.22.5-.5.5S7 5.78 7 5.5v-.95C5.81 5.25 5 6.52 5 8h-.26a.49.49 0 0 0-.49.49v.03c0 .26.22.48.49.48zM9 13c1.86 0 3.41-1.28 3.86-3H5.14c.45 1.72 2 3 3.86 3z"></path>
                    </svg>
                }
            />
            <div className="funcionarios-lista-container">
                <div className="funcionarios-lista">
                    <div
                        className="funcionario-card"
                        onClick={() => setMostrarCadastro(!mostrarCadastro)}
                    >
                        <div className="conteiner_add" >
                            <p>+</p>
                        </div>
                        <p>Cadastrar funcionário</p>
                    </div>
                    {funcionarios.map((funcionario) => (
                        <div key={funcionario.id} className="funcionario-card" onClick={() => { setAtualizar(!atualizar), pegar_um_func(funcionario.id) }}>
                            <img
                                src={funcionario?.Login.foto}
                                alt={`${funcionario.nome} foto`}
                                className="funcionario-foto"
                            />
                            <div>
                                <p className="funcionario-nome">Nome: {funcionario.nome}</p>
                                <p className="funcionario-nome">Cargo: {funcionario.cargo}</p>
                                <p className="funcionario-nome">Turno: {funcionario?.Turno?.nome || "Não definido"}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {mostrarCadastro && (
                    <div className="formulario-cadastro">
                        <h2>Cadastrar Funcionário</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            onChange={(e) => novoFuncionario.nome = e.target.value}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) => novoFuncionario.email = e.target.value}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => novoFuncionario.senha = e.target.value}
                        />
                        <input
                            type="text"
                            placeholder="Cargo"
                            onChange={(e) => novoFuncionario.cargo = e.target.value}
                        />
                        <input
                            type="text"
                            placeholder="Foto"
                            onChange={(e) => novoFuncionario.foto = e.target.value}
                        />

                        <Dropdown
                            value={novoFuncionario.turno}
                            onChange={(i) => {
                                setNovoFuncionario((prev) => ({
                                    ...prev,
                                    turno: i.value,
                                }));
                            }}
                            options={turnos.map(turno => ({
                                label: turno.nome,
                                value: turno.id
                            }))}
                        />

                        <button onClick={cadastrar_funcionario}>Cadastrar</button>
                        <button className="close" onClick={() => setMostrarCadastro(false)}>Cancelar</button>
                    </div>
                )}

                {atualizar && (

                    <div className="formulario-cadastro">
                        <div className='conteiner_editar_func'>
                            <h2>Editar Funcionário</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16" onClick={deletar_user}>
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={editar.nome}
                            onChange={(e) => setEditar({ ...editar, nome: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={editar.Login.email}
                            onChange={(e) => setEditar((prev) => ({
                                ...prev,
                                Login: {
                                    ...prev.Login,
                                    email: e.target.value,
                                },
                            }))}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={editar.Login.senha}
                            onChange={(e) => setEditar((prev) => ({
                                ...prev,
                                Login: {
                                    ...prev.Login,
                                    senha: e.target.value,
                                },
                            }))}
                        />
                        <input
                            type="text"
                            placeholder="Cargo"
                            value={editar.cargo}
                            onChange={(e) => setEditar({ ...editar, cargo: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Foto"
                            value={editar.Login.foto}
                            onChange={(e) => setEditar((prev) => ({
                                ...prev,
                                Login: {
                                    ...prev.Login,
                                    foto: e.target.value,
                                },
                            }))}
                        />

                        <Dropdown
                            value={novoFuncionario.turno}
                            onChange={(i) => {
                                setEditar((prev) => ({
                                    ...prev,
                                    id_turno: i.value,
                                }));
                            }}
                            options={turnos.map(turno => ({
                                label: turno.nome,
                                value: turno.id
                            }))}
                        />

                        <button onClick={atualizarFuncionarios}>Editar</button>
                        <button className="close" onClick={() => setAtualizar(false)}>Cancelar</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Funcionarios;
