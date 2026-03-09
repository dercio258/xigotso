import { motion } from 'framer-motion';
import { Palette, Share2, Hammer, Printer, Box, Camera, Globe, Search, Layout, Video, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Services.css';

const iconMap: { [key: string]: React.ReactNode } = {
    'Palette': <Palette />,
    'Layout': <Layout />,
    'Video': <Video />,
    'ImageIcon': <ImageIcon />,
    'Share2': <Share2 />,
    'Hammer': <Hammer />,
    'Printer': <Printer />,
    'Box': <Box />,
    'Camera': <Camera />,
    'Globe': <Globe />,
    'Search': <Search />
};

const ServicesPage = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
        window.scrollTo(0, 0);
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:3000/services');
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="loading-state section">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                <Sparkles size={40} className="text-accent" />
            </motion.div>
            <p>Carregando catálogo de serviços...</p>
        </div>
    );

    return (
        <div className="services-page section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="subtitle">Nossa Expertise Especializada</span>
                <h1>Soluções <span className="text-accent">Integradas</span> & Inovação</h1>
                <p>Explore o nosso ecossistema completo de serviços desenhados para elevar o potencial estratégico e visual do seu negócio em Moçambique.</p>
            </motion.div>

            {services.length === 0 ? (
                <div className="no-services shadow-soft">
                    <Box size={48} className="text-dim" />
                    <p>Nenhum serviço disponível no momento. Por favor, volte mais tarde.</p>
                </div>
            ) : (
                <div className="services-grid-unified">
                    {services.map((service: any, i: number) => (
                        <motion.div
                            key={service.id || i}
                            className="service-card-new shadow-premium"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -12 }}
                            onClick={() => navigate(`/servicos/${service.slug}`)}
                        >
                            <div className="card-media">
                                <img
                                    src={service.gallery?.[0] || 'https://via.placeholder.com/600x400?text=XIGOTSO+Service'}
                                    alt={service.title}
                                    className="main-thumb"
                                />
                                <div className="card-overlay-gradient"></div>
                                <div className="category-tag">{service.category}</div>
                            </div>

                            <div className="card-body">
                                <div className="card-icon-mini">
                                    {iconMap[service.icon] || <Sparkles size={20} />}
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description.substring(0, 100)}...</p>

                                <div className="card-footer-simple">
                                    <span>Saiba mais</span>
                                    <div className="arrow-icon">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServicesPage;
