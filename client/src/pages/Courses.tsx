import { motion } from 'framer-motion';
import { PlayCircle, Clock, Star, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Courses.css';
import { formatCurrency } from '../utils/formatters';

const CoursesPage = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:3000/courses');
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="section">Carregando academia...</div>;

    return (
        <div className="courses-page section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="subtitle">XIGOTSO Academy</span>
                <h1>Aprenda com quem <span className="text-accent">Faz</span></h1>
                <p>Cursos e treinamentos práticos para elevar suas habilidades profissionais.</p>
            </motion.div>

            <div className="courses-grid">
                {courses.length === 0 && <div className="no-products">Nenhum curso disponível no momento.</div>}
                {courses.map((course, i) => (
                    <motion.div
                        key={course.id}
                        className="course-card glass"
                        whileHover={{ y: -10 }}
                    >
                        <div className="course-img">
                            <img src={course.image || 'https://via.placeholder.com/400x250'} alt={course.title} />
                            <div className="play-overlay">
                                <PlayCircle size={48} />
                            </div>
                        </div>
                        <div className="course-info">
                            <div className="course-stats">
                                <span><Clock size={14} /> {course.duration}</span>
                                <span><Star size={14} className="text-accent" /> {course.rating}</span>
                            </div>
                            <h3>{course.title}</h3>
                            <p>{course.lessons} Lições prontas para assistir.</p>
                            <div className="course-footer">
                                <span className="price">{formatCurrency(course.price)}</span>
                                <button className="read-more">
                                    Inscrever-se <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
