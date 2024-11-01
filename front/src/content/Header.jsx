import React from 'react';
import '../header.css';

function Header({ nome, svg }) {
    return (
        <header className="home-header">
            {svg}
            <h1>{nome}</h1>
        </header>
    );
}

export default Header;
