import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFilter, FaSort, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { produtosAPI, categoriasAPI } from '../services/api';
import '../styles/ProductsCategory.css';

const ProductsCategory = () => {
  const { category: categoryParam } = useParams();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('name');
  const [filterPrice, setFilterPrice] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar categorias e produtos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Carregar todas as categorias
        const categoriesData = await categoriasAPI.getAll();
        setCategories(categoriesData);

        // Carregar todos os produtos
        const productsData = await produtosAPI.getAll();

        // Se há um parâmetro de categoria, filtrar produtos por categoria
        if (categoryParam) {
          // Buscar a categoria por nome ou ID
          const category = categoriesData.find(cat =>
            cat.nome.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase() ||
            cat.id.toString() === categoryParam
          );

          if (category) {
            setCurrentCategory(category);
            const filteredProducts = productsData.filter(product =>
              product.categoriaId === category.id
            );
            setProducts(filteredProducts);
          } else {
            setProducts([]);
            setError('Categoria não encontrada');
          }
        } else {
          // Se não há parâmetro de categoria, mostrar todos os produtos
          setProducts(productsData);
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar os produtos. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryParam]);

  // Aplicar filtros
  let filteredProducts = [...products];
  if (filterPrice !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      // Sua lógica de filtro aqui
    });
  }

  // Aplicar ordenación
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.preco - b.preco;
      case 'price-high':
        return b.preco - a.preco;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
      default:
        return (a.nome || '').localeCompare(b.nome || '');
    }
  });

  const getCategoryTitle = () => {
    if (currentCategory) {
      return currentCategory.nome;
    }
    if (categoryParam) {
      return categoryParam.replace(/-/g, ' ');
    }
    return 'Todos os Produtos';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="loading" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '1.2rem',
        color: '#666'
      }}>Carregando produtos...      </div>
    );
  }

  if (error) {
    return (
      <div className="error" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '1.2rem',
        color: '#e60012',
        textAlign: 'center',
        padding: '20px'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div className="products-category">
      <div className="category-header">
        <h1>{getCategoryTitle()}</h1>
        <p>Encontre os melhores produtos da categoria {getCategoryTitle().toLowerCase()}</p>
      </div>

      <div className="filters-section" style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div className="sort-filter">
          <label htmlFor="sort">Ordenar por:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value="name">Nome</option>
            <option value="price-low">Preço: Menor para Maior</option>
            <option value="price-high">Preço: Maior para Menor</option>
          </select>
        </div>
      </div>

      <div className="products-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        padding: '0 20px'
      }}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <div key={product.id} className="product-card" style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div className="product-image" style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {product.imagens && product.imagens.length > 0 ? (
                  <img
                    src={product.imagens[0].url}
                    alt={product.nome}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                <div style={{
                  display: product.imagens && product.imagens.length > 0 ? 'none' : 'block',
                  color: '#999',
                  fontSize: '14px'
                }}>
                  Sem imagem
                </div>
              </div>

              <h3 style={{
                margin: '0 0 12px',
                fontSize: '1.1rem',
                color: '#333'
              }}>
                {product.nome}
              </h3>

              <p style={{
                margin: '0 0 16px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#e60012'
              }}>
                {formatPrice(product.preco)}
              </p>

              <button
                onClick={() => addToCart({
                  id: product.id,
                  name: product.nome,
                  price: product.preco,
                  image: product.imagens && product.imagens.length > 0 ? product.imagens[0].url : null
                })}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#e60012',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#cc0010'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e60012'}
              >
                <FaShoppingCart style={{ marginRight: '8px' }} />
                Adicionar ao Carrinho
              </button>
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '40px',
            color: '#666',
            fontSize: '1.1rem'
          }}>
            Nenhum produto encontrado nesta categoria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCategory;