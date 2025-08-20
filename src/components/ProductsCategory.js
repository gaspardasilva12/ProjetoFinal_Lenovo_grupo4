import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFilter, FaSort, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { getProductsByCategory, getCategoryById, formatPrice } from '../data/lenovoData';
import '../styles/ProductsCategory.css';

const ProductsCategory = () => {
  const { category: categoryParam } = useParams();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('name');
  const [filterPrice, setFilterPrice] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar produtos quando categoryParam mudar
  useEffect(() => {
    if (categoryParam) {
      const categoryProducts = getProductsByCategory(categoryParam);
      setProducts(categoryProducts);
      setLoading(false);
    }
  }, [categoryParam]);

  // Aplicar filtros
  let filteredProducts = [...products];
  if (filterPrice !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      // Sua lógica de filtro aqui
    });
  }

  // Aplicar ordenação
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
    if (!cat) return 'Categoria';
    
    const category = getCategoryById(cat);
    return category ? category.name : cat.replace(/-/g, ' ');
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="products-category">
      <div className="category-header">
    <h1>{getCategoryTitle(categoryParam)}</h1>
    <p>Encontre os melhores produtos da categoria {getCategoryTitle(categoryParam).toLowerCase()}</p>
</div>

{sortedProducts.length > 0 ? (
    sortedProducts.map(product =>(
        <div key={product.id} className="product-card">
            <h3> {product.name}</h3>
            {/* <p>{formarPrice(product.price)}</p> */}
        </div>
    ))
): (
    <p>Nenhum produto encontrado nesta caregoria.</p>
)}
</div>
);
};

export default ProductsCategory;