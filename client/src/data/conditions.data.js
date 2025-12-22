import { FaBrain, FaHeartbeat, FaBone, FaLungs, FaUserInjured, FaWheelchair } from 'react-icons/fa';

export const conditions = [
    {
        id: 1,
        title: 'Stroke',
        slug: 'stroke',
        description: 'Comprehensive rehabilitation for stroke survivors to regain independence and quality of life.',
        image: '/img/conditions/stroke.jpg',
        icon: FaBrain,
        overview: 'A stroke occurs when blood flow to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Our comprehensive stroke rehabilitation program focuses on helping survivors regain lost abilities and relearn skills needed for daily living. We use evidence-based therapies and cutting-edge techniques to maximize recovery potential and improve quality of life.',
        symptoms: [
            'Weakness or paralysis on one side of the body',
            'Speech and language difficulties',
            'Balance and coordination problems',
            'Cognitive impairment and memory issues',
            'Vision problems',
            'Difficulty swallowing'
        ],
        treatments: [
            'Physical therapy for mobility and strength',
            'Speech and language therapy',
            'Occupational therapy for daily activities',
            'Cognitive rehabilitation',
            'Gait and balance training',
            'Constraint-induced movement therapy'
        ],
        causes: [
            'High blood pressure',
            'Smoking and tobacco use',
            'Diabetes',
            'High cholesterol',
            'Obesity',
            'Heart disease',
            'Age (risk increases with age)',
            'Family history of stroke'
        ],
        recovery: 'Stroke recovery is most rapid in the first 3-6 months, though improvement can continue for years with consistent therapy. Our personalized rehabilitation programs are designed to maximize recovery at every stage, helping patients regain independence and return to meaningful activities.'
    },
    {
        id: 2,
        title: 'Spinal Cord Injury',
        slug: 'spinal-cord-injury',
        description: 'Specialized care for spinal cord injuries focusing on maximizing function and independence.',
        image: '/img/conditions/spinal-cord.jpg',
        icon: FaBone,
        overview: 'Spinal cord injuries can have life-changing effects on mobility, sensation, and bodily functions. Our specialized rehabilitation program provides comprehensive care to help individuals with spinal cord injuries maximize their functional abilities, adapt to new challenges, and achieve the highest possible level of independence in their daily lives.',
        symptoms: [
            'Loss of movement and muscle function',
            'Loss of sensation (touch, heat, cold)',
            'Bowel and bladder dysfunction',
            'Respiratory difficulties',
            'Muscle spasticity and spasms',
            'Pain or intense stinging sensations',
            'Changes in sexual function'
        ],
        treatments: [
            'Mobility and wheelchair training',
            'Strengthening and conditioning exercises',
            'Adaptive equipment training',
            'Respiratory therapy and breathing exercises',
            'Functional electrical stimulation',
            'Bowel and bladder management',
            'Activities of daily living training'
        ],
        causes: [
            'Motor vehicle accidents',
            'Falls (especially in older adults)',
            'Sports and recreational injuries',
            'Violence (gunshot wounds, assault)',
            'Diseases (cancer, arthritis, osteoporosis)',
            'Alcohol use'
        ],
        recovery: 'Recovery from spinal cord injury varies greatly depending on the level and completeness of injury. While some recovery may occur in the first 6-12 months, ongoing rehabilitation can lead to continued improvements in function and quality of life for years after injury.'
    },
    {
        id: 3,
        title: 'Traumatic Brain Injury',
        slug: 'traumatic-brain-injury',
        description: 'Expert rehabilitation for traumatic brain injury patients to restore cognitive and physical abilities.',
        image: '/img/conditions/tbi.jpg',
        icon: FaUserInjured,
        overview: 'Traumatic Brain Injury (TBI) can result from a blow, jolt, or penetrating injury to the head that disrupts normal brain function. Our multidisciplinary rehabilitation program addresses the complex physical, cognitive, and emotional challenges that can arise from TBI, helping individuals regain skills and adapt to changes while maximizing their recovery potential.',
        symptoms: [
            'Memory problems and confusion',
            'Difficulty concentrating and processing information',
            'Persistent headaches',
            'Balance and coordination issues',
            'Emotional and behavioral changes',
            'Fatigue and sleep disturbances',
            'Sensitivity to light and sound'
        ],
        treatments: [
            'Cognitive therapy and rehabilitation',
            'Physical rehabilitation for motor skills',
            'Speech and language therapy',
            'Behavioral and psychological therapy',
            'Vestibular rehabilitation for balance',
            'Visual therapy',
            'Compensatory strategy training'
        ],
        causes: [
            'Falls (most common cause)',
            'Motor vehicle accidents',
            'Sports injuries',
            'Violence and assault',
            'Combat injuries',
            'Blast injuries'
        ],
        recovery: 'TBI recovery is highly individual and can continue for months to years. The most rapid recovery typically occurs in the first 6 months, but many individuals continue to see improvements with ongoing therapy and support. Our team works with patients at every stage of recovery.'
    },
    {
        id: 4,
        title: "Parkinson's Disease",
        slug: 'parkinsons-disease',
        description: "Comprehensive management of Parkinson's disease symptoms to maintain quality of life.",
        image: '/img/conditions/parkinsons.jpg',
        icon: FaHeartbeat,
        overview: "Parkinson's disease is a progressive neurological disorder that affects movement. Our specialized rehabilitation program focuses on maintaining mobility, improving balance, enhancing speech and voice quality, and helping individuals maintain independence in daily activities. We use evidence-based therapies including LSVT BIG and LOUD to address the unique challenges of Parkinson's disease.",
        symptoms: [
            'Tremors (especially at rest)',
            'Muscle rigidity and stiffness',
            'Slow movement (bradykinesia)',
            'Balance problems and falls',
            'Speech changes (soft voice, monotone)',
            'Writing changes (small handwriting)',
            'Difficulty with facial expressions'
        ],
        treatments: [
            'LSVT BIG therapy for movement',
            'LSVT LOUD therapy for speech',
            'Gait and balance training',
            'Strengthening and flexibility exercises',
            'Functional training for daily activities',
            'Fall prevention strategies',
            'Voice and speech therapy'
        ],
        causes: [
            'Age (primary risk factor)',
            'Genetics and family history',
            'Gender (more common in men)',
            'Environmental toxin exposure',
            'Head trauma',
            'Unknown factors (in most cases)'
        ],
        recovery: "While Parkinson's disease is progressive, rehabilitation can significantly improve quality of life and help maintain function. Regular therapy can slow the progression of symptoms, improve mobility and balance, and help individuals stay active and independent longer."
    },
    {
        id: 5,
        title: 'Multiple Sclerosis',
        slug: 'multiple-sclerosis',
        description: 'Tailored rehabilitation programs for managing multiple sclerosis symptoms and maintaining function.',
        image: '/img/conditions/ms.jpg',
        icon: FaBrain,
        overview: 'Multiple Sclerosis (MS) is an autoimmune disease affecting the central nervous system. Our comprehensive rehabilitation program is designed to manage symptoms, maintain function, and improve quality of life for individuals with MS. We provide personalized therapy that adapts to the changing nature of the disease and helps patients maintain their independence.',
        symptoms: [
            'Fatigue (one of the most common symptoms)',
            'Muscle weakness and spasticity',
            'Coordination and balance problems',
            'Vision issues (blurred or double vision)',
            'Cognitive changes and memory problems',
            'Numbness and tingling',
            'Heat sensitivity'
        ],
        treatments: [
            'Energy conservation techniques',
            'Strengthening and conditioning programs',
            'Balance and coordination training',
            'Cognitive rehabilitation strategies',
            'Adaptive techniques and equipment',
            'Heat management strategies',
            'Functional mobility training'
        ],
        causes: [
            'Autoimmune response (body attacks myelin)',
            'Genetic predisposition',
            'Environmental factors',
            'Vitamin D deficiency',
            'Smoking',
            'Certain viral infections',
            'Gender (more common in women)'
        ],
        recovery: 'MS is a chronic condition with variable progression. Rehabilitation focuses on managing symptoms during flare-ups, maintaining function during remission periods, and adapting to changes. Regular therapy can help preserve abilities and quality of life throughout the disease course.'
    },
    {
        id: 6,
        title: 'Cerebral Palsy',
        slug: 'cerebral-palsy',
        description: 'Specialized pediatric rehabilitation for children with cerebral palsy to maximize their potential.',
        image: '/img/conditions/cerebral-palsy.jpg',
        icon: FaWheelchair,
        overview: 'Cerebral Palsy (CP) is a group of disorders affecting movement, posture, and muscle tone. Our pediatric rehabilitation program provides comprehensive, family-centered care to help children with CP reach their maximum potential. We focus on improving motor skills, enhancing independence, and supporting developmental milestones through evidence-based therapies.',
        symptoms: [
            'Muscle stiffness or floppiness',
            'Movement and coordination difficulties',
            'Delayed developmental milestones',
            'Speech and communication difficulties',
            'Difficulty with fine motor skills',
            'Balance and walking problems',
            'Involuntary movements'
        ],
        treatments: [
            'Physical therapy for motor development',
            'Occupational therapy for daily skills',
            'Speech and language therapy',
            'Orthotic management and bracing',
            'Functional training and play-based therapy',
            'Constraint-induced movement therapy',
            'Family education and support'
        ],
        causes: [
            'Brain damage before or during birth',
            'Lack of oxygen during birth',
            'Premature birth',
            'Infections during pregnancy',
            'Genetic factors',
            'Traumatic head injury in early childhood'
        ],
        recovery: 'While CP is a permanent condition, early intervention and consistent therapy can lead to significant improvements in function and independence. Children can continue to develop new skills and abilities throughout childhood and into adulthood with appropriate support and therapy.'
    },
    {
        id: 7,
        title: 'Orthopedic Conditions',
        slug: 'orthopedic-conditions',
        description: 'Rehabilitation for orthopedic injuries and post-surgical recovery to restore full function.',
        image: '/img/conditions/orthopedic.jpg',
        icon: FaBone,
        overview: 'Orthopedic conditions affect the musculoskeletal system including bones, joints, ligaments, tendons, and muscles. Our orthopedic rehabilitation program provides comprehensive care for injuries, post-surgical recovery, and chronic conditions. We use manual therapy, therapeutic exercises, and advanced modalities to reduce pain, restore function, and help patients return to their desired activities.',
        symptoms: [
            'Pain and discomfort',
            'Limited range of motion',
            'Muscle weakness and atrophy',
            'Swelling and inflammation',
            'Difficulty with daily activities',
            'Joint stiffness',
            'Reduced mobility'
        ],
        treatments: [
            'Manual therapy and joint mobilization',
            'Therapeutic exercises and stretching',
            'Strengthening and conditioning programs',
            'Pain management modalities',
            'Functional training',
            'Return to sport/activity programs',
            'Post-surgical rehabilitation'
        ],
        causes: [
            'Sports and recreational injuries',
            'Overuse and repetitive strain',
            'Arthritis and degenerative conditions',
            'Fractures and trauma',
            'Post-surgical conditions',
            'Age-related wear and tear',
            'Poor posture and body mechanics'
        ],
        recovery: 'Recovery time varies depending on the specific condition and severity. Most orthopedic conditions respond well to rehabilitation, with significant improvement typically seen within 6-12 weeks. Post-surgical recovery may take longer but follows a structured progression toward full function.'
    },
    {
        id: 8,
        title: 'Respiratory Conditions',
        slug: 'respiratory-conditions',
        description: 'Pulmonary rehabilitation for patients with chronic respiratory conditions.',
        image: '/img/conditions/respiratory.jpg',
        icon: FaLungs,
        overview: 'Chronic respiratory conditions can significantly impact quality of life and functional abilities. Our pulmonary rehabilitation program is designed to improve breathing efficiency, increase exercise tolerance, and help individuals with respiratory conditions maintain an active lifestyle. We provide education, breathing techniques, and exercise programs tailored to each patient\'s needs.',
        symptoms: [
            'Shortness of breath (dyspnea)',
            'Reduced exercise tolerance and endurance',
            'Chronic cough',
            'Fatigue and weakness',
            'Difficulty performing daily activities',
            'Wheezing',
            'Chest tightness'
        ],
        treatments: [
            'Breathing exercises and techniques',
            'Endurance and aerobic training',
            'Energy conservation strategies',
            'Airway clearance techniques',
            'Functional training for daily activities',
            'Respiratory muscle strengthening',
            'Education on disease management'
        ],
        causes: [
            'Chronic Obstructive Pulmonary Disease (COPD)',
            'Asthma',
            'Smoking and air pollution',
            'Occupational exposures',
            'Genetic factors',
            'Respiratory infections',
            'Age-related changes'
        ],
        recovery: 'While many respiratory conditions are chronic, pulmonary rehabilitation can lead to significant improvements in symptoms, exercise capacity, and quality of life. Most patients see benefits within 6-8 weeks of starting a structured program, with continued improvement over time.'
    }
];
