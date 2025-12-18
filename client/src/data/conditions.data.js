import { FaBrain, FaHeartbeat, FaBone, FaLungs, FaUserInjured, FaWheelchair } from 'react-icons/fa';

export const conditions = [
    {
        id: 1,
        title: 'Stroke',
        description: 'Comprehensive rehabilitation for stroke survivors to regain independence and quality of life.',
        icon: FaBrain,
        symptoms: [
            'Weakness or paralysis',
            'Speech difficulties',
            'Balance problems',
            'Cognitive impairment',
            'Vision problems'
        ],
        treatments: [
            'Physical therapy',
            'Speech therapy',
            'Occupational therapy',
            'Cognitive rehabilitation',
            'Mobility training'
        ]
    },
    {
        id: 2,
        title: 'Spinal Cord Injury',
        description: 'Specialized care for spinal cord injuries focusing on maximizing function and independence.',
        icon: FaBone,
        symptoms: [
            'Loss of movement',
            'Loss of sensation',
            'Bowel/bladder dysfunction',
            'Respiratory difficulties',
            'Muscle spasticity'
        ],
        treatments: [
            'Mobility training',
            'Strengthening exercises',
            'Adaptive equipment training',
            'Respiratory therapy',
            'Functional training'
        ]
    },
    {
        id: 3,
        title: 'Traumatic Brain Injury',
        description: 'Expert rehabilitation for traumatic brain injury patients to restore cognitive and physical abilities.',
        icon: FaUserInjured,
        symptoms: [
            'Memory problems',
            'Difficulty concentrating',
            'Headaches',
            'Balance issues',
            'Emotional changes'
        ],
        treatments: [
            'Cognitive therapy',
            'Physical rehabilitation',
            'Speech therapy',
            'Behavioral therapy',
            'Vestibular rehabilitation'
        ]
    },
    {
        id: 4,
        title: 'Parkinson\'s Disease',
        description: 'Comprehensive management of Parkinson\'s disease symptoms to maintain quality of life.',
        icon: FaHeartbeat,
        symptoms: [
            'Tremors',
            'Rigidity',
            'Slow movement',
            'Balance problems',
            'Speech changes'
        ],
        treatments: [
            'LSVT BIG therapy',
            'LSVT LOUD therapy',
            'Gait training',
            'Balance exercises',
            'Functional training'
        ]
    },
    {
        id: 5,
        title: 'Multiple Sclerosis',
        description: 'Tailored rehabilitation programs for managing multiple sclerosis symptoms and maintaining function.',
        icon: FaBrain,
        symptoms: [
            'Fatigue',
            'Weakness',
            'Coordination problems',
            'Vision issues',
            'Cognitive changes'
        ],
        treatments: [
            'Energy conservation',
            'Strengthening programs',
            'Balance training',
            'Cognitive strategies',
            'Adaptive techniques'
        ]
    },
    {
        id: 6,
        title: 'Cerebral Palsy',
        description: 'Specialized pediatric rehabilitation for children with cerebral palsy to maximize their potential.',
        icon: FaWheelchair,
        symptoms: [
            'Muscle stiffness',
            'Movement difficulties',
            'Coordination problems',
            'Developmental delays',
            'Speech difficulties'
        ],
        treatments: [
            'Physical therapy',
            'Occupational therapy',
            'Speech therapy',
            'Orthotic management',
            'Functional training'
        ]
    },
    {
        id: 7,
        title: 'Orthopedic Conditions',
        description: 'Rehabilitation for orthopedic injuries and post-surgical recovery to restore full function.',
        icon: FaBone,
        symptoms: [
            'Pain',
            'Limited range of motion',
            'Weakness',
            'Swelling',
            'Difficulty with activities'
        ],
        treatments: [
            'Manual therapy',
            'Therapeutic exercises',
            'Modalities',
            'Functional training',
            'Return to activity programs'
        ]
    },
    {
        id: 8,
        title: 'Respiratory Conditions',
        description: 'Pulmonary rehabilitation for patients with chronic respiratory conditions.',
        icon: FaLungs,
        symptoms: [
            'Shortness of breath',
            'Reduced endurance',
            'Chronic cough',
            'Fatigue',
            'Difficulty with activities'
        ],
        treatments: [
            'Breathing exercises',
            'Endurance training',
            'Energy conservation',
            'Airway clearance',
            'Functional training'
        ]
    }
];
