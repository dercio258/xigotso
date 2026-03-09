import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Palette, Layout, Video, Image as ImageIcon } from 'lucide-react';
import './ServiceManager.css';
import { useAuth } from '../../context/AuthContext';

interface Service {
    id?: number;
    title: string;
    description: string;
    category: string;
    icon: string;
    features: string[];
    gallery: string[];
    slug: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
    'Palette': <Palette size={20} />,
    'Layout': <Layout size={20} />,
    'Video': <Video size={20} />,
    'ImageIcon': <ImageIcon size={20} />
};

const categories = ["Marketing & Design", "Produção & Carpintaria", "Outros"];

const ServiceManager = () => {
    const { token } = useAuth();
    const [services, setServices] = useState<Service[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState<Service>({
        title: '',
        description: '',
        category: categories[0],
        icon: 'Palette',
        features: [],
        gallery: [],
        slug: ''
    });
    const [newFeature, setNewFeature] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:3000/services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    };

    const handleSave = async () => {
        const serviceToSave = { ...currentService };
        if (!serviceToSave.slug.trim()) {
            serviceToSave.slug = slugify(serviceToSave.title);
        }

        const method = serviceToSave.id ? 'PATCH' : 'POST';
        const url = serviceToSave.id
            ? `http://localhost:3000/services/${serviceToSave.id}`
            : 'http://localhost:3000/services';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(serviceToSave)
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro ao guardar: ${errorData.message || 'Erro desconhecido'}`);
                return;
            }

            setIsEditing(false);
            setCurrentService({ title: '', description: '', category: categories[0], icon: 'Palette', features: [], gallery: [], slug: '' });
            fetchServices();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Erro de conexão ao guardar o serviço.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem a certeza que deseja remover este serviço?')) return;
        try {
            await fetch(`http://localhost:3000/services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setCurrentService({
                ...currentService,
                features: [...currentService.features, newFeature.trim()]
            });
            setNewFeature('');
        }
    };

    const removeFeature = (index: number) => {
        setCurrentService({
            ...currentService,
            features: currentService.features.filter((_, i) => i !== index)
        });
    };

    const addGalleryImage = () => {
        if (newImageUrl.trim()) {
            setCurrentService({
                ...currentService,
                gallery: [...(currentService.gallery || []), newImageUrl.trim()]
            });
            setNewImageUrl('');
        }
    };

    const removeGalleryImage = (index: number) => {
        setCurrentService({
            ...currentService,
            gallery: currentService.gallery.filter((_, i) => i !== index)
        });
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/uploads', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                if (field === 'gallery') {
                    setCurrentService({
                        ...currentService,
                        gallery: [...(currentService.gallery || []), data.url]
                    });
                } else {
                    setCurrentService({ ...currentService, [field]: data.url });
                }
            } else {
                alert('Erro ao carregar imagem');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Erro de conexão ao carregar imagem');
        }
    };

    return (
        <div className="admin-container service-manager">
            {!isEditing ? (
                <>
                    <div className="admin-header">
                        <h1>Gestão de Serviços</h1>
                        <button className="btn btn-primary" onClick={() => { setIsEditing(true); setCurrentService({ title: '', description: '', category: categories[0], icon: 'Palette', features: [], gallery: [], slug: '' }); }}>
                            <Plus size={20} /> Novo Serviço
                        </button>
                    </div>

                    <div className="services-list">
                        {services.map(service => (
                            <div key={service.id} className="service-card">
                                <div className="card-icon">{iconMap[service.icon] || <Palette size={20} />}</div>
                                <div className="card-info">
                                    <h3>{service.title}</h3>
                                    <span className="category-label">{service.category}</span>
                                    <span className="slug-badge">{service.slug}</span>
                                </div>
                                <div className="card-actions">
                                    <button className="btn-icon" onClick={() => { setCurrentService(service); setIsEditing(true); }}>
                                        <Edit2 size={18} />
                                    </button>
                                    <button className="btn-icon delete" onClick={() => handleDelete(service.id!)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="service-editor">
                    <div className="editor-header">
                        <h2>{currentService.id ? 'Editar Serviço' : 'Novo Serviço'}</h2>
                        <button className="btn-close" onClick={() => setIsEditing(false)}><X size={24} /></button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Título</label>
                            <input
                                type="text"
                                value={currentService.title}
                                onChange={e => {
                                    const newTitle = e.target.value;
                                    setCurrentService({
                                        ...currentService,
                                        title: newTitle,
                                        slug: slugify(newTitle)
                                    });
                                }}
                                placeholder="Nome do serviço"
                            />
                        </div>
                        <div className="form-group">
                            <label>Categoria</label>
                            <select
                                value={currentService.category}
                                onChange={e => setCurrentService({ ...currentService, category: e.target.value })}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ícone Representativo</label>
                            <select
                                value={currentService.icon}
                                onChange={e => setCurrentService({ ...currentService, icon: e.target.value })}
                            >
                                <option value="Palette">Design & Artes</option>
                                <option value="Layout">Web & Apps</option>
                                <option value="Video">Vídeo & Motion</option>
                                <option value="ImageIcon">Fotografia</option>
                            </select>
                        </div>
                        <div className="form-group full">
                            <label>Descrição Detalhada</label>
                            <textarea
                                value={currentService.description}
                                onChange={e => setCurrentService({ ...currentService, description: e.target.value })}
                                placeholder="Descreva o que este serviço oferece..."
                                rows={6}
                            />
                        </div>

                        <div className="form-group full">
                            <label>Principais Entregáveis / Funcionalidades</label>
                            <div className="feature-input-group">
                                <input
                                    type="text"
                                    value={newFeature}
                                    placeholder="Ex: Entrega em 24h"
                                    onChange={e => setNewFeature(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && addFeature()}
                                />
                                <button className="btn btn-secondary" onClick={addFeature}>Add</button>
                            </div>
                            <ul className="feature-tags">
                                {currentService.features.map((f, i) => (
                                    <li key={i}>{f} <X size={14} onClick={() => removeFeature(i)} /></li>
                                ))}
                            </ul>
                        </div>

                        <div className="form-group full gallery-section-admin">
                            <label>Media & Portfólio (Imagens)</label>
                            <p className="field-hint">A primeira imagem será o destaque na Home Page.</p>

                            <div className="media-input-wrapper">
                                <div className="feature-input-group">
                                    <input
                                        type="text"
                                        value={newImageUrl}
                                        onChange={e => setNewImageUrl(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && addGalleryImage()}
                                        placeholder="Cole o URL da imagem (Dropbox, Drive, Cloudinary...)"
                                    />
                                    <input
                                        type="file"
                                        id="service-gallery-upload"
                                        hidden
                                        onChange={(e) => handleUpload(e, 'gallery')}
                                        accept="image/*"
                                    />
                                    <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('service-gallery-upload')?.click()}>
                                        <Plus size={18} /> Upload
                                    </button>
                                    <button className="btn btn-outline" onClick={addGalleryImage}>
                                        Adicionar Link
                                    </button>
                                </div>
                            </div>

                            <div className="gallery-grid-admin">
                                {(currentService.gallery || []).map((url, i) => (
                                    <div key={i} className={`gallery-item-admin ${i === 0 ? 'is-featured' : ''}`}>
                                        <div className="image-container">
                                            <img src={url} alt={`Gallery ${i}`} />
                                            {i === 0 && <span className="featured-badge">Destaque</span>}
                                            <div className="item-overlay">
                                                <button className="btn-remove-img" onClick={() => removeGalleryImage(i)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!currentService.gallery || currentService.gallery.length === 0) && (
                                    <div className="gallery-empty-state">
                                        <ImageIcon size={48} />
                                        <p>Nenhuma imagem no portfólio deste serviço.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="editor-footer">
                        <button className="btn btn-outline" onClick={() => setIsEditing(false)}>Descartar</button>
                        <button className="btn btn-primary" onClick={handleSave}><Save size={20} /> Guardar Alterações</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceManager;
