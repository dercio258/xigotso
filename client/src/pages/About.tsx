import { motion } from 'framer-motion';
import { Target, Eye, Heart, ShieldCheck, Zap, Award } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="subtitle">Quem Somos</span>
                <h1>Excelência em cada <span className="text-accent">Detalhe</span></h1>
                <p>A XIGOTSO é uma agência criativa e produtora industrial que une design estratégico à execução técnica rigorosa.</p>
            </motion.div>

            <section className="about-intro">
                <div className="about-text-grid">
                    <motion.div
                        className="about-block"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3>Nossa História</h3>
                        <p>Nascida da paixão pela inovação visual e pela produção de qualidade, a XIGOTSO estabeleceu-se como um parceiro estratégico para marcas que não se contentam com o comum. Transformamos ideias em realidades tangíveis, desde identidades digitais a mobiliário industrial.</p>
                    </motion.div>
                    <motion.div
                        className="about-block"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3>O Nosso Método</h3>
                        <p>Acreditamos na integração total. O design não termina no ecrã; ele estende-se à matéria, à forma e à experiência do utilizador final. Cada projecto é um compromisso com a perfeição.</p>
                    </motion.div>
                </div>
            </section>

            <section className="mvv-section grid-3">
                <motion.div
                    className="mvv-card glass-clean"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="mvv-icon mission"><Target size={32} /></div>
                    <h2>Missão</h2>
                    <p>Fornecer soluções criativas e de produção de alto nível que potencializem a visibilidade e o valor das marcas dos nossos clientes.</p>
                </motion.div>

                <motion.div
                    className="mvv-card glass-clean"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="mvv-icon vision"><Eye size={32} /></div>
                    <h2>Visão</h2>
                    <p>Ser a referência líder em Moçambique na intersecção entre design criativo e produção industrial de excelência até 2030.</p>
                </motion.div>

                <motion.div
                    className="mvv-card glass-clean"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="mvv-icon values"><Heart size={32} /></div>
                    <h2>Valores</h2>
                    <ul className="values-list">
                        <li><Zap size={16} /> Rigor Técnico</li>
                        <li><ShieldCheck size={16} /> Integridade</li>
                        <li><Award size={16} /> Inovação Constante</li>
                    </ul>
                </motion.div>
            </section>
        </div>
    );
};

export default About;
