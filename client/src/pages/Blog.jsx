import React from 'react';
import { FaCalendar, FaUser, FaClock } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import SectionHeader from '../components/common/SectionHeader';

const Blog = () => {
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Blog', path: '/blog' }
    ];

    const blogPosts = [
        {
            id: 1,
            title: '10 Essential Exercises for Stroke Recovery',
            excerpt: 'Learn about the most effective exercises that can help stroke survivors regain strength and mobility during their rehabilitation journey.',
            author: 'Dr. Rajesh Kumar',
            date: 'December 15, 2024',
            readTime: '5 min read',
            category: 'Stroke Recovery',
            image: 'https://via.placeholder.com/400x250/0C4379/FFFFFF?text=Stroke+Recovery'
        },
        {
            id: 2,
            title: 'Understanding Spinal Cord Injury Rehabilitation',
            excerpt: 'A comprehensive guide to spinal cord injury rehabilitation, including treatment approaches, expected outcomes, and tips for caregivers.',
            author: 'Dr. Priya Sharma',
            date: 'December 10, 2024',
            readTime: '7 min read',
            category: 'Spinal Injury',
            image: 'https://via.placeholder.com/400x250/0C4379/FFFFFF?text=Spinal+Injury'
        },
        {
            id: 3,
            title: 'The Role of Occupational Therapy in Daily Living',
            excerpt: 'Discover how occupational therapy helps patients regain independence in daily activities and improve their quality of life.',
            author: 'Dr. Sneha Patel',
            date: 'December 5, 2024',
            readTime: '4 min read',
            category: 'Occupational Therapy',
            image: 'https://via.placeholder.com/400x250/0C4379/FFFFFF?text=Occupational+Therapy'
        },
        {
            id: 4,
            title: 'Speech Therapy: Helping Patients Find Their Voice',
            excerpt: 'Explore the various speech therapy techniques used to help patients overcome communication and swallowing difficulties.',
            author: 'Dr. Vikram Singh',
            date: 'November 28, 2024',
            readTime: '6 min read',
            category: 'Speech Therapy',
            image: 'https://via.placeholder.com/400x250/0C4379/FFFFFF?text=Speech+Therapy'
        },
        {
            id: 5,
            title: 'Pediatric Rehabilitation: Early Intervention Matters',
            excerpt: 'Learn why early intervention is crucial for children with developmental delays and how our pediatric team can help.',
            author: 'Dr. Meera Reddy',
            date: 'November 20, 2024',
            readTime: '5 min read',
            category: 'Pediatric Care',
            image: 'https://via.placeholder.com/400x250/0C4379/FFFFFF?text=Pediatric+Care'
        },
        {
            id: 6,
            title: 'Sports Injury Prevention and Recovery Tips',
            excerpt: 'Essential tips for athletes on preventing sports injuries and optimizing recovery through proper rehabilitation.',
            author: 'Dr. Amit Verma',
            date: 'November 15, 2024',
            readTime: '4 min read',
            category: 'Sports Medicine',
            image: 'https://via.placeholder.com/400x250/0C4379/FFFFFF?text=Sports+Medicine'
        }
    ];

    return (
        <>
            <PageHelmet
                title="Blog - PMR Hospital | Rehabilitation Tips & Health Articles"
                description="Read our latest articles on stroke recovery, spinal injury rehabilitation, therapy techniques, and expert health tips from our medical team."
                keywords="rehabilitation blog, stroke recovery tips, spinal injury articles, therapy techniques, health articles, medical blog"
                canonicalUrl="https://pmrhospital.com/blog"
            />

            <PageHeader
                title="Our Blog"
                subtitle="Expert Insights, Tips, and Stories from Our Medical Team"
                breadcrumbs={breadcrumbs}
            />

            <section className="section-padding">
                <div className="container">
                    <SectionHeader
                        subtitle="Latest Articles"
                        title="Stay Informed About Rehabilitation"
                        description="Read our latest articles on rehabilitation techniques, patient success stories, and health tips."
                        align="center"
                    />
                    <div className="row g-4">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="col-lg-4 col-md-6">
                                <article style={{
                                    background: 'var(--color-white)',
                                    borderRadius: 'var(--radius-xl)',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-md)',
                                    transition: 'all var(--transition-base)',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid var(--color-gray-200)',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-2xl)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    }}>
                                    <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            top: 'var(--spacing-md)',
                                            left: 'var(--spacing-md)',
                                            background: 'var(--color-primary)',
                                            color: 'var(--color-white)',
                                            padding: 'var(--spacing-xs) var(--spacing-md)',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: 'var(--font-size-xs)',
                                            fontWeight: 'var(--font-weight-semibold)'
                                        }}>
                                            {post.category}
                                        </span>
                                    </div>
                                    <div style={{ padding: 'var(--spacing-xl)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-gray-800)' }}>
                                            {post.title}
                                        </h3>
                                        <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-gray-600)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--spacing-lg)', flex: 1 }}>
                                            {post.excerpt}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)', fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-gray-200)' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                                                <FaUser /> {post.author}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                                                <FaCalendar /> {post.date}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                                                <FaClock /> {post.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
