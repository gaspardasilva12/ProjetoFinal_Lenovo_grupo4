# 📚 Documentação dos Métodos HTTP - Lista de Desejos e Carrinho

## 🎯 Visão Geral

Este documento descreve a implementação completa dos métodos HTTP para as funcionalidades de **Lista de Desejos** e **Carrinho** da aplicação Lenovo, incluindo integração com autenticação e tratamento de estados.

## 🚀 Funcionalidades Implementadas

### ✅ Lista de Desejos (Wishlist)
- **Adicionar produtos** com validação
- **Remover produtos** individualmente
- **Limpar lista** completa
- **Mover para carrinho** com sincronização
- **Busca e filtros** por categoria e preço
- **Exportação** em JSON e CSV
- **Estados de loading** e tratamento de erros

### ✅ Carrinho de Compras (Cart)
- **Adicionar produtos** com controle de quantidade
- **Atualizar quantidades** com validação
- **Remover produtos** individualmente
- **Limpar carrinho** completo
- **Mover para wishlist** com sincronização
- **Cálculo automático** de subtotal e frete
- **Estados de loading** e tratamento de erros

## 🔐 Autenticação e Segurança

### Token JWT
- **Autenticação obrigatória** para todas as operações
- **Refresh automático** de tokens expirados
- **Validação de permissões** por usuário
- **Headers seguros** em todas as requisições

### Estrutura de Headers
```javascript
headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}
```

## 📡 API Endpoints

### Lista de Desejos (Wishlist)

#### 1. Buscar Wishlist do Usuário
```http
GET /wishlist?clienteId={userId}
Authorization: Bearer {token}
```

**Resposta:**
```json
[
    {
        "id": 1,
        "clienteId": 123,
        "produtoId": 456,
        "dataAdicionado": "2024-01-15T10:30:00Z",
        "produto": {
            "id": 456,
            "nome": "Lenovo Yoga Slim 7i",
            "preco": 6999.99,
            "imagem": "url-da-imagem",
            "categoria": "Notebooks"
        }
    }
]
```

#### 2. Adicionar Item à Wishlist
```http
POST /wishlist
Authorization: Bearer {token}
Content-Type: application/json

{
    "clienteId": 123,
    "produtoId": 456,
    "dataAdicionado": "2024-01-15T10:30:00Z"
}
```

#### 3. Remover Item da Wishlist
```http
DELETE /wishlist/{itemId}
Authorization: Bearer {token}
```

#### 4. Limpar Wishlist Completa
```http
DELETE /wishlist/clear/{clienteId}
Authorization: Bearer {token}
```

#### 5. Mover Item para Carrinho
```http
POST /wishlist/{itemId}/move-to-cart
Authorization: Bearer {token}
Content-Type: application/json

{}
```

### Carrinho de Compras (Cart)

#### 1. Buscar Carrinho do Usuário
```http
GET /carrinhos?clienteId={userId}
Authorization: Bearer {token}
```

**Resposta:**
```json
{
    "id": 789,
    "clienteId": 123,
    "itens": [
        {
            "produtoId": 456,
            "quantidade": 2,
            "produto": {
                "id": 456,
                "nome": "Lenovo Yoga Slim 7i",
                "preco": 6999.99,
                "imagem": "url-da-imagem",
                "categoria": "Notebooks"
            }
        }
    ]
}
```

#### 2. Atualizar Carrinho
```http
PUT /carrinhos/{carrinhoId}
Authorization: Bearer {token}
Content-Type: application/json

{
    "clienteId": 123,
    "itens": [
        {
            "produtoId": 456,
            "quantidade": 2
        }
    ]
}
```

#### 3. Limpar Carrinho
```http
DELETE /carrinhos/{carrinhoId}
Authorization: Bearer {token}
```

## 🎮 Uso dos Contextos React

### WishlistContext

```javascript
import { useWishlist } from '../context/WishlistContext';

const MyComponent = () => {
    const {
        items,           // Array de itens na wishlist
        loading,         // Estado de carregamento
        error,           // Erro atual (se houver)
        addToWishlist,   // Função para adicionar item
        removeFromWishlist, // Função para remover item
        clearWishlist,   // Função para limpar wishlist
        moveToCart,      // Função para mover para carrinho
        isInWishlist,    // Verificar se item está na wishlist
        getWishlistCount, // Contar itens na wishlist
        searchWishlist,  // Buscar na wishlist
        filterByCategory, // Filtrar por categoria
        exportWishlist   // Exportar wishlist
    } = useWishlist();

    // Exemplo de uso
    const handleAddToWishlist = async (product) => {
        try {
            await addToWishlist(product);
            console.log('Produto adicionado à wishlist!');
        } catch (error) {
            console.error('Erro ao adicionar à wishlist:', error);
        }
    };

    return (
        <div>
            {loading && <p>Carregando wishlist...</p>}
            {error && <p>Erro: {error}</p>}
            <p>Total de itens: {getWishlistCount()}</p>
            {/* Renderizar itens */}
        </div>
    );
};
```

### CartContext

