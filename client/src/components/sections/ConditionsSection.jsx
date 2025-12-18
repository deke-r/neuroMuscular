import React from 'react';
import SectionHeader from '../common/SectionHeader';
import ConditionCard from '../cards/ConditionCard';
import styles from './ConditionsSection.module.css';

const ConditionsSection = ({ title, subtitle, conditions }) => {
    return (
        <section className={`${styles.conditionsSection} section-padding`}>
            <div className="container">
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    align="center"
                />
                <div className="row g-4">
                    {conditions && conditions.map((condition) => (
                        <div key={condition.id} className="col-lg-3 col-md-6">
                            <ConditionCard {...condition} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConditionsSection;
