import { motion } from 'framer-motion';
import './Partners.css';

const partners = [
    { name: 'Expresso Diário', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062340/expresso-diario_qspffq.png' },
    { name: 'Emme', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062341/emme_rqfchm.png' },
    { name: 'Partner 3', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062341/images_1_bsan6g.png' },
    { name: 'Engeco', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062341/engeco_ua3tv0.png' },
    { name: 'Partner 5', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/images_u6ggua.png' },
    { name: 'Partner 6', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/378-x-349_vvhwsp.jpg' },
    { name: 'Camaf', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/camaf_x2gfvz.png' },
    { name: 'Cavest', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062340/cavest_hbuxkq.png' },
    { name: 'Eloi', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062340/eloi_icuqqp.png' },
    { name: 'B8M', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/b8m_thdh8c.png' },
    { name: 'True North Lda', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062339/true_north_lda_logo_anxer7.jpg' },
    { name: 'Associação', logo: 'https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773062340/associacao_fbkyza.png' },
];

const PartnersPage = () => {
    return (
        <div className="partners-page section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="subtitle">Nossas Colaborações</span>
                <h1>Clientes & <span className="text-accent">Parceiros</span></h1>
                <p>Instituições e empresas que confiam na XIGOTSO para elevar a sua marca.</p>
            </motion.div>

            <div className="partners-grid-full">
                {partners.map((partner, i) => (
                    <motion.div
                        key={i}
                        className="partner-card glass"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -10, borderColor: 'var(--accent)' }}
                    >
                        <div className="partner-logo-container">
                            <img src={partner.logo} alt={partner.name} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PartnersPage;