```javascript
import { useCart } from '../context/CartContext';

const MyComponent = () => {
    const {
        items,           // Array de itens no carrinho
        loading,         // Estado de carregamento
        error,           // Erro atual (se houver)
        addToCart,       // Função para adicionar item
        removeFromCart,  // Função para remover item
        updateQuantity,  // Função para atualizar quantidade
        clearCart,       // Função para limpar carrinho
        getCartTotal,    // Calcular total do carrinho
        getCartCount,    // Contar itens no carrinho
        isInCart,        // Verificar se item está no carrinho
        applyCoupon,     // Aplicar cupom de desconto
        calculateShipping // Calcular frete
    } = useCart();

    // Exemplo de uso
    const handleAddToCart = async (product) => {
        try {
            await addToCart(product);
            console.log('Produto adicionado ao carrinho!');
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        }
    };

    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            await updateQuantity(productId, quantity);
            console.log('Quantidade atualizada!');
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
        }
    };

    return (
        <div>
            {loading && <p>Carregando carrinho...</p>}
            {error && <p>Erro: {error}</p>}
            <p>Total: R$ {getCartTotal().toFixed(2)}</p>
            <p>Itens: {getCartCount()}</p>
            {/* Renderizar itens */}
        </div>
    );
};
```

## 🔄 Estados e Ciclo de Vida

### Estados de Loading
- **`loading`**: Indica operação em andamento
- **`isUpdating`**: Indica atualização específica de item
- **`isMovingToWishlist`**: Indica movimento para wishlist

### Estados de Erro
- **`error`**: Mensagem de erro atual
- **`clearError()`**: Função para limpar erros
- **Tratamento automático** de erros de API

### Sincronização Automática
- **Carregamento automático** ao autenticar
- **Sincronização em tempo real** com backend
- **Fallback para dados locais** em caso de erro

## 🎨 Componentes de UI

### Estados de Loading
```jsx
{loading && (
    <div className="loading-spinner">
        <FaSpinner className="spinner" />
        <p>Carregando...</p>
    </div>
)}
```

### Estados de Erro
```jsx
{error && (
    <div className="error-message">
        <FaExclamationTriangle />
        <p>{error}</p>
        <button onClick={clearError}>Tentar Novamente</button>
    </div>
)}
```

### Botões com Loading
```jsx
<button 
    onClick={handleAction} 
    disabled={loading}
    className="btn-primary"
>
    {loading ? <FaSpinner className="spinner" /> : 'Ação'}
</button>
```

## 🧪 Testes e Validação

### Validações Implementadas
- **Campos obrigatórios** em formulários
- **Quantidades válidas** (maior que 0)
- **Produtos únicos** na wishlist
- **Autenticação obrigatória** para todas as operações

### Tratamento de Erros
- **Erros de rede** com retry automático
- **Erros de validação** com mensagens claras
- **Erros de autenticação** com redirecionamento
- **Fallbacks** para operações offline

## 🚀 Funcionalidades Avançadas

### Wishlist
- **Filtros múltiplos** por categoria e preço
- **Busca em tempo real** por nome
- **Ordenação** por nome, preço, data
- **Exportação** em múltiplos formatos
- **Adição em lote** de produtos

### Carrinho
- **Cálculo automático** de totais
- **Frete gratuito** para compras acima de R$ 500
- **Cupons de desconto** com validação
- **Histórico de alterações** com timestamps
- **Sincronização cross-device**

## 📱 Responsividade

### Breakpoints
- **Desktop**: Grid de 2 colunas (carrinho + resumo)
- **Tablet**: Grid de 1 coluna com sidebar estático
- **Mobile**: Layout vertical com cards individuais

### Adaptações Mobile
- **Controles de quantidade** centralizados
- **Ações de item** em botões maiores
- **Resumo do pedido** sempre visível
- **Navegação otimizada** para touch

## 🔧 Configuração e Deploy

### Variáveis de Ambiente
```env
REACT_APP_API_BASE_URL=https://backend-toti.onrender.com
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENABLE_MOCK_DATA=false
```

### Build de Produção
```bash
npm run build
npm run start:prod
```

## 📊 Monitoramento e Analytics

### Métricas Implementadas
- **Tempo de carregamento** de wishlist/carrinho
- **Taxa de sucesso** das operações
- **Erros mais comuns** com stack traces
- **Performance** das operações CRUD

### Logs Estruturados
```javascript
console.log('Wishlist Operation', {
    operation: 'add_item',
    productId: product.id,
    userId: user.id,
    timestamp: new Date().toISOString(),
    success: true
});
```

## 🎯 Próximos Passos

### Funcionalidades Planejadas
- [ ] **Sincronização offline** com IndexedDB
- [ ] **Notificações push** para alterações
- [ ] **Histórico de preços** com gráficos
- [ ] **Recomendações** baseadas em wishlist
- [ ] **Compartilhamento** de wishlist
- [ ] **Backup automático** na nuvem

### Melhorias de Performance
- [ ] **Lazy loading** de imagens
- [ ] **Virtualização** para listas grandes
- [ ] **Cache inteligente** com TTL
- [ ] **Compressão** de dados
- [ ] **CDN** para imagens estáticas

---

## 📞 Suporte

Para dúvidas ou problemas com a implementação:

1. **Verificar console** do navegador para erros
2. **Testar rotas** individuais com Postman/Insomnia
3. **Verificar autenticação** e tokens
4. **Consultar logs** do backend
5. **Abrir issue** no repositório

---

**Desenvolvido com ❤️ para a Lenovo**