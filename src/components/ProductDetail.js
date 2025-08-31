import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { produtosAPI, categoriasAPI } from '../services/api';
import { FaStar, FaHeart, FaShare, FaTruck, FaShieldAlt, FaCreditCard, FaArrowLeft } from 'react-icons/fa';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getCartCount } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Obter o produto por ID
                const productData = await produtosAPI.getById(id);
                
                if (productData) {
                    // Mapear os dados da API para o formato esperado
                    const mappedProduct = {
                        id: productData.id,
                        name: productData.nome,
                        description: productData.nome, // A API não tem descrição separada
                        price: productData.preco,
                        image: productData.imagens && productData.imagens.length > 0 ? productData.imagens[0].url : '/images/placeholder.jpg',
                        additionalImages: productData.imagens ? productData.imagens.slice(1).map(img => img.url) : [],
                        categoriaId: productData.categoriaId,
                        // Valores padrão para campos que não estão na API
                        rating: 4.5,
                        reviews: 127,
                        inStock: true,
                        features: [
                            'Produto de alta qualidade',
                            'Garantia do fabricante',
                            'Envio rápido e seguro'
                        ],
                        specs: {
                            'Preço': `R$ ${productData.preco.toFixed(2)}`,
                            'Categoria': 'Carregando...'
                        }
                    };
                    
                    setProduct(mappedProduct);
                    
                    // Obter informações da categoria
                    if (productData.categoriaId) {
                        try {
                            const categoryData = await categoriasAPI.getById(productData.categoriaId);
                            setCategory(categoryData);
                            
                            // Atualizar as especificações com a categoria
                            setProduct(prev => ({
                                ...prev,
                                category: categoryData.nome,
                                specs: {
                                    ...prev.specs,
                                    'Categoria': categoryData.nome
                                }
                            }));
                        } catch (categoryError) {
                            console.error('Erro ao carregar categoria:', categoryError);
                        }
                    }
                } else {
                    setError('Produto não encontrado');
                }
            } catch (error) {
                console.error('Erro ao carregar produto:', error);
                setError('Erro ao carregar o produto. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                ...product,
                quantity: quantity
            });
        }
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const toggleWishlist = async () => {
        if (product) {
            if (isInWishlist(product.id)) {
                await removeFromWishlist(product.id);
            } else {
                await addToWishlist(product);
            }
        }
    };

    // Verificar se o produto está na lista de desejos
    const isWishlisted = product ? isInWishlist(product.id) : false;
}