import React from 'react';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import PackageCard from '../components/cards/PackageCard';
import SectionHeader from '../components/common/SectionHeader';
import { packages } from '../data/packages.data';

const Packages = () => {
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Packages', path: '/packages' }
    ];

    const handlePackageSelect = (packageName) => {
        console.log(`Selected package: ${packageName}`);
        // In a real app, this would navigate to booking with pre-selected package
        window.location.href = '/book-appointment';
    };

    return (
        <>
            <PageHelmet
                title="Treatment Packages - PMR Hospital | Affordable Rehabilitation Plans"
                description="Choose from our comprehensive rehabilitation packages designed to meet your specific needs and budget. From basic to intensive care programs."
                keywords="rehabilitation packages, treatment plans, stroke recovery program, physiotherapy packages, affordable rehabilitation, comprehensive care packages"
                canonicalUrl="https://pmrhospital.com/packages"
            />

            <PageHeader
                title="Treatment Packages"
                subtitle="Comprehensive Rehabilitation Plans Designed for Your Recovery"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/services-hero.jpg"
            />

            <section className="section-padding">
                <div className="container">
                    <SectionHeader
                        subtitle="Choose Your Plan"
                        title="Flexible Packages to Suit Your Needs"
                        description="All packages include comprehensive assessments, personalized treatment plans, and progress evaluations."
                        align="center"
                    />
                    <div className="row g-4">
                        {packages.map((pkg) => (
                            <div key={pkg.id} className="col-lg-4 col-md-6">
                                <PackageCard
                                    {...pkg}
                                    onSelect={() => handlePackageSelect(pkg.name)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--color-light)' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div style={{
                                background: 'var(--color-white)',
                                padding: 'var(--spacing-2xl)',
                                borderRadius: 'var(--radius-xl)',
                                boxShadow: 'var(--shadow-lg)',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-lg)', color: 'var(--color-gray-800)' }}>
                                    Need a Custom Package?
                                </h3>
                                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-gray-600)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--spacing-xl)' }}>
                                    We understand that every patient's needs are unique. Contact us to discuss a customized treatment plan tailored specifically to your condition and goals.
                                </p>
                                <a
                                    href="/contact"
                                    className="btn btn-primary btn-lg"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Packages;
