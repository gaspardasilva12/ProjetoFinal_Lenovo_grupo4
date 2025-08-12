import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaFilter, FaSort, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { getProductsByCategory, getCategoryById, formatPrice } from '../data/lenovoData';
import '../styles/ProductsCategory.css';

const ProductsCategory = () => {
    const { category } = useParams();
    const { addToCart } = useCart();
    const [sortBy, setSortBy] = useState('name');
    const [filterPrice, setFilterPrice] = useState('all');
    
    // Obter produtos da categoria usando os dados do arquivo
    let products = getProductsByCategory(category);

    // Aplicar filtros
    if (filterPrice !== 'all') {
        products = products.filter(product => {
            const price = product.price;
            switch (filterPrice) {
                case 'under-3000':
                    return price < 3000;
                case '3000-6000':
                    return price >= 3000 && price < 6000;
                case 'over-6000':
                    return price >= 6000;
                default:
                    return true;
            }
        });
    }

    // Aplicar ordenação
    products = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    const getCategoryTitle = (cat) => {
        const category = getCategoryById(cat);
        return category ? category.name : cat.replace('-', ' ');
    };

    return (
        <div className="products-category">
            <div className="category-header">
                <h1>{getCategoryTitle(category)}</h1>
                <p>Encontre os melhores produtos da categoria {getCategoryTitle(category).toLowerCase()}</p>
            </div>

            <div className="category-filters">
                <div className="filter-group">
                    <label>
                        <FaFilter /> Filtrar por Preço:
                    </label>
                    <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
                        <option value="all">Todos os preços</option>
                        <option value="under-3000">Até R$ 3.000</option>
                        <option value="3000-6000">R$ 3.000 - R$ 6.000</option>
                        <option value="over-6000">Acima de R$ 6.000</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>
                        <FaSort /> Ordenar por:
                    </label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Nome</option>
                        <option value="price-low">Menor Preço</option>
                        <option value="price-high">Maior Preço</option>
                        <option value="rating">Melhor Avaliação</option>
                    </select>
                </div>
            </div>

            {products.length > 0 ? (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                                {product.badge && (
                                    <div className="product-badge">{product.badge}</div>
                                )}
                                {product.discount && (
                                    <div className="product-discount">-{product.discount}%</div>
                                )}
                            </div>
                            
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                
                                <div className="product-rating">
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar 
                                                key={i} 
                                                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} 
                                            />
                                        ))}
                                    </div>
                                    <span>({product.reviews})</span>
                                </div>
                                
                                <div className="product-price">
                                    <span className="current-price">{formatPrice(product.price)}</span>
                                    {product.originalPrice && (
                                        <span className="original-price">{formatPrice(product.originalPrice)}</span>
                                    )}
                                </div>
                                
                                <button 
                                    className="btn-add-cart"
                                    onClick={() => addToCart(product)}
                                >
                                    <FaShoppingCart /> Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-products">
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente ajustar os filtros ou verificar outras categorias.</p>
                </div>
            )}
        </div>
    );
};

export default ProductsCategory;