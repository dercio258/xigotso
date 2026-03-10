import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Image as ImageIcon, Save, X } from 'lucide-react';
import './BlogManager.css';
import { useAuth } from '../../context/AuthContext';

const BlogManager = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<any>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/blog');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    };

    const handleEdit = (post: any) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentPost({ title: '', content: '', category: 'Marketing', image: '' });
        setIsEditing(true);
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

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/uploads', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentPost({ ...currentPost, [field]: data.url });
            } else {
                alert('Erro ao carregar imagem');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Erro de conexão ao carregar imagem');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const postToSave = { ...currentPost };
        if (!postToSave.slug || !postToSave.slug.trim()) {
            postToSave.slug = slugify(postToSave.title);
        }

        const method = postToSave.id ? 'PATCH' : 'POST';
        const url = postToSave.id
            ? `/api/blog/${postToSave.id}`
            : '/api/blog';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postToSave)
            });

            if (response.ok) {
                setIsEditing(false);
                fetchPosts();
            } else {
                const errorData = await response.json();
                alert(`Erro ao guardar post: ${errorData.message || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Erro de conexão ao guardar o post.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Deseja eliminar este post?')) return;
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="blog-manager">
            <div className="page-header">
                <h2>Gerir Blog</h2>
                <button className="btn btn-primary" onClick={handleCreate}>
                    <Plus size={18} /> Novo Post
                </button>
            </div>

            {!isEditing ? (
                <div className="blog-list-card glass">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Categoria</th>
                                <th>Data</th>
                                <th>Acções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                    <td><span className="badge">{post.category}</span></td>
                                    <td>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="icon-btn edit" onClick={() => handleEdit(post)}><Edit2 size={16} /></button>
                                            <button className="icon-btn delete" onClick={() => handleDelete(post.id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <motion.div
                    className="blog-editor glass"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="editor-header">
                        <h3>{currentPost?.id ? 'Editar Post' : 'Novo Post'}</h3>
                        <button className="icon-btn" onClick={() => setIsEditing(false)}><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSave} className="form-grid">
                        <div className="form-group">
                            <label>Título do Post</label>
                            <input
                                type="text"
                                value={currentPost?.title}
                                onChange={(e) => {
                                    const newTitle = e.target.value;
                                    setCurrentPost({
                                        ...currentPost,
                                        title: newTitle,
                                        slug: slugify(newTitle)
                                    });
                                }}
                                placeholder="Ex: Tendências de Design"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nome do Autor</label>
                            <input
                                type="text"
                                value={currentPost?.authorName}
                                onChange={(e) => setCurrentPost({ ...currentPost, authorName: e.target.value })}
                                placeholder="Ex: João Silva"
                            />
                        </div>
                        <div className="form-group">
                            <label>URL da Imagem do Autor</label>
                            <div className="media-input">
                                <input
                                    type="text"
                                    value={currentPost?.authorImage}
                                    onChange={(e) => setCurrentPost({ ...currentPost, authorImage: e.target.value })}
                                    placeholder="Ex: https://.../avatar.jpg"
                                />
                                <input
                                    type="file"
                                    id="author-img-upload"
                                    hidden
                                    onChange={(e) => handleUpload(e, 'authorImage')}
                                    accept="image/*"
                                />
                                <button type="button" className="btn-icon" onClick={() => document.getElementById('author-img-upload')?.click()}>
                                    <ImageIcon size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Categoria</label>
                            <select
                                value={currentPost?.category}
                                onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                            >
                                <option>Marketing</option>
                                <option>Design</option>
                                <option>Tutoriais</option>
                                <option>Branding</option>
                                <option>Carpintaria</option>
                            </select>
                        </div>
                        <div className="form-group full">
                            <label>Conteúdo do Artigo</label>
                            <Editor
                                tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.0.0/tinymce.min.js"
                                value={currentPost?.content}
                                onEditorChange={(content) => setCurrentPost({ ...currentPost, content })}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | image media link | help',
                                    content_style: 'body { font-family:Outfit,Helvetica,Arial,sans-serif; font-size:16px; color: #1a1a1a; line-height: 1.6; }',
                                }}
                            />
                        </div>
                        <div className="form-group full">
                            <label>URL da Imagem de Capa (Principal)</label>
                            <div className="media-input">
                                <input
                                    type="text"
                                    value={currentPost?.image}
                                    onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                                    placeholder="Ex: https://..."
                                />
                                <input
                                    type="file"
                                    id="cover-img-upload"
                                    hidden
                                    onChange={(e) => handleUpload(e, 'image')}
                                    accept="image/*"
                                />
                                <button type="button" className="btn-icon" onClick={() => document.getElementById('cover-img-upload')?.click()}>
                                    <ImageIcon size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Galeria do Artigo no Admin */}
                        <div className="form-group full gallery-admin-blog">
                            <label>Imagens Adicionais (Galeria do Artigo)</label>
                            <div className="media-input">
                                <input
                                    type="text"
                                    id="new-blog-img"
                                    placeholder="Adicionar novo URL de imagem..."
                                    onKeyPress={(e: any) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const url = e.target.value;
                                            if (url) {
                                                const currentGallery = currentPost.gallery || [];
                                                setCurrentPost({ ...currentPost, gallery: [...currentGallery, url] });
                                                e.target.value = '';
                                            }
                                        }
                                    }}
                                />
                                <input
                                    type="file"
                                    id="gallery-img-upload"
                                    hidden
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        try {
                                            const response = await fetch('/api/uploads', {
                                                method: 'POST',
                                                headers: { 'Authorization': `Bearer ${token}` },
                                                body: formData
                                            });
                                            if (response.ok) {
                                                const data = await response.json();
                                                const currentGallery = currentPost.gallery || [];
                                                setCurrentPost({ ...currentPost, gallery: [...currentGallery, data.url] });
                                            }
                                        } catch (error) { console.error(error); }
                                    }}
                                    accept="image/*"
                                />
                                <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('gallery-img-upload')?.click()}>
                                    <Plus size={18} /> Upload
                                </button>
                                <button type="button" className="btn btn-outline" onClick={() => {
                                    const input = document.getElementById('new-blog-img') as HTMLInputElement;
                                    const url = input.value;
                                    if (url) {
                                        const currentGallery = currentPost.gallery || [];
                                        setCurrentPost({ ...currentPost, gallery: [...currentGallery, url] });
                                        input.value = '';
                                    }
                                }}>Add Link</button>
                            </div>
                            <div className="blog-gallery-previews">
                                {(currentPost?.gallery || []).map((url: string, idx: number) => (
                                    <div key={idx} className="blog-preview-item">
                                        <img src={url} alt="Post item" />
                                        <button type="button" onClick={() => {
                                            const newGallery = currentPost.gallery.filter((_: any, i: number) => i !== idx);
                                            setCurrentPost({ ...currentPost, gallery: newGallery });
                                        }}><X size={12} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancelar</button>
                            <button type="submit" className="btn btn-primary">
                                <Save size={18} /> Guardar Alterações
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </div>
    );
};

export default BlogManager;
