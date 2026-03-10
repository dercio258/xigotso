import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import './ServiceDetail.css';

const ServiceDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        details: ''
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`/api/services/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    setService(data);
                }
            } catch (error) {
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
        window.scrollTo(0, 0);
    }, [slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateFormalMessage = () => {
        return `Prezada Equipa XIGOTSO,

Gostaria de manifestar formalmente o meu interesse no vosso serviço de "${service.title}".

Seguem os meus dados para contacto e cotação:
Nome: ${formData.name}
Email: ${formData.email}
Contacto: ${formData.phone}

Detalhes do Projecto:
${formData.details || 'Tenho interesse em saber mais sobre este serviço e como podem ajudar o meu negócio.'}

Atenciosamente,
${formData.name}`;
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Por favor, preencha o seu nome, email e contacto para que possamos responder de forma profissional.');
            return;
        }
        const text = encodeURIComponent(generateFormalMessage());
        window.open(`https://wa.me/258840000000?text=${text}`, '_blank');
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            alert('Por favor, preencha pelo menos o seu nome e email.');
            return;
        }
        console.log('Pedido de cotação via Email:', formData);
        alert('Pedido de cotação enviado com sucesso! A equipa XIGOTSO entrará em contacto em breve.');
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) return <div className="section">Carregando detalhes do serviço...</div>;
    if (!service) return <div className="section">Serviço não encontrado.</div>;

    const gallery = service.gallery || [];

    return (
        <div className="service-detail-page section">
            <div className="detail-container-new">
                {/* Back Link */}
                <Link to="/servicos" className="back-link">
                    <ArrowLeft size={16} /> Ver Todos Serviços
                </Link>

                <motion.div
                    className="detail-header-content"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="subtitle">Nossos Serviços</span>
                    <h1>{service.title}</h1>
                </motion.div>

                <div className="detail-main-layout">
                    {/* Texto de Desenvolvimento */}
                    <motion.div
                        className="detail-text-rich"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="description-large">{service.description}</p>

                        <div className="features-highlight">
                            <h3>O que oferecemos:</h3>
                            <div className="features-grid">
                                {service.features?.map((feature: string, i: number) => (
                                    <div key={i} className="feature-pill">
                                        <CheckCircle size={18} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Galeria de Imagens */}
                    <motion.div
                        className="detail-visual-section"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="main-image-wrapper shadow-premium">
                            <img src={gallery[0] || 'https://via.placeholder.com/1200x800'} alt={service.title} />
                        </div>

                        {gallery.length > 1 && (
                            <div className="gallery-grid-simple">
                                {gallery.slice(1).map((img: string, idx: number) => (
                                    <div key={idx} className="gallery-mini-item shadow-soft">
                                        <img src={img} alt={`${service.title} ${idx}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Floating Action Button */}
            <motion.button
                className="fab-contact-btn shadow-premium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="fab-content">
                    <MessageCircle size={24} />
                    <span>Falar Connosco</span>
                </div>
            </motion.button>

            {/* Contact Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <motion.div
                        className="contact-modal-content glass-clean"
                        onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                    >
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>×</button>

                        <div className="modal-header">
                            <h2>Pedir Cotação</h2>
                            <p>Preencha para {service.title}</p>
                        </div>

                        <form className="modal-form">
                            <div className="input-field">
                                <label>Nome</label>
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" />
                            </div>
                            <div className="input-field">
                                <label>Email</label>
                                <input name="email" value={formData.email} onChange={handleChange} placeholder="seu@empresa.com" />
                            </div>
                            <div className="input-field">
                                <label>WhatsApp</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+258..." />
                            </div>
                            <div className="input-field">
                                <label>Projecto</label>
                                <textarea name="details" value={formData.details} onChange={handleChange} rows={3} placeholder="Breve descrição..." />
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={handleWhatsAppSubmit} className="btn-modal-wa">
                                    <MessageCircle size={18} /> WhatsApp
                                </button>
                                <button type="button" onClick={handleEmailSubmit} className="btn-modal-email">
                                    <Send size={18} /> E-mail
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetail;
