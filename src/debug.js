// Arquivo de debug para verificar problemas
console.log('Debug: Arquivo carregado com sucesso');

// Verificar se React está disponível
if (typeof React !== 'undefined') {
    console.log('Debug: React está disponível');
} else {
    console.error('Debug: React não está disponível');
}

// Verificar se React Router está disponível
if (typeof ReactRouter !== 'undefined') {
    console.log('Debug: React Router está disponível');
} else {
    console.log('Debug: React Router não está disponível (pode ser normal)');
}

// Verificar se os contextos estão disponíveis
try {
    console.log('Debug: Tentando importar contextos...');
} catch (error) {
    console.error('Debug: Erro ao importar contextos:', error);
}

export default 'Debug module loaded';