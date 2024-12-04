import React from "react";

const Dropdown = ({ opcoes, aoSelecionar }) => {
    const mudar = (e) => {
        const opcaoSelecionada = opcoes.find(opcao => opcao.value === e.target.value);
        if (opcaoSelecionada && aoSelecionar) {
            aoSelecionar(opcaoSelecionada);
        }
    };

    return (
        <select onChange={mudar} defaultValue="" className="conteiner_select">
            {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
