import { motion } from 'framer-motion';
import { ExternalLink, Search, Filter } from 'lucide-react';
import './Portfolio.css';

const projects = [
    {
        title: "Branding Industrial - EMA",
        category: "Design & Marketing",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80"
    },
    {
        title: "Mobiliário Corporativo",
        category: "Produção",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80"
    },
    {
        title: "Sinalética Premium",
        category: "Design",
        image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80"
    }
];

const Portfolio = () => {
    return (
        <div className="portfolio-page section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <span className="subtitle">Portfólio</span>
                <h1>Excelência em <span className="text-accent">Execução</span></h1>
                <p>Uma seleção de projectos que demonstram o nosso compromisso com a qualidade.</p>
            </motion.div>

            <div className="portfolio-filters-minimal">
                <button className="active">Todos</button>
                <button>Marketing</button>
                <button>Produção</button>
                <button>Carpintaria</button>
            </div>

            <div className="portfolio-grid-clean">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        className="portfolio-item-minimal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="portfolio-img-wrapper">
                            <img src={project.image} alt={project.title} />
                            <div className="portfolio-overlay-clean">
                                <ExternalLink size={24} />
                            </div>
                        </div>
                        <div className="portfolio-meta-clean">
                            <span className="category-label">{project.category}</span>
                            <h3>{project.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
