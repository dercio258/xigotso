import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, MousePointer2, TrendingUp } from 'lucide-react';
import './AdminDashboard.css';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState([
        { label: 'Total Visitantes', value: '...', icon: <Users />, color: '#d4af37' },
        { label: 'Visualizações de Página', value: '...', icon: <Eye />, color: '#3498db' },
        { label: 'Taxa de Cliques', value: '...', icon: <MousePointer2 />, color: '#2ecc71' },
        { label: 'Crescimento', value: '...', icon: <TrendingUp />, color: '#9b59b6' },
    ]);

    const [pageVisits, setPageVisits] = useState<any[]>([]);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [summaryRes, viewsRes, activityRes] = await Promise.all([
                fetch('http://localhost:3000/analytics/summary', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('http://localhost:3000/analytics/page-views', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('http://localhost:3000/analytics/recent-activity', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            const summary = await summaryRes.json();
            const views = await viewsRes.json();
            const activity = await activityRes.json();

            setStats([
                { label: 'Total Visitantes Únicos', value: summary.uniqueVisitors.toLocaleString(), icon: <Users />, color: '#d4af37' },
                { label: 'Total Visualizações', value: summary.totalVisits.toLocaleString(), icon: <Eye />, color: '#3498db' },
                { label: 'Taxa de Cliques (Estat.)', value: summary.clickRate || '0%', icon: <MousePointer2 />, color: '#2ecc71' },
                { label: 'Crescimento Estimado', value: summary.growth || '0%', icon: <TrendingUp />, color: '#9b59b6' },
            ]);

            setPageVisits(views);
            setActivities(activity);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        className="stat-card glass"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="stat-icon" style={{ color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">{stat.label}</span>
                            <h2 className="stat-value">{stat.value}</h2>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="dashboard-charts-grid">
                <motion.div
                    className="chart-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3>Visitantes por Página</h3>
                    <div className="custom-table-container">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>URL da Página</th>
                                    <th>Visualizações Totais</th>
                                    <th>Visitantes Únicos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageVisits.map((visit, i) => (
                                    <tr key={i}>
                                        <td>{visit.page}</td>
                                        <td>{visit.views}</td>
                                        <td>{visit.unique}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <motion.div
                    className="chart-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3>Actividade Recente</h3>
                    <div className="activity-list">
                        {activities.length > 0 ? activities.map((act, i) => (
                            <div key={i} className="activity-item">
                                <div className={`activity-dot ${act.type === 'visit' ? 'blue' : 'gold'}`}></div>
                                <div className="activity-text">
                                    <p>{act.text}</p>
                                    <span>{new Date(act.time).toLocaleString()}</span>
                                </div>
                            </div>
                        )) : (
                            <p className="no-data">Nenhuma actividade recente para mostrar.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
