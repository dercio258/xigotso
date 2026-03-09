import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const menuItems = [
        { path: '/admin/stats', label: 'Estatísticas', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/blog', label: 'Gestão de Blog', icon: <FileText size={20} /> },
        { path: '/admin/products', label: 'Gestão de Produtos', icon: <Package size={20} /> },
        { path: '/admin/servicos', label: 'Gestão de Serviços', icon: <Settings size={20} /> },
        { path: '/admin/settings', label: 'Configurações', icon: <Settings size={20} /> },
    ];

    return (
        <div className="admin-layout">
            <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    {!isCollapsed && <h2>XIGOTSO ADMIN</h2>}
                    <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        >
                            {item.icon}
                            {!isCollapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <NavLink to="/" className="sidebar-link logout">
                        <LogOut size={20} />
                        {!isCollapsed && <span>Sair</span>}
                    </NavLink>
                </div>
            </aside>

            <main className="admin-content">
                <header className="admin-topbar glass">
                    <div className="topbar-info">
                        <h1>Painel de Controlo</h1>
                        <p>Bem-vindo ao sistema de gestão XIGOTSO.</p>
                    </div>
                    <div className="admin-user">
                        <div className="avatar">AD</div>
                        <span>Administrador</span>
                    </div>
                </header>

                <div className="admin-page-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
