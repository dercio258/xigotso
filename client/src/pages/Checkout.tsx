import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { ShoppingBag, ArrowRight, ShieldCheck, Trash2, Plus, Minus, CreditCard, Landmark, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const CheckoutPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, formattedTotal, clearCart } = useCart();
    const navigate = useNavigate();

    // Form states
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola' | 'transfer'>('mpesa');
    
    // Status states
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStep, setProcessStep] = useState(0); // 0: Idle, 1: USSD Push Sent, 2: Success
    const [orderRef, setOrderRef] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleQuantityChange = (id: number, currentQty: number, change: number) => {
        updateQuantity(id, currentQty + change);
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName || !email || !phone) {
            setValidationError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validate Mozambican phone format (starts with 82, 83, 84, 85, 86, 87)
        const cleanPhone = phone.replace(/\s+/g, '');
        const phoneRegex = /^(?:\+258|258)?(8[2-7]\d{7})$/;
        if (!phoneRegex.test(cleanPhone)) {
            setValidationError('Por favor, introduza um número de telemóvel válido de Moçambique (ex: 84XXXXXXX).');
            return;
        }

        setValidationError('');
        setIsProcessing(true);
        setProcessStep(1);

        // Generate a mock transaction reference
        const ref = 'XG-' + Math.random().toString(36).substring(2, 9).toUpperCase();
        setOrderRef(ref);

        // Step 1: Simulate sending USSD Push Notification (3 seconds)
        setTimeout(() => {
            setProcessStep(2); // Step 2: Show successful payment confirmation screen
        }, 4000);
    };

    const finishOrder = () => {
        clearCart();
        navigate('/');
    };

    if (cart.length === 0 && processStep !== 2) {
        return (
            <div className="checkout-empty section">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="empty-card glass-premium"
                >
                    <ShoppingBag size={64} className="empty-icon text-accent" />
                    <h2>O seu carrinho está vazio</h2>
                    <p>Adicione produtos da nossa loja para continuar para o checkout.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/loja')}>
                        Ir para a Loja <ArrowRight size={18} />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="checkout-page section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="subtitle">Finalizar Encomenda</span>
                <h1>Checkout <span className="text-accent">Seguro</span></h1>
                <p>Confirme os seus produtos e efetue o pagamento de forma rápida.</p>
            </motion.div>

            <div className="checkout-container">
                {/* 1. Products list column */}
                <div className="checkout-products-col">
                    <h2 className="col-title">Seu Carrinho ({cart.length})</h2>
                    <div className="checkout-items-list">
                        {cart.map((item) => (
                            <motion.div 
                                key={item.id} 
                                className="checkout-item-card glass-premium"
                                layout
                            >
                                <img src={item.image} alt={item.name} className="checkout-item-thumb" />
                                <div className="checkout-item-details">
                                    <h3>{item.name}</h3>
                                    <span className="checkout-item-price-unit">
                                        {formatCurrency(item.price)}
                                    </span>
                                    
                                    <div className="checkout-item-actions">
                                        <div className="quantity-controls-checkout">
                                            <button 
                                                className="btn-qty" 
                                                onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="qty-val">{item.quantity}</span>
                                            <button 
                                                className="btn-qty" 
                                                onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button className="btn-remove-item" onClick={() => removeFromCart(item.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. Billing details column */}
                <div className="checkout-form-col">
                    <div className="checkout-form-card glass-premium">
                        <h2 className="col-title">Dados de Pagamento</h2>
                        
                        {validationError && (
                            <div className="checkout-validation-error">
                                {validationError}
                            </div>
                        )}

                        <form onSubmit={handleCheckout}>
                            <div className="form-group-checkout">
                                <label htmlFor="checkout-name">Nome Completo *</label>
                                <input 
                                    id="checkout-name"
                                    type="text" 
                                    placeholder="Ex: João Manguele"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group-checkout">
                                <label htmlFor="checkout-email">Endereço de E-mail *</label>
                                <input 
                                    id="checkout-email"
                                    type="email" 
                                    placeholder="Ex: joao@email.co.mz"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group-checkout">
                                <label htmlFor="checkout-phone">Número M-Pesa / E-Mola *</label>
                                <input 
                                    id="checkout-phone"
                                    type="tel" 
                                    placeholder="Ex: 841234567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="payment-method-selector">
                                <label>Método de Pagamento</label>
                                <div className="payment-options-grid">
                                    <div 
                                        className={`payment-option-card ${paymentMethod === 'mpesa' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('mpesa')}
                                    >
                                        <div className="option-circle-check"></div>
                                        <span className="option-label">M-Pesa</span>
                                    </div>

                                    <div 
                                        className={`payment-option-card ${paymentMethod === 'emola' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('emola')}
                                    >
                                        <div className="option-circle-check"></div>
                                        <span className="option-label">E-Mola</span>
                                    </div>

                                    <div 
                                        className={`payment-option-card ${paymentMethod === 'transfer' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('transfer')}
                                    >
                                        <Landmark size={18} />
                                        <span className="option-label">Transferência</span>
                                    </div>
                                </div>
                            </div>

                            <div className="checkout-summary-breakdown">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>{formattedTotal}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Taxa / IVA (16%)</span>
                                    <span>{formatCurrency(cartTotal * 0.16)}</span>
                                </div>
                                <hr className="summary-divider" />
                                <div className="summary-row total-row">
                                    <span>Total a Pagar</span>
                                    <span className="text-accent">{formatCurrency(cartTotal * 1.16)}</span>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block btn-pay">
                                <ShieldCheck size={18} /> Efetuar Pagamento
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Payment simulation modal overlay */}
            <AnimatePresence>
                {isProcessing && (
                    <div className="payment-modal-overlay">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="payment-modal-card glass-premium"
                        >
                            {processStep === 1 && (
                                <div className="payment-step-processing">
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                        className="payment-spinner"
                                    >
                                        <Sparkles size={48} className="text-accent" />
                                    </motion.div>
                                    <h3>A processar transação...</h3>
                                    <p className="payment-modal-desc">
                                        Enviámos um pedido de confirmação <strong>USSD Push</strong> para o número <strong>{phone}</strong>.
                                    </p>
                                    <div className="payment-instruction-box">
                                        <p>1. Verifique a tela do seu telemóvel.</p>
                                        <p>2. Digite o seu <strong>PIN de {paymentMethod === 'mpesa' ? 'M-Pesa' : 'E-Mola'}</strong> para autorizar o débito de <strong>{formatCurrency(cartTotal * 1.16)}</strong>.</p>
                                    </div>
                                    <span className="simulation-notice">Modo Simulação: O pagamento será confirmado automaticamente em instantes...</span>
                                </div>
                            )}

                            {processStep === 2 && (
                                <div className="payment-step-success">
                                    <div className="success-icon-wrapper">
                                        <CheckCircle size={64} className="text-success" />
                                    </div>
                                    <h3>Pagamento Confirmado!</h3>
                                    <p className="payment-modal-desc">
                                        Muito obrigado, <strong>{fullName}</strong>. A sua encomenda foi registada com sucesso no nosso sistema.
                                    </p>
                                    
                                    <div className="receipt-details-box">
                                        <div className="receipt-line">
                                            <span>Referência:</span>
                                            <strong className="text-accent">{orderRef}</strong>
                                        </div>
                                        <div className="receipt-line">
                                            <span>Valor Pago:</span>
                                            <strong>{formatCurrency(cartTotal * 1.16)}</strong>
                                        </div>
                                        <div className="receipt-line">
                                            <span>Método:</span>
                                            <strong className="uppercase">{paymentMethod}</strong>
                                        </div>
                                        <div className="receipt-line">
                                            <span>Contacto:</span>
                                            <strong>{phone}</strong>
                                        </div>
                                    </div>

                                    <p className="receipt-subtext">
                                        Um e-mail de confirmação com os detalhes da faturação foi enviado para <strong>{email}</strong>.
                                    </p>

                                    <button className="btn btn-primary" onClick={finishOrder}>
                                        Voltar à Página Inicial
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CheckoutPage;
