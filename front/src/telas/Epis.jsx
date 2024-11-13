import React, { useState, useEffect } from 'react';
import Header from "../content/Header.jsx";
import '../styles/Epis.css';

function Epis() {
    const [epis, setEpis] = useState([
        { id: 1, nome: "Capacete de Segurança", foto: "https://images.tcdn.com.br/img/img_prod/1194153/capacete_de_seguranca_plastcor_classe_b_plt_com_suspensao_laranja_c_a_31469_149_1_b84b0a9a7832f3a3465472f41ed7ce77.png" },
        { id: 2, nome: "Luva de Proteção", foto: "https://images.tcdn.com.br/img/img_prod/822550/luva_de_seguranca_tricotada_11_1_20200727102551.png" },
        { id: 3, nome: "Óculos de Proteção", foto: "https://acdn.mitiendanube.com/stores/002/290/563/products/fac7cd94fdbbcb0d0279be16d80c8b55-4a67b3053ad18a402d17261027194206-1024-1024.png" },
    ]);

    return (
        <>
            <Header nome={"EPIs"} svg={<svg viewBox="0 0 576 512"><path d="M544 280.9c0-89.17-61.83-165.4-139.6-197.4L352 174.2V49.78C352 39.91 344.1 32 334.2 32H241.8C231.9 32 224 39.91 224 49.78v124.4L171.6 83.53C93.83 115.5 32 191.7 32 280.9L31.99 352h512L544 280.9zM574.7 393.7C572.2 387.8 566.4 384 560 384h-544c-6.375 0-12.16 3.812-14.69 9.656c-2.531 5.875-1.344 12.69 3.062 17.34C7.031 413.8 72.02 480 287.1 480s280.1-66.19 283.6-69C576 406.3 577.2 399.5 574.7 393.7z"></path></svg>} />
            <div className="epis-container">
                {epis.map((epi) => (
                    <div key={epi.id} className="epi-item">
                        <img src={epi.foto} alt={epi.nome} className="epi-image" />
                        <p className="epi-name">{epi.nome}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Epis;
