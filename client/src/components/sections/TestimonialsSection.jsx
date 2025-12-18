import React, { useState } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import styles from '../../styles/sections/TestimonialsSection.module.css';

const TestimonialsSection = ({ title, subtitle, testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (!testimonials || testimonials.length === 0) return null;

    const current = testimonials[currentIndex];

    return (
        <section className={`${styles.testimonialsSection} section-padding`}>
            <div className="container">
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    align="center"
                />
                <div className={styles.testimonialWrapper}>
                    <button
                        className={`${styles.navButton} ${styles.prevButton}`}
                        onClick={prevTestimonial}
                        aria-label="Previous testimonial"
                    >
                        <FaChevronLeft />
                    </button>

                    <div className={styles.testimonialCard}>
                        <FaQuoteLeft className={styles.quoteIcon} />
                        <div className={styles.rating}>
                            {[...Array(current.rating)].map((_, index) => (
                                <FaStar key={index} className={styles.star} />
                            ))}
                        </div>
                        <p className={styles.text}>{current.text}</p>
                        <div className={styles.author}>
                            <div className={styles.authorInfo}>
                                <h4 className={styles.name}>{current.name}</h4>
                                <p className={styles.condition}>{current.condition}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={nextTestimonial}
                        aria-label="Next testimonial"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                <div className={styles.indicators}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
