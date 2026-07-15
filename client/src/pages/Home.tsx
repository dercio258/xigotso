import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Layout, Palette, Video, Image as ImageIcon, Sparkles, Shield, Rocket } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const productImages = [
    'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=1000&auto=format&fit=crop&q=80'
];

const iconMap: { [key: string]: React.ReactNode } = {
    'Palette': <Palette size={32} />,
    'Layout': <Layout size={32} />,
    'Video': <Video size={32} />,
    'ImageIcon': <ImageIcon size={32} />,
    'CheckCircle': <CheckCircle size={32} />,
    'Sparkles': <Sparkles size={32} />,
    'Shield': <Shield size={32} />,
    'Rocket': <Rocket size={32} />
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

const Home = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = React.useState(0);
    const [services, setServices] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % productImages.length);
        }, 4000);

        fetchServices();

        return () => clearInterval(timer);
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services');
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    setServices(data.slice(0, 6));
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

    const partners = [
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062340/expresso-diario_qspffq.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062341/emme_rqfchm.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062341/images_1_bsan6g.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062341/engeco_ua3tv0.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/images_u6ggua.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/378-x-349_vvhwsp.jpg',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/camaf_x2gfvz.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062340/cavest_hbuxkq.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062340/eloi_icuqqp.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/b8m_thdh8c.png',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/true_north_lda_logo_anxer7.jpg',
        'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062340/associacao_fbkyza.png'
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="home-page">
            <section className="hero">
                <motion.div
                    className="hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.span variants={itemVariants} className="subtitle">Líder em Soluções Criativas</motion.span>
                    <motion.h1 variants={itemVariants}>
                        Transformamos ideias em <span className="text-accent">resultados visuais</span> e digitais.
                    </motion.h1>
                    <motion.p variants={itemVariants}>
                        Da identidade da sua marca à sua presença online, a XIGOTSO é o seu parceiro estratégico em Maputo.
                    </motion.p>
                    <motion.div variants={itemVariants} className="hero-btns">
                        <button className="btn btn-primary" onClick={() => document.getElementById('home-services')?.scrollIntoView({ behavior: 'smooth' })}>
                            Explorar Soluções <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" as any }}
                >
                    <div className="hero-image-wrapper">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImage}
                                src={productImages[currentImage]}
                                alt="XIGOTSO Performance"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            />
                        </AnimatePresence>
                    </div>
                </motion.div>
            </section>

            <section className="partners-ticker-section">
                <div className="ticker-wrapper">
                    <div className="ticker-inner">
                        {[...partners, ...partners].map((logo, i) => (
                            <img key={i} src={logo} alt="Partner Logo" className="ticker-logo" />
                        ))}
                    </div>
                </div>
            </section>

            <section id="home-services" className="home-services section">
                <div className="section-header">

                    <h2>Nossos Serviços Principais</h2>
                   
                </div>

                {loading ? (
                    <div className="loading-container">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Sparkles size={40} className="text-accent" />
                        </motion.div>
                    </div>
                ) : (
                    <div className="services-main-grid">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.id}
                                className="service-main-card glass-premium"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                onClick={() => navigate(`/servicos/${service.slug}`)}
                            >
                                <div className="card-badge">{service.category}</div>
                                <div className="service-card-icon-wrapper">
                                    <div className="service-card-icon">
                                        {service.gallery && service.gallery[0] ? (
                                            <img src={service.gallery[0]} alt={service.title} className="service-thumb" />
                                        ) : (
                                            iconMap[service.icon] || <Sparkles size={32} />
                                        )}
                                    </div>
                                    <div className="icon-glow"></div>
                                </div>
                                <div className="service-card-content">
                                    <h3>{service.title}</h3>
                                    <p className="service-card-desc">
                                        {service.description.substring(0, 120)}...
                                    </p>
                                    <div className="service-features-mini">
                                        {service.features?.slice(0, 2).map((feature: string, idx: number) => (
                                            <span key={idx} className="mini-badge">
                                                <CheckCircle size={12} /> {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer-cta">
                                    <span>Explorar Serviço</span>
                                    <div className="arrow-circle">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="section-footer-btns">
                    <button className="btn btn-outline premium-btn" onClick={() => navigate('/servicos')}>
                        Ver Catálogo Completo <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
