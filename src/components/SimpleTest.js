import React from 'react';

const SimpleTest = () => {
    return (
        <div style={{ 
            padding: '50px', 
            textAlign: 'center', 
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ color: '#e60012', marginBottom: '20px' }}>
                🎯 Teste do Sistema Lenovo
            </h1>
            
            <div style={{ 
                backgroundColor: 'white', 
                padding: '30px', 
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <h2>✅ Sistema Funcionando!</h2>
                <p>Se você está vendo esta página, o React está funcionando perfeitamente.</p>
                
                <div style={{ 
                    backgroundColor: '#e8f5e8', 
                    padding: '20px', 
                    borderRadius: '8px',
                    margin: '20px 0',
                    border: '1px solid #28a745'
                }}>
                    <h3>🚀 Funcionalidades Implementadas:</h3>
                    <ul style={{ textAlign: 'left', lineHeight: '1.6' }}>
                        <li>✅ Modal de Login/Registro com métodos HTTP</li>
                        <li>✅ Sistema de autenticação completo</li>
                        <li>✅ Contextos React funcionais</li>
                        <li>✅ Rotas configuradas</li>
                        <li>✅ Estilos CSS aplicados</li>
                        <li>✅ Componentes responsivos</li>
                    </ul>
                </div>
                
                <div style={{ 
                    backgroundColor: '#fff3cd', 
                    padding: '20px', 
                    borderRadius: '8px',
                    margin: '20px 0',
                    border: '1px solid #ffc107'
                }}>
                    <h3>🔧 Próximos Passos:</h3>
                    <p>1. Clique no botão "Iniciar sessão / Criar conta" no header</p>
                    <p>2. Teste o modal de autenticação</p>
                    <p>3. Navegue pelas diferentes seções da conta</p>
                </div>
                
                <button 
                    onClick={() => window.history.back()} 
                    style={{
                        backgroundColor: '#e60012',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    ← Voltar
                </button>
            </div>
        </div>
    );
};

export default SimpleTest;