import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import './Contact.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateFormalMessage = () => {
        return `Prezada Equipa XIGOTSO,

Gostaria de manifestar o meu interesse em contactar a vossa agência sobre: "${formData.subject || 'Informações Gerais'}".

Seguem os meus dados de contacto:
Nome: ${formData.name}
Email: ${formData.email}

Mensagem:
${formData.message}

Atenciosamente,
${formData.name}`;
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            alert('Por favor, preencha pelo menos o seu nome e email.');
            return;
        }
        const text = encodeURIComponent(generateFormalMessage());
        window.open(`https://wa.me/258840000000?text=${text}`, '_blank');
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally call your backend API
        console.log('Enviando via Email:', formData);
        alert('Pedido enviado por email com sucesso! Respondê-lo-emos em breve.');
    };

    return (
        <div className="contact-page section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <span className="subtitle">Contacto</span>
                <h1>Vamos criar algo <span className="text-accent">Especial</span></h1>
                <p>A XIGOTSO está pronta para transformar os seus desafios em sucessos visíveis.</p>
            </motion.div>

            <div className="contact-container">
                <motion.div
                    className="contact-info-grid"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="info-card-minimal">
                        <div className="info-icon"><Phone /></div>
                        <div className="info-text">
                            <h4>Ligue-nos</h4>
                            <p>+258 84 000 0000</p>
                        </div>
                    </div>
                    <div className="info-card-minimal">
                        <div className="info-icon"><Mail /></div>
                        <div className="info-text">
                            <h4>Email</h4>
                            <p>info@xigotso.co.mz</p>
                        </div>
                    </div>
                    <div className="info-card-minimal">
                        <div className="info-icon"><MapPin /></div>
                        <div className="info-text">
                            <h4>Localização</h4>
                            <p>Maputo, Moçambique</p>
                        </div>
                    </div>
                    <div className="info-card-minimal">
                        <div className="info-icon"><Clock /></div>
                        <div className="info-text">
                            <h4>Horário</h4>
                            <p>Seg - Sex: 08:30 - 17:30</p>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    className="contact-form-minimal glass-clean"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Nome Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Seu nome"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Email Corporativo</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Assunto</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Ex: Branding Industrial"
                        />
                    </div>
                    <div className="input-group">
                        <label>Mensagem</label>
                        <textarea
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Conte-nos sobre o seu projecto..."
                        ></textarea>
                    </div>

                    <div className="form-action-group">
                        <button type="button" onClick={handleEmailSubmit} className="btn btn-primary">
                            Enviar via Email <Send size={18} />
                        </button>
                        <button type="button" onClick={handleWhatsAppSubmit} className="btn btn-whatsapp">
                            Solicitar via WhatsApp <MessageCircle size={18} />
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default ContactPage;
