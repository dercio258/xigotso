import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Shop.css';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

const ShopPage = () => {
    const { addToCart, cartCount } = useCart();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="section">Carregando loja...</div>;

    return (
        <div className="shop-page section">
            {/* Floating Cart Indicator */}
            {cartCount > 0 && (
                <motion.div
                    className="floating-cart"
                    initial={{ scale: 0, y: 20 }}
                    animate={{
                        scale: 1,
                        y: [0, -10, 0],
                    }}
                    transition={{
                        scale: { duration: 0.3 },
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    whileHover={{ scale: 1.1 }}
                >
                    <ShoppingCart size={24} />
                    <span className="count">{cartCount}</span>
                </motion.div>
            )}

            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="subtitle">Loja XIGOTSO</span>
                <h1>Produtos <span className="text-accent">Exclusivos</span></h1>
                <p>Encontre activos digitais e produtos físicos personalizados com a nossa qualidade.</p>
            </motion.div>

            {products.length === 0 && <div className="no-products">Nenhum produto cadastrado.</div>}

            <div className="shop-grid">
                {products.map((product, i) => (
                    <motion.div
                        key={product.id}
                        className="product-card glass"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="product-img">
                            <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
                            <span className={`product-badge ${product.type?.toLowerCase()}`}>
                                <Package size={18} /> {product.type}
                            </span>
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <div className="product-footer">
                                <span className="price">{formatCurrency(product.price)}</span>
                                <button className="btn-cart" onClick={() => addToCart(product)}>
                                    <ShoppingCart size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
