import { FaBrain, FaWalking, FaHandHoldingHeart, FaUserMd, FaChild, FaDumbbell } from 'react-icons/fa';

export const services = [
    {
        id: 1,
        title: 'Neuro Rehabilitation',
        description: 'Advanced stroke and spinal injury rehabilitation programs designed to restore function and independence.',
        icon: FaBrain,
        image: '/img/services/neuro-rehab.jpg',
        features: [
            'Stroke recovery programs',
            'Spinal cord injury rehabilitation',
            'Traumatic brain injury treatment',
            'Neurological disorder management',
            'Cognitive rehabilitation therapy'
        ]
    },
    {
        id: 2,
        title: 'Physical Therapy',
        description: 'Comprehensive physical therapy services to improve mobility, strength, and overall physical function.',
        icon: FaWalking,
        image: '/img/services/physical-therapy.jpg',
        features: [
            'Manual therapy techniques',
            'Therapeutic exercises',
            'Gait training',
            'Balance and coordination',
            'Pain management'
        ]
    },
    {
        id: 3,
        title: 'Occupational Therapy',
        description: 'Helping patients regain independence in daily living activities and return to meaningful occupations.',
        icon: FaHandHoldingHeart,
        image: '/img/services/occupational-therapy.jpg',
        features: [
            'Activities of daily living training',
            'Fine motor skill development',
            'Cognitive rehabilitation',
            'Adaptive equipment training',
            'Work conditioning programs'
        ]
    },
    {
        id: 4,
        title: 'Speech Therapy',
        description: 'Expert speech and language therapy for communication and swallowing disorders.',
        icon: FaUserMd,
        image: '/img/services/speech-therapy.jpg',
        features: [
            'Aphasia treatment',
            'Dysarthria management',
            'Swallowing therapy',
            'Voice disorders',
            'Cognitive-communication therapy'
        ]
    },
    {
        id: 5,
        title: 'Pediatric Rehabilitation',
        description: 'Specialized rehabilitation services for children with developmental and neurological conditions.',
        icon: FaChild,
        image: '/img/services/pediatric-rehab.jpg',
        features: [
            'Cerebral palsy management',
            'Developmental delay therapy',
            'Autism spectrum support',
            'Sensory integration therapy',
            'Early intervention programs'
        ]
    },
    {
        id: 6,
        title: 'Sports Rehabilitation',
        description: 'Specialized programs for athletes recovering from sports injuries and enhancing performance.',
        icon: FaDumbbell,
        image: '/img/services/sports-rehab.jpg',
        features: [
            'Sports injury recovery',
            'Performance enhancement',
            'Injury prevention programs',
            'Return to sport protocols',
            'Athletic conditioning'
        ]
    }
];
