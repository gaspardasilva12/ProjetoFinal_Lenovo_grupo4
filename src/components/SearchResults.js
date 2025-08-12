import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaSort, FaStar, FaHeart } from 'react-icons/fa';
import { lenovoData, getProductsByCategory } from '../data/lenovoData';
import '../styles/SearchResults.css';

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
        rating: '',
        availability: ''
    });
    const [sortBy, setSortBy] = useState('relevance');
    const [showFilters, setShowFilters] = useState(false);

    const query = searchParams.get('q') || '';

    useEffect(() => {
        if (query) {
            performSearch();
        }
    }, [query, filters, sortBy]);

    const performSearch = () => {
        setLoading(true);
        
        // Simular busca
        setTimeout(() => {
            let results = [];
            
            // Buscar em todas as categorias
            Object.keys(lenovoData.products).forEach(category => {
                const categoryProducts = lenovoData.products[category];
                const filtered = categoryProducts.filter(product => {
                    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) ||
                                       product.description.toLowerCase().includes(query.toLowerCase()) ||
                                       product.category.toLowerCase().includes(query.toLowerCase());
                    
                    const matchesCategory = !filters.category || product.category === filters.category;
                    const matchesRating = !filters.rating || product.rating >= parseInt(filters.rating);
                    const matchesAvailability = !filters.availability || 
                        (filters.availability === 'inStock' && product.inStock) ||
                        (filters.availability === 'outOfStock' && !product.inStock);
                    
                    const matchesPrice = !filters.priceRange || (() => {
                        const [min, max] = filters.priceRange.split('-').map(Number);
                        if (max) {
                            return product.price >= min && product.price <= max;
                        }
                        return product.price >= min;
                    })();
                    
                    return matchesQuery && matchesCategory && matchesRating && matchesAvailability && matchesPrice;
                });
                
                results.push(...filtered);
            });
            
            // Aplicar ordenação
            results = sortResults(results, sortBy);
            
            setSearchResults(results);
            setLoading(false);
        }, 500);
    };

    const sortResults = (results, sortType) => {
        const sorted = [...results];
        
        switch (sortType) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'relevance':
            default:
                return sorted;
        }
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            priceRange: '',
            rating: '',
            availability: ''
        });
    };

    const priceRanges = [
        { value: '0-1000', label: 'Até R$ 1.000' },
        { value: '1000-3000', label: 'R$ 1.000 - R$ 3.000' },
        { value: '3000-5000', label: 'R$ 3.000 - R$ 5.000' },
        { value: '5000-10000', label: 'R$ 5.000 - R$ 10.000' },
        { value: '10000-', label: 'Acima de R$ 10.000' }
    ];

    const ratingOptions = [
        { value: '4', label: '4+ estrelas' },
        { value: '3', label: '3+ estrelas' },
        { value: '2', label: '2+ estrelas' }
    ];

    if (!query) {
        return (
            <div className="search-results-container">
                <div className="no-search-query">
                    <FaSearch className="search-icon" />
                    <h2>Digite algo para buscar</h2>
                    <p>Use a barra de pesquisa para encontrar produtos</p>
                </div>
            </div>
        );
    }

    return (
        <div className="search-results-container">
            <div className="search-header">
                <h1>Resultados da busca para "{query}"</h1>
                <p>{searchResults.length} produtos encontrados</p>
            </div>

            <div className="search-controls">
                <button 
                    className="filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FaFilter /> Filtros
                </button>
                
                <div className="sort-controls">
                    <FaSort />
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="relevance">Mais relevantes</option>
                        <option value="price-low">Menor preço</option>
                        <option value="price-high">Maior preço</option>
                        <option value="rating">Melhor avaliação</option>
                        <option value="name">Nome A-Z</option>
                    </select>
                </div>
            </div>

            <div className="search-content">
                {showFilters && (
                    <div className="filters-sidebar">
                        <div className="filter-section">
                            <h3>Categoria</h3>
                            <select 
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value="">Todas as categorias</option>
                                {lenovoData.categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-section">
                            <h3>Faixa de Preço</h3>
                            {priceRanges.map(range => (
                                <label key={range.value} className="filter-option">
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value={range.value}
                                        checked={filters.priceRange === range.value}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                    />
                                    {range.label}
                                </label>
                            ))}
                        </div>

                        <div className="filter-section">
                            <h3>Avaliação</h3>
                            {ratingOptions.map(option => (
                                <label key={option.value} className="filter-option">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={option.value}
                                        checked={filters.rating === option.value}
                                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>

                        <div className="filter-section">
                            <h3>Disponibilidade</h3>
                            <label className="filter-option">
                                <input
                                    type="radio"
                                    name="availability"
                                    value="inStock"
                                    checked={filters.availability === 'inStock'}
                                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                                />
                                Em estoque
                            </label>
                            <label className="filter-option">
                                <input
                                    type="radio"
                                    name="availability"
                                    value="outOfStock"
                                    checked={filters.availability === 'outOfStock'}
                                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                                />
                                Fora de estoque
                            </label>
                        </div>

                        <button className="clear-filters" onClick={clearFilters}>
                            Limpar Filtros
                        </button>
                    </div>
                )}

                <div className="search-results">
                    {loading ? (
                        <div className="loading-results">
                            <div className="loading-spinner"></div>
                            <p>Buscando produtos...</p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="results-grid">
                            {searchResults.map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image">
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                        {product.badge && (
                                            <div className="product-badge">{product.badge}</div>
                                        )}
                                        <button className="wishlist-btn">
                                            <FaHeart />
                                        </button>
                                    </div>
                                    
                                    <div className="product-info">
                                        <h3 className="product-name">
                                            <Link to={`/produto/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </h3>
                                        
                                        <div className="product-rating">
                                            <div className="stars">
                                                {[...Array(5)].map((_, index) => (
                                                    <FaStar 
                                                        key={index} 
                                                        className={index < Math.floor(product.rating) ? 'filled' : 'empty'} 
                                                    />
                                                ))}
                                            </div>
                                            <span>({product.reviews})</span>
                                        </div>
                                        
                                        <div className="product-price">
                                            {product.originalPrice > product.price && (
                                                <span className="original-price">
                                                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                                                </span>
                                            )}
                                            <span className="current-price">
                                                R$ {product.price.toFixed(2).replace('.', ',')}
                                            </span>
                                            {product.originalPrice > product.price && (
                                                <span className="discount-badge">
                                                    -{product.discount}%
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="product-actions">
                                            <Link 
                                                to={`/produto/${product.id}`}
                                                className="view-product-btn"
                                            >
                                                Ver Produto
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <FaSearch className="no-results-icon" />
                            <h3>Nenhum produto encontrado</h3>
                            <p>Tente ajustar os filtros ou usar termos diferentes</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults; 