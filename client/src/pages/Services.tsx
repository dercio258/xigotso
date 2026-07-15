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

const staticServices = [
    {
        id: 1,
        title: "Identidade Visual & Branding",
        category: "Design",
        slug: "identidade-visual-branding",
        description: "Criamos logótipos únicos, paletas de cores, tipografia e diretrizes de marca completas para posicionar o seu negócio no mercado moçambicano.",
        icon: "Palette",
        gallery: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80"],
        features: ["Design de Logotipo", "Manual de Marca", "Estacionário Completo"]
    },
    {
        id: 2,
        title: "Desenvolvimento Web & E-commerce",
        category: "Tecnologia",
        slug: "desenvolvimento-web-ecommerce",
        description: "Websites institucionais e lojas online rápidas, seguras e otimizadas para motores de busca (SEO) que convertem visitantes em clientes.",
        icon: "Globe",
        gallery: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"],
        features: ["Sites Responsivos", "Lojas Shopify/WooCommerce", "Integração M-Pesa"]
    },
    {
        id: 3,
        title: "Produção Multimédia & Vídeo",
        category: "Produção",
        slug: "producao-multimedia-video",
        description: "Produção de vídeo promocional, cobertura de eventos, fotografia corporativa e pós-produção profissional com qualidade cinematográfica.",
        icon: "Video",
        gallery: ["https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=800&auto=format&fit=crop&q=80"],
        features: ["Vídeos Promocionais", "Edição de Vídeo", "Fotografia Comercial"]
    },
    {
        id: 4,
        title: "Marketing Digital & Redes Sociais",
        category: "Marketing",
        slug: "marketing-digital-redes-sociais",
        description: "Gestão estratégica de redes sociais, campanhas patrocinadas (Google e Meta Ads) e criação de conteúdo focado no engajamento da marca.",
        icon: "Share2",
        gallery: ["https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&auto=format&fit=crop&q=80"],
        features: ["Gestão de Redes Sociais", "Tráfego Pago", "Criação de Conteúdo"]
    },
    {
        id: 5,
        title: "Sinalética & Impressão de Grande Formato",
        category: "Gráfica",
        slug: "sinaletica-impressao",
        description: "Produção e instalação de sinalética corporativa, reclames luminosos, decoração de viaturas e montras, e lonas publicitárias.",
        icon: "Printer",
        gallery: ["https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80"],
        features: ["Reclames Luminosos", "Decoração de Viaturas", "Roll-ups e Banners"]
    },
    {
        id: 6,
        title: "Mobiliário Corporativo & Carpintaria",
        category: "Produção",
        slug: "mobiliario-corporativo",
        description: "Design e fabrico de mobiliário de escritório por medida, stands para feiras e soluções de carpintaria comercial sob padrão premium.",
        icon: "Hammer",
        gallery: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80"],
        features: ["Secretárias e Arquivos", "Stands de Feiras", "Mobiliário por Medida"]
    }
];

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
            const response = await fetch('/api/services');
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    setServices(data);
                    setLoading(false);
                    return;
                }
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        }
        setServices(staticServices);
        setLoading(false);
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
