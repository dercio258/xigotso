import { motion } from 'framer-motion';
import { ExternalLink, Search, Filter } from 'lucide-react';
import './Portfolio.css';

const projects = [
    {
        title: "Branding Industrial - EMA",
        category: "Design & Marketing",
        image: "https://scontent.fmpm1-1.fna.fbcdn.net/v/t39.30808-6/475450849_640327388568219_2323565293247073147_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_ohc=q97vI18o8-EQ7kNvwHTqfUj&_nc_oc=Adnd8X5hWf8X5ZOhRN9_vGj0fK3r1H3X_N3jK2Q_pS1W_qXW3v6D6k8_Yf_vW4jXQ&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm1-1.fna&_nc_gid=A630YwHAZ1B9VUAjZf1fXA&_nc_ss=8&oh=00_AfwQ_v-Z1TsELzvSvkT_nr7ZCGDVgA3PSlyiwdyKWft-Eg&oe=69B48063"
    },
    {
        title: "Mobiliário Corporativo",
        category: "Produção",
        image: "https://scontent.fmpm1-1.fna.fbcdn.net/v/t39.30808-6/480856568_661237086477249_535425760345813568_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=sL8VoiXs9WMQ7kNvwHfF-nY&_nc_oc=AdkfVvVWqmN5DUWK8jf-GxxaNtDo5lMw5fReVTWasurg-Nsv3Fmfmv5JybRsaOQv7a4&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm1-1.fna&_nc_gid=pAHhEtlvX2mhIUYVMmbGKQ&_nc_ss=8&oh=00_AfxF-YnHbAleFBmwYg9tJ-mDKJwf_DG5Lzwc_6D6jx3Euw&oe=69B49E67"
    },
    {
        title: "Sinalética Premium",
        category: "Design",
        image: "https://scontent.fmpm5-1.fna.fbcdn.net/v/t39.30808-6/480804780_661223496478608_1118236541340582006_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=moNKUuG2k74Q7kNvwHSwACU&_nc_oc=AdlBIX2yDQTN4lRnoHZOh1i6dlSP9KHQaDg0IN7Iwn840FKWG3EphVI0q-nIfUbVKAo&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm5-1.fna&_nc_gid=6e1sKQp8_zHcDcCkWht34w&_nc_ss=8&oh=00_Afza32aAfXk8bytk9cpi32jUSKI25QoUc323jc2SfQniFg&oe=69B4887C"
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
