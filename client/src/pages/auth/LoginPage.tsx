import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/auth/login/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, pass: password })
            });

            const data = await response.json();

            if (response.ok) {
                login(data.access_token, data.user);
                navigate('/admin');
            } else {
                setError(data.message || 'Credenciais inválidas');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <motion.div
                className="login-card glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="login-header">
                    <div className="logo-icon">
                        <ShieldCheck size={40} />
                    </div>
                    <h1>Acesso <span className="text-accent">Restrito</span></h1>
                    <p>Entre com as suas credenciais de administrador</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-msg">{error}</motion.div>}

                    <div className="form-group">
                        <label>Email Corporativo</label>
                        <div className="input-with-icon">
                            <Mail size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nome@xigotso.co.mz"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Palavra-passe</label>
                        <div className="input-with-icon">
                            <Lock size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                        {loading ? 'A autenticar...' : 'Entrar no Dashboard'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="login-footer">
                    <p>© 2026 XIGOTSO. Protegido por X-Security.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
