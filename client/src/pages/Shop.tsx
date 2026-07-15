import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shop.css';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

const staticProducts = [
    {
        id: 1,
        name: "Agenda Personalizada XIGOTSO 2026",
        price: 1500,
        type: "Físico",
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80",
        description: "Agenda executiva personalizada com capa de couro ecológico e gravação em baixo relevo. Ideal para planeamento corporativo."
    },
    {
        id: 2,
        name: "Caneca Térmica Inox com Tampa",
        price: 750,
        type: "Físico",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
        description: "Caneca de aço inoxidável térmica com gravação a laser. Mantém a temperatura das bebidas quente ou fria por até 6 horas."
    },
    {
        id: 3,
        name: "T-shirt Premium Personalizada",
        price: 950,
        type: "Físico",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
        description: "T-shirt de algodão premium com estampa de alta qualidade da sua identidade corporativa."
    },
    {
        id: 4,
        name: "Cartões de Visita Premium Couché",
        price: 3200,
        type: "Físico",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
        description: "Cartões de visita com verniz localizado ou laminação mate em papel couché 350g (500 unidades)."
    },
    {
        id: 5,
        name: "Caderno Espiral A5 (Capa Dura)",
        price: 450,
        type: "Físico",
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80",
        description: "Caderno com capa dura personalizada e folhas pautadas. Ideal para notas e uso diário."
    },
    {
        id: 6,
        name: "Roll-up Banner Completo (85x200cm)",
        price: 4800,
        type: "Físico",
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&auto=format&fit=crop&q=80",
        description: "Banner roll-up completo com estrutura de alumínio e saco de transporte. Impressão em lona de alta resolução."
    }
];

const ShopPage = () => {
    const { addToCart, cartCount } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    setProducts(data);
                    setLoading(false);
                    return;
                }
            }
        } catch (error) {
            console.error('Error fetching products, falling back to static products:', error);
        }
        setProducts(staticProducts);
        setLoading(false);
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
                    style={{ cursor: 'pointer' }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => navigate('/checkout')}
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
