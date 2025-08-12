import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>404</h1>
            <h2 style={{ marginBottom: '24px' }}>Página não encontrada</h2>
            <p style={{ marginBottom: '32px' }}>
                A página que você está procurando pode ter sido removida, ter seu nome alterado ou estar temporariamente indisponível.
            </p>
            <Link 
                to="/" 
                style={{
                    background: '#e60012',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
            >
                Voltar para a página inicial
            </Link>
        </div>
    );
};

export default NotFound;