import React, { useState } from 'react';
import '../styles/Header.css';

function Header({ nome, svg }) {
    return (
        <header className="home-header">
            <div className='local'>
                {svg}
                <h1>{nome}</h1>
            </div>
        </header>
    );
}

export default Header;
