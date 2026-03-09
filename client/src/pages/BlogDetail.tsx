import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import './BlogDetail.css';

const BlogDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Tenta buscar por slug primeiro
                const response = await fetch(`http://localhost:3000/blog/slug/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                } else {
                    // Fallback para buscar por ID se o slug não existir (para posts antigos)
                    const resId = await fetch(`http://localhost:3000/blog/${slug}`);
                    if (resId.ok) {
                        const data = await resId.json();
                        setPost(data);
                    }
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return <div className="section">Carregando artigo...</div>;
    if (!post) return <div className="section">Artigo não encontrado.</div>;

    const gallery = post.gallery || [];

    return (
        <div className="blog-detail-page section">
            <div className="article-container">
                {/* Voltar */}
                <Link to="/blog" className="back-link">
                    <ArrowLeft size={16} /> Voltar ao Journal
                </Link>

                {/* Cabeçalho do Artigo */}
                <header className="article-header">
                    <motion.div
                        className="article-meta-top"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="category-tag"><Tag size={14} /> {post.category}</span>
                        <span className="date-tag"><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        className="article-author"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="author-avatar">
                            {post.authorImage ? (
                                <img src={post.authorImage} alt={post.authorName} className="avatar-img" />
                            ) : (
                                <span>{post.authorName ? post.authorName.substring(0, 2).toUpperCase() : 'XG'}</span>
                            )}
                        </div>
                        <div className="author-info">
                            <span>Escrito por</span>
                            <strong>{post.authorName || (post.author ? post.author.name : 'Equipa XIGOTSO')}</strong>
                        </div>
                    </motion.div>
                </header>

                {/* Imagem Principal */}
                <motion.div
                    className="article-hero"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <img src={post.image || 'https://via.placeholder.com/1200x600?text=XIGOTSO+Blog'} alt={post.title} />
                </motion.div>

                {/* Conteúdo Principal */}
                <div className="article-body">
                    <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                    {/* Galeria do Artigo */}
                    {gallery.length > 0 && (
                        <div className="article-gallery-section">
                            <h3>Galeria do Artigo</h3>
                            <div className="article-gallery-grid">
                                {gallery.map((img: string, idx: number) => (
                                    <div key={idx} className="gallery-item-blog">
                                        <img src={img} alt={`Gallery ${idx}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Rodapé do Artigo */}
                <footer className="article-footer-meta">
                    <div className="share-section">
                        <span>Partilhar este artigo:</span>
                        <div className="share-btns">
                            <button className="share-btn"><Share2 size={18} /></button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default BlogDetailPage;
