import { motion } from 'framer-motion';
import { Lock, User, LogIn, UserPlus } from 'lucide-react';
import './MemberArea.css';

const MemberArea = () => {
    return (
        <div className="member-area-page section">
            <div className="auth-container glass">
                <motion.div
                    className="auth-header"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="lock-icon">
                        <Lock size={32} />
                    </div>
                    <h1>Área de <span className="text-accent">Membros</span></h1>
                    <p>Aceda aos seus cursos, produtos digitais e suporte exclusivo.</p>
                </motion.div>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label><User size={18} /> Email ou Nome de Utilizador</label>
                        <input type="text" placeholder="exemplo@xigotso.co.mz" className="glass" />
                    </div>
                    <div className="input-group">
                        <label><Lock size={18} /> Palavra-passe</label>
                        <input type="password" placeholder="••••••••" className="glass" />
                    </div>

                    <div className="auth-actions">
                        <button className="btn btn-primary w-full">
                            <LogIn size={20} /> Entrar
                        </button>
                        <button className="btn btn-outline w-full">
                            <UserPlus size={20} /> Criar Conta
                        </button>
                    </div>

                    <a href="#" className="forgot-pass">Esqueceu a palavra-passe?</a>
                </form>
            </div>
        </div>
    );
};

export default MemberArea;
