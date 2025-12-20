import { FaBone, FaBrain, FaBolt, FaDumbbell } from 'react-icons/fa';

export const services = [
    {
        id: 1,
        title: 'Core Musculoskeletal Services',
        description: 'Comprehensive ortho physiotherapy for neck, back, shoulder, knee, ankle, and post-fracture recovery with evidence-based manual therapy and exercise protocols.',
        icon: FaBone,
        image: '/img/services/musculoskeletal.jpg',
        features: [
            'Ortho physiotherapy for neck, back, shoulder, knee, ankle, and post-fracture stiffness',
            'Manual therapy, joint mobilization, and exercise therapy',
            'Post-orthopedic surgery rehab (THR, TKR, ACL, rotator cuff, spine surgery)',
            'Phase-wise protocols and gait training',
            'Posture correction and ergonomic counseling for IT professionals, students, and office workers'
        ]
    },
    {
        id: 2,
        title: 'Neurology and Balance Services',
        description: 'Specialized neurorehabilitation for stroke, spinal cord injury, Parkinsonism, and pediatric neurological conditions with advanced balance and gait training.',
        icon: FaBrain,
        image: '/img/services/neuro-balance.jpg',
        features: [
            'Neurorehabilitation for stroke, facial palsy, spinal cord injury, Parkinsonism, and neuropathies',
            'Cerebral palsy treatment using PNF, NDT/Bobath, and task-oriented training',
            'Balance and gait lab with fall-prevention training',
            'Vestibular rehab for vertigo and dizziness',
            'Assistive device training (stick, walker)',
            'Pediatric neurophysiotherapy for delayed milestones, CP, and developmental coordination'
        ]
    },
    {
        id: 3,
        title: 'Pain and Electrotherapy Services',
        description: 'Advanced chronic pain management clinic combining manual therapy, electrotherapy modalities, and evidence-based protocols for lasting relief.',
        icon: FaBolt,
        image: '/img/services/pain-electrotherapy.jpg',
        features: [
            'Chronic pain clinic: low back pain, cervical spondylosis, myofascial pain, fibromyalgia',
            'Manual therapy, dry needling, cupping, and therapeutic exercise',
            'Electrotherapy: IFT, TENS, ultrasound, LASER, muscle stimulator, traction',
            'Evidence-based pain management combination therapy packages',
            'Headache, TMJ, and jaw pain management protocols',
            'Cervical treatment, posture correction, and myofascial release'
        ]
    },
    {
        id: 4,
        title: 'Sports, Spine, and Lifestyle Services',
        description: 'Targeted programs for sports injuries, spine conditions, and lifestyle wellness including obesity, PCOD, prenatal/postnatal care, and senior mobility.',
        icon: FaDumbbell,
        image: '/img/services/sports-spine.jpg',
        features: [
            'Sports injury rehab: ligament sprains, tendinopathies, post-arthroscopy recovery',
            'Return-to-sport testing and taping services',
            'Spine clinic: disc issues, sciatica, scoliosis, postural back pain',
            'Core-stability training and McKenzie-style protocols',
            'Lifestyle and wellness: obesity and PCOD exercise plans',
            'Ante- and post-natal exercise programs',
            'Arthritis exercise group classes and senior citizen mobility programs'
        ]
    }
];
