import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Layout, Palette, Video, Image as ImageIcon, Sparkles, Shield, Rocket } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const productImages = [
    'https://scontent.fmpm1-1.fna.fbcdn.net/v/t39.30808-6/480856568_661237086477249_535425760345813568_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=sL8VoiXs9WMQ7kNvwHfF-nY&_nc_oc=AdkfVvVWqmN5DUWK8jf-GxxaNtDo5lMw5fReVTWasurg-Nsv3Fmfmv5JybRsaOQv7a4&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm1-1.fna&_nc_gid=pAHhEtlvX2mhIUYVMmbGKQ&_nc_ss=8&oh=00_AfxF-YnHbAleFBmwYg9tJ-mDKJwf_DG5Lzwc_6D6jx3Euw&oe=69B49E67',
    'https://scontent.fmpm5-1.fna.fbcdn.net/v/t39.30808-6/480781349_661236439810647_8978684797533376523_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=WJKjveIH4woQ7kNvwHAVjzs&_nc_oc=Adl--v7XxWmsJe84285IOPVNwT9910s-x8aNajclj_3e_yHt20SJgc9OZHr2FeJtAC0&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm5-1.fna&_nc_gid=6e1sKQp8_zHcDcCkWht34w&_nc_ss=8&oh=00_AfwRoclcWosdVLJDxJiXtTZgdmsGpHqrQCRpF3PMBPFiLQ&oe=69B4A7DF',
    'https://scontent.fmpm5-1.fna.fbcdn.net/v/t39.30808-6/480804780_661223496478608_1118236541340582006_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=moNKUuG2k74Q7kNvwHSwACU&_nc_oc=AdlBIX2yDQTN4lRnoHZOh1i6dlSP9KHQaDg0IN7Iwn840FKWG3EphVI0q-nIfUbVKAo&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm5-1.fna&_nc_gid=6e1sKQp8_zHcDcCkWht34w&_nc_ss=8&oh=00_Afza32aAfXk8bytk9cpi32jUSKI25QoUc323jc2SfQniFg&oe=69B4887C',
    'https://scontent.fmpm5-1.fna.fbcdn.net/v/t39.30808-6/474686790_637556692178622_7235889011722148146_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=ubOaIIXqCBMQ7kNvwHAHQj_&_nc_oc=AdlhFo44E2tHogFG2ZOBToTOzWEl1xzRi9s1VCxgzs_wTzV9lBB2_Gnt-TS6DhEsMFY&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm5-1.fna&_nc_gid=jtMV3H-P5DONfV7kitxWKQ&_nc_ss=8&oh=00_Afzsd1itYjsfDUai8txm1_7EvaAHh_nGnUmrf6zJsS8Qhg&oe=69B4793F'
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
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            setServices(data.slice(0, 6)); // Show more services for a richer grid
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
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
