import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Phone, Mail, MapPin, Info, Globe } from 'lucide-react';
import './SettingsManager.css';

const SettingsManager = () => {
    const [settings, setSettings] = useState([
        { key: 'site_name', label: 'Nome do Site', value: 'XIGOTSO Soluções & Serviços, Lda', icon: <Globe size={18} /> },
        { key: 'contact_phone', label: 'Telefone', value: '(+258) 87 388 2380', icon: <Phone size={18} /> },
        { key: 'contact_email', label: 'E-mail', value: 'info@xigotso.co.mz', icon: <Mail size={18} /> },
        { key: 'site_address', label: 'Endereço', value: 'Rua Estacio Dias, nº 138, Maputo', icon: <MapPin size={18} /> },
    ]);

    const [observations, setObservations] = useState("O site está focado em conversão e branding de luxo.");

    return (
        <div className="settings-manager">
            <div className="page-header">
                <h2>Configurações do Site</h2>
            </div>

            <div className="settings-grid">
                <motion.div
                    className="settings-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="card-header">
                        <h3>Informações de Contacto</h3>
                        <p>Estes dados serão reflectidos no Rodapé e Página de Contacto.</p>
                    </div>

                    <div className="settings-form">
                        {settings.map((s) => (
                            <div className="settings-input-group" key={s.key}>
                                <label>
                                    {s.icon} {s.label}
                                </label>
                                <input type="text" defaultValue={s.value} />
                            </div>
                        ))}

                        <button className="btn btn-primary">
                            <Save size={18} /> Actualizar Contactos
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="settings-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="card-header">
                        <h3>Observações do Administrador</h3>
                        <p>Notas internas sobre o estado actual do projecto.</p>
                    </div>

                    <div className="settings-form">
                        <div className="settings-input-group">
                            <label><Info size={18} /> Descrição/Notas</label>
                            <textarea
                                rows={8}
                                defaultValue={observations}
                                placeholder="Insira notas sobre o site..."
                            ></textarea>
                        </div>

                        <button className="btn btn-outline">
                            <Save size={18} /> Guardar Notas
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SettingsManager;
