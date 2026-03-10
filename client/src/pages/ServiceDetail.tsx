import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) return <div className="section">Carregando detalhes do serviço...</div>;
    if (!service) return <div className="section">Serviço não encontrado.</div>;

    const gallery = service.gallery || [];

    return (
        <div className="service-detail-page-v2">
            <div className="detail-container-new">
                {/* Compact Header & Grid Layout */}
                <div className="detail-main-layout">

                    {/* Primary Content Side */}
                    <div className="detail-content-primary">
                        <motion.div
                            className="detail-header-minimal"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Link to="/servicos" className="back-link-minimal">
                                <ArrowLeft size={14} /> Voltar
                            </Link>
                            <h1>{service.title}</h1>
                        </motion.div>

                        {/* High-Impact Mosaic Gallery */}
                        <motion.div
                            className="service-mosaic-gallery"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {gallery.length > 0 ? (
                                <div className={`mosaic-grid items-${Math.min(gallery.length, 5)}`}>
                                    {gallery.slice(0, 5).map((img: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`mosaic-item item-${idx}`}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img src={img} alt={`${service.title} ${idx}`} />
                                            <div className="overlay-zoom">Clique para ampliar</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-images-placeholder">
                                    <img src="https://via.placeholder.com/1200x600?text=XIGOTSO+Serviços" alt="Placeholder" />
                                </div>
                            )}
                        </motion.div>

                        <div className="detail-body-split">
                            <motion.div
                                className="detail-description-section"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <p className="description-text">{service.description}</p>
                            </motion.div>

                            {/* Sidebar Area */}
                            <aside className="detail-sidebar-v2">
                                <div className="features-card glass-clean">
                                    <h3>O que oferecemos</h3>
                                    <div className="features-list-v2">
                                        {service.features?.map((feature: string, i: number) => (
                                            <div key={i} className="feature-item-v2">
                                                <CheckCircle size={18} />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="close-lightbox">×</button>
                        <motion.img
                            src={selectedImage}
                            alt="Full view"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

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
