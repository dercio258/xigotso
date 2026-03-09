import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Package, DollarSign } from 'lucide-react';
import './ProductManager.css';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

const ProductManager = () => {
    const { token } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);

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
        }
    };

    const handleEdit = (product: any) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentProduct({ name: '', price: 0, type: 'Fisico', image: '', description: '' });
        setIsEditing(true);
    };

    const handleSave = async () => {
        const method = currentProduct.id ? 'PATCH' : 'POST';
        const url = currentProduct.id
            ? `http://localhost:3000/products/${currentProduct.id}`
            : 'http://localhost:3000/products';

        // Ensure price is a number
        const payload = {
            ...currentProduct,
            price: Number(currentProduct.price)
        };

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setIsEditing(false);
                fetchProducts();
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Deseja eliminar este produto?')) return;
        try {
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-manager">
            <div className="page-header">
                <h2>Gerir Produtos</h2>
                <button className="btn btn-primary" onClick={handleCreate}>
                    <Plus size={18} /> Novo Produto
                </button>
            </div>

            {!isEditing ? (
                <div className="product-list-card glass">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Preço (MZN)</th>
                                <th>Tipo</th>
                                <th>Acções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="product-cell">
                                        <img src={product.image || 'https://via.placeholder.com/50'} alt="" className="product-thumb" />
                                        <span>{product.name}</span>
                                    </td>
                                    <td><span className="price-tag">{formatCurrency(product.price)}</span></td>
                                    <td><span className="badge">{product.type}</span></td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="icon-btn edit" onClick={() => handleEdit(product)}><Edit2 size={16} /></button>
                                            <button className="icon-btn delete" onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <motion.div
                    className="product-editor glass"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="editor-header">
                        <h3>{currentProduct?.id ? 'Editar Produto' : 'Novo Produto'}</h3>
                        <button className="icon-btn" onClick={() => setIsEditing(false)}><X size={20} /></button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nome do Produto</label>
                            <div className="input-with-icon">
                                <Package size={18} />
                                <input
                                    type="text"
                                    value={currentProduct?.name}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                    placeholder="Ex: Camiseta Elite"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Preço (MZN)</label>
                            <div className="input-with-icon">
                                <DollarSign size={18} />
                                <input
                                    type="number"
                                    step="0.01"
                                    value={currentProduct?.price}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                    placeholder="0,00"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Tipo de Produto</label>
                            <select
                                value={currentProduct?.type}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, type: e.target.value })}
                            >
                                <option value="Fisico">Fisico</option>
                                <option value="Digital">Digital</option>
                            </select>
                        </div>
                        <div className="form-group full">
                            <label>URL da Imagem</label>
                            <input
                                type="text"
                                value={currentProduct?.image}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="form-group full">
                            <label>Descrição</label>
                            <textarea
                                value={currentProduct?.description}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                placeholder="Detalhes do produto..."
                            />
                        </div>
                    </div>

                    <div className="editor-actions">
                        <button className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancelar</button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={18} /> Guardar Produto
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ProductManager;
