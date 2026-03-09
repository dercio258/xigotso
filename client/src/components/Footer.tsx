import { Github, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="section footer-grid">
                <div className="footer-brand">
                    <img src="https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773057789/Gemini_Generated_Image_q6g5zgq6g5zgq6g5_kde2mp.png" alt="XIGOTSO Logo" className="footer-logo" />
                    <p className="footer-desc">
                        Xigotso Soluções & Serviços, Lda. Especialistas em identidade visual, marketing digital e soluções de design premium em Moçambique.
                    </p>
                    <div className="social-links">
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Serviços</h4>
                    <ul>
                        <li><a href="#">Marketing Digital</a></li>
                        <li><a href="#">Design Gráfico</a></li>
                        <li><a href="#">Carpintaria</a></li>
                        <li><a href="#">Cursos & Treinamentos</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Empresa</h4>
                    <ul>
                        <li><a href="#">Sobre Nós</a></li>
                        <li><a href="#">Portfólio</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Loja</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contacto</h4>
                    <div className="contact-item">
                        <MapPin size={18} />
                        <span>Rua Estacio Dias, nº 138, Maputo</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <span>(+258) 87 388 2380</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} />
                        <span>info@xigotso.co.mz</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} XIGOTSO. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
