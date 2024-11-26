import React, { useState } from 'react';
import '../styles/Header.css';

function Header({ nome, svg }) {
    const [user, setUser] = useState()
    return (
        <header className="home-header">
            <div className='local'>
                {svg}
                <h1>{nome}</h1>
            </div>
            <div className='botoes'>
                {
                    user ?
                        (
                            <>
                                login
                            </>
                        )
                        :
                        (
                            <>
                                botao de logar
                            </>
                        )
                }
            </div>
        </header>
    );
}

export default Header;
