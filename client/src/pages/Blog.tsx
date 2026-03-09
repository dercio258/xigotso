import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const BlogPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/blog');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Função para remover tags HTML e limitar o texto
    const getSummary = (htmlContent: string) => {
        const text = htmlContent.replace(/<[^>]*>/g, '');
        return text.length > 120 ? text.substring(0, 120) + '...' : text;
    };

    if (loading) return <div className="section">Carregando artigos...</div>;

    return (
        <div className="blog-page section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="subtitle">Journal</span>
                <h1>Ideais & <span className="text-accent">Perspectivas</span></h1>
                <p>Acompanhe as últimas tendências em design, marketing e produção industrial.</p>
            </motion.div>

            {posts.length === 0 && <div className="no-posts">Nenhum artigo publicado ainda.</div>}

            <div className="blog-grid">
                {posts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        className="blog-card-clean"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link to={`/blog/${post.slug || post.id}`} className="blog-link-wrapper">
                            <div className="blog-img-minimal">
                                <img src={post.image || 'https://via.placeholder.com/800x450?text=XIGOTSO+Blog'} alt={post.title} />
                                <div className="blog-category-badge">{post.category}</div>
                            </div>
                            <div className="blog-content-minimal">
                                <div className="blog-date">
                                    <Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                                <h3>{post.title}</h3>
                                <p className="blog-excerpt">{getSummary(post.content)}</p>
                                <div className="blog-footer-minimal">
                                    <span className="read-more">Ler Artigo <ArrowRight size={16} /></span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
