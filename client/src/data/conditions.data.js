import { FaBone, FaBrain, FaBolt, FaDumbbell, FaWalking, FaChild, FaHeartbeat } from 'react-icons/fa';

export const conditions = [
    // CORE MUSCULOSKELETAL SERVICE CONDITIONS
    {
        id: 1,
        title: 'Neck & Cervical Pain',
        slug: 'neck-cervical-pain',
        description: 'Comprehensive treatment for neck pain, cervical spondylosis, and stiffness with manual therapy and exercise protocols.',
        image: '/img/conditions/neck-pain.jpg',
        icon: FaBone,
        serviceCategory: 'Core Musculoskeletal Services',
        overview: 'Neck and cervical pain is one of the most common musculoskeletal complaints, often caused by poor posture, cervical spondylosis, or muscle strain. Our specialized treatment program combines manual therapy, joint mobilization, therapeutic exercises, and ergonomic counseling to provide lasting relief and restore normal neck function.',
        symptoms: [
            'Neck pain and stiffness',
            'Limited range of motion',
            'Headaches originating from neck',
            'Shoulder and arm pain',
            'Muscle tension and trigger points',
            'Pain worsening with prolonged sitting'
        ],
        treatments: [
            'Manual therapy and joint mobilization',
            'Cervical traction therapy',
            'Therapeutic exercises and stretching',
            'Posture correction techniques',
            'Ergonomic counseling for desk workers',
            'Myofascial release therapy'
        ],
        causes: [
            'Cervical spondylosis (age-related wear)',
            'Poor posture (forward head posture)',
            'Prolonged computer/desk work',
            'Muscle strain and tension',
            'Whiplash injury',
            'Disc herniation or degeneration'
        ],
        recovery: 'Most patients experience significant improvement within 4-6 weeks of consistent treatment. Chronic neck pain may require longer-term management with ongoing exercises and ergonomic modifications.'
    },
    {
        id: 2,
        title: 'Back Pain & Spine Disorders',
        slug: 'back-pain-spine',
        description: 'Expert care for low back pain, disc herniation, sciatica, and postural back pain with evidence-based rehabilitation.',
        image: '/img/conditions/back-pain.jpg',
        icon: FaBone,
        serviceCategory: 'Core Musculoskeletal Services',
        overview: 'Back pain affects millions of people and can significantly impact daily activities. Our comprehensive back pain program addresses acute and chronic low back pain, disc herniation, sciatica, and postural issues using manual therapy, core strengthening, and McKenzie-style protocols to restore function and prevent recurrence.',
        symptoms: [
            'Low back pain (acute or chronic)',
            'Radiating leg pain (sciatica)',
            'Muscle spasms and stiffness',
            'Difficulty bending or lifting',
            'Pain worsening with sitting or standing',
            'Numbness or tingling in legs'
        ],
        treatments: [
            'Manual therapy and spinal mobilization',
            'McKenzie method protocols',
            'Core stability training',
            'Therapeutic exercises',
            'Traction therapy',
            'Functional movement training'
        ],
        causes: [
            'Disc herniation or bulge',
            'Muscle strain or sprain',
            'Poor posture and body mechanics',
            'Degenerative disc disease',
            'Facet joint dysfunction',
            'Spinal stenosis'
        ],
        recovery: 'Acute back pain typically improves within 2-6 weeks. Chronic conditions may require 8-12 weeks of rehabilitation. Our goal is not just pain relief but long-term prevention through proper movement patterns and core strengthening.'
    },
    {
        id: 3,
        title: 'Knee Pain & Injuries',
        slug: 'knee-pain-injuries',
        description: 'Specialized rehabilitation for knee pain, ACL injuries, meniscus tears, and post-knee replacement recovery.',
        image: '/img/conditions/knee-pain.jpg',
        icon: FaBone,
        serviceCategory: 'Core Musculoskeletal Services',
        overview: 'Knee pain and injuries can result from sports, arthritis, or post-surgical conditions. Our knee rehabilitation program provides comprehensive care for ACL reconstruction, meniscus tears, total knee replacement (TKR), and general knee pain using phase-wise protocols, strengthening exercises, and gait training.',
        symptoms: [
            'Knee pain and swelling',
            'Instability or giving way',
            'Limited range of motion',
            'Difficulty walking or climbing stairs',
            'Post-surgical pain and stiffness',
            'Grinding or clicking sensations'
        ],
        treatments: [
            'Post-ACL reconstruction rehabilitation',
            'Total knee replacement (TKR) protocols',
            'Strengthening and stability exercises',
            'Gait training and mobility work',
            'Manual therapy and joint mobilization',
            'Return to activity programs'
        ],
        causes: [
            'ACL/MCL/meniscus tears',
            'Osteoarthritis',
            'Post-surgical conditions (TKR, ACL)',
            'Patellofemoral pain syndrome',
            'Overuse injuries',
            'Traumatic injury'
        ],
        recovery: 'Post-surgical knee rehabilitation typically takes 3-6 months for full recovery. ACL reconstruction requires 6-9 months before return to sports. Arthritis management is ongoing with focus on maintaining function and reducing pain.'
    },
    {
        id: 4,
        title: 'Shoulder Pain & Rotator Cuff',
        slug: 'shoulder-pain-rotator-cuff',
        description: 'Comprehensive treatment for shoulder pain, rotator cuff injuries, frozen shoulder, and post-surgical rehabilitation.',
        image: '/img/conditions/shoulder-pain.jpg',
        icon: FaBone,
        serviceCategory: 'Core Musculoskeletal Services',
        overview: 'Shoulder pain can severely limit daily activities and work. Our shoulder rehabilitation program treats rotator cuff tears, frozen shoulder, impingement syndrome, and post-surgical conditions using manual therapy, strengthening exercises, and functional training to restore full shoulder function.',
        symptoms: [
            'Shoulder pain and weakness',
            'Limited range of motion',
            'Pain with overhead activities',
            'Night pain affecting sleep',
            'Difficulty reaching behind back',
            'Clicking or popping sensations'
        ],
        treatments: [
            'Rotator cuff strengthening',
            'Manual therapy and mobilization',
            'Post-surgical rehabilitation protocols',
            'Scapular stabilization exercises',
            'Range of motion restoration',
            'Functional activity training'
        ],
        causes: [
            'Rotator cuff tears or tendinopathy',
            'Frozen shoulder (adhesive capsulitis)',
            'Shoulder impingement syndrome',
            'Post-surgical conditions',
            'Overuse injuries',
            'Traumatic injury or dislocation'
        ],
        recovery: 'Frozen shoulder typically requires 3-6 months of treatment. Rotator cuff rehabilitation takes 3-4 months for conservative treatment, 4-6 months post-surgery. Early intervention leads to better outcomes.'
    },

    // NEUROLOGY & BALANCE SERVICE CONDITIONS
    {
        id: 5,
        title: 'Stroke Recovery',
        slug: 'stroke-recovery',
        description: 'Comprehensive stroke rehabilitation to regain movement, balance, speech, and independence after stroke.',
        image: '/img/conditions/stroke.jpg',
        icon: FaBrain,
        serviceCategory: 'Neurology and Balance Services',
        overview: 'Stroke rehabilitation is crucial for recovery and regaining independence. Our comprehensive program addresses weakness, balance problems, speech difficulties, and functional limitations using evidence-based neurorehabilitation techniques including PNF, task-oriented training, and gait training.',
        symptoms: [
            'Weakness or paralysis (hemiplegia)',
            'Balance and coordination problems',
            'Speech and language difficulties',
            'Difficulty walking',
            'Cognitive impairment',
            'Facial weakness'
        ],
        treatments: [
            'Neurorehabilitation exercises',
            'Gait and balance training',
            'PNF (Proprioceptive Neuromuscular Facilitation)',
            'Task-oriented functional training',
            'Speech therapy coordination',
            'Assistive device training'
        ],
        causes: [
            'Ischemic stroke (blood clot)',
            'Hemorrhagic stroke (bleeding)',
            'High blood pressure',
            'Diabetes',
            'Heart disease',
            'Smoking and lifestyle factors'
        ],
        recovery: 'Stroke recovery is most rapid in the first 3-6 months but can continue for years. Early intensive rehabilitation leads to better outcomes. Our program adapts to each recovery stage to maximize functional gains.'
    },
    {
        id: 6,
        title: 'Parkinsonism & Movement Disorders',
        slug: 'parkinsonism-movement-disorders',
        description: 'Specialized therapy for Parkinson\'s disease, tremors, rigidity, and gait problems to maintain mobility and independence.',
        image: '/img/conditions/parkinsons.jpg',
        icon: FaBrain,
        serviceCategory: 'Neurology and Balance Services',
        overview: 'Parkinsonism and movement disorders require specialized rehabilitation to maintain mobility and quality of life. Our program uses evidence-based techniques including gait training, balance exercises, and functional training to help manage symptoms and maintain independence.',
        symptoms: [
            'Tremors (especially at rest)',
            'Muscle rigidity and stiffness',
            'Slow movement (bradykinesia)',
            'Balance problems and falls',
            'Shuffling gait',
            'Difficulty with fine motor tasks'
        ],
        treatments: [
            'Gait training and mobility exercises',
            'Balance and fall prevention training',
            'Strengthening and flexibility programs',
            'Functional task practice',
            'Assistive device training',
            'Home safety modifications'
        ],
        causes: [
            'Parkinson\'s disease',
            'Age-related factors',
            'Genetic predisposition',
            'Environmental toxin exposure',
            'Medication side effects',
            'Other neurological conditions'
        ],
        recovery: 'Parkinsonism is progressive, but regular therapy can slow symptom progression, maintain function, and improve quality of life. Consistent exercise and therapy are key to managing the condition long-term.'
    },
    {
        id: 7,
        title: 'Cerebral Palsy',
        slug: 'cerebral-palsy',
        description: 'Pediatric neurorehabilitation for children with cerebral palsy using NDT/Bobath, PNF, and developmental training.',
        image: '/img/conditions/cerebral-palsy.jpg',
        icon: FaChild,
        serviceCategory: 'Neurology and Balance Services',
        overview: 'Cerebral palsy requires specialized pediatric rehabilitation to help children reach their maximum potential. Our program uses NDT/Bobath techniques, PNF, and task-oriented training to improve motor skills, functional abilities, and developmental milestones.',
        symptoms: [
            'Muscle stiffness or spasticity',
            'Movement and coordination difficulties',
            'Delayed developmental milestones',
            'Difficulty with balance and walking',
            'Fine motor skill challenges',
            'Abnormal posture and movement patterns'
        ],
        treatments: [
            'NDT/Bobath therapy techniques',
            'PNF (Proprioceptive Neuromuscular Facilitation)',
            'Task-oriented training',
            'Developmental milestone activities',
            'Gait training and mobility work',
            'Family education and home programs'
        ],
        causes: [
            'Brain damage before or during birth',
            'Lack of oxygen during delivery',
            'Premature birth',
            'Infections during pregnancy',
            'Genetic factors',
            'Early childhood brain injury'
        ],
        recovery: 'While CP is permanent, early intervention and consistent therapy lead to significant improvements in function and independence. Children can continue developing new skills throughout childhood with appropriate support.'
    },
    {
        id: 8,
        title: 'Balance Disorders & Vertigo',
        slug: 'balance-disorders-vertigo',
        description: 'Vestibular rehabilitation for vertigo, dizziness, balance problems, and fall prevention.',
        image: '/img/conditions/vertigo.jpg',
        icon: FaWalking,
        serviceCategory: 'Neurology and Balance Services',
        overview: 'Balance disorders and vertigo can significantly impact daily life and increase fall risk. Our vestibular rehabilitation program uses specialized exercises and balance training to reduce dizziness, improve balance, and prevent falls.',
        symptoms: [
            'Dizziness and vertigo',
            'Balance problems and unsteadiness',
            'Nausea with head movements',
            'Fear of falling',
            'Difficulty walking in dark',
            'Visual disturbances with movement'
        ],
        treatments: [
            'Vestibular rehabilitation exercises',
            'Balance and gait training',
            'Fall prevention strategies',
            'Canalith repositioning maneuvers',
            'Habituation exercises',
            'Balance lab training'
        ],
        causes: [
            'BPPV (Benign Paroxysmal Positional Vertigo)',
            'Vestibular neuritis',
            'Meniere\'s disease',
            'Age-related balance decline',
            'Inner ear disorders',
            'Neurological conditions'
        ],
        recovery: 'Most vestibular disorders improve significantly within 4-8 weeks of rehabilitation. BPPV often resolves quickly with repositioning maneuvers. Chronic balance issues benefit from ongoing exercise and fall prevention strategies.'
    },

    // PAIN & ELECTROTHERAPY SERVICE CONDITIONS
    {
        id: 9,
        title: 'Chronic Low Back Pain',
        slug: 'chronic-low-back-pain',
        description: 'Advanced pain management for chronic low back pain using manual therapy, electrotherapy, and exercise.',
        image: '/img/conditions/chronic-back-pain.jpg',
        icon: FaBolt,
        serviceCategory: 'Pain and Electrotherapy Services',
        overview: 'Chronic low back pain lasting more than 3 months requires specialized pain management. Our chronic pain clinic combines manual therapy, electrotherapy modalities (IFT, TENS, ultrasound), dry needling, and therapeutic exercises to provide lasting relief and restore function.',
        symptoms: [
            'Persistent low back pain (>3 months)',
            'Muscle tension and trigger points',
            'Limited mobility and stiffness',
            'Pain affecting sleep and daily activities',
            'Difficulty with prolonged sitting or standing',
            'Radiating pain to hips or legs'
        ],
        treatments: [
            'Manual therapy and myofascial release',
            'Electrotherapy (IFT, TENS, ultrasound, LASER)',
            'Dry needling for trigger points',
            'Therapeutic exercise programs',
            'Traction therapy',
            'Evidence-based combination therapy packages'
        ],
        causes: [
            'Degenerative disc disease',
            'Facet joint arthritis',
            'Myofascial pain syndrome',
            'Previous injury or trauma',
            'Poor posture and ergonomics',
            'Muscle imbalances'
        ],
        recovery: 'Chronic pain management is gradual. Most patients see significant improvement within 6-8 weeks of combination therapy. Long-term success requires ongoing exercise and lifestyle modifications.'
    },
    {
        id: 10,
        title: 'Fibromyalgia',
        slug: 'fibromyalgia',
        description: 'Comprehensive pain management for fibromyalgia with gentle exercises, manual therapy, and pain modulation.',
        image: '/img/conditions/fibromyalgia.jpg',
        icon: FaBolt,
        serviceCategory: 'Pain and Electrotherapy Services',
        overview: 'Fibromyalgia causes widespread chronic pain and requires a gentle, comprehensive approach. Our program combines low-impact exercises, manual therapy, electrotherapy, and pain education to help manage symptoms and improve quality of life.',
        symptoms: [
            'Widespread body pain',
            'Chronic fatigue',
            'Sleep disturbances',
            'Tender points throughout body',
            'Cognitive difficulties ("fibro fog")',
            'Headaches and migraines'
        ],
        treatments: [
            'Gentle therapeutic exercises',
            'Manual therapy and soft tissue work',
            'Electrotherapy for pain relief',
            'Energy conservation techniques',
            'Relaxation and stress management',
            'Gradual conditioning programs'
        ],
        causes: [
            'Unknown exact cause',
            'Genetic predisposition',
            'Physical or emotional trauma',
            'Infections',
            'Stress',
            'Sleep disorders'
        ],
        recovery: 'Fibromyalgia is chronic but manageable. Treatment focuses on symptom reduction and functional improvement. Most patients see gradual improvement over 8-12 weeks with consistent therapy and lifestyle modifications.'
    },
    {
        id: 11,
        title: 'Headaches & Migraines',
        slug: 'headaches-migraines',
        description: 'Specialized treatment for tension headaches, cervicogenic headaches, and migraine management.',
        image: '/img/conditions/headaches.jpg',
        icon: FaBolt,
        serviceCategory: 'Pain and Electrotherapy Services',
        overview: 'Headaches and migraines can be debilitating. Our headache management program addresses cervicogenic headaches, tension headaches, and migraines using manual therapy, posture correction, trigger point treatment, and relaxation techniques.',
        symptoms: [
            'Frequent or chronic headaches',
            'Neck pain associated with headaches',
            'Tension in head, neck, and shoulders',
            'Sensitivity to light or sound',
            'Nausea with headaches',
            'Pain worsening with stress or posture'
        ],
        treatments: [
            'Cervical manual therapy',
            'Trigger point dry needling',
            'Posture correction exercises',
            'Myofascial release techniques',
            'Relaxation and stress management',
            'Ergonomic modifications'
        ],
        causes: [
            'Cervical spine dysfunction',
            'Muscle tension and trigger points',
            'Poor posture',
            'Stress and anxiety',
            'TMJ disorders',
            'Migraine triggers'
        ],
        recovery: 'Cervicogenic and tension headaches typically improve within 4-6 weeks of treatment. Migraine management is ongoing but frequency and intensity can be significantly reduced with proper therapy.'
    },
    {
        id: 12,
        title: 'TMJ & Jaw Pain',
        slug: 'tmj-jaw-pain',
        description: 'Expert treatment for temporomandibular joint disorders, jaw pain, and clicking with specialized manual therapy.',
        image: '/img/conditions/tmj.jpg',
        icon: FaBolt,
        serviceCategory: 'Pain and Electrotherapy Services',
        overview: 'TMJ disorders cause jaw pain, clicking, and difficulty chewing. Our specialized TMJ program uses manual therapy, jaw exercises, and pain management techniques to restore normal jaw function and eliminate pain.',
        symptoms: [
            'Jaw pain and tenderness',
            'Clicking or popping sounds',
            'Difficulty opening mouth fully',
            'Jaw locking',
            'Headaches and ear pain',
            'Pain with chewing'
        ],
        treatments: [
            'TMJ manual therapy techniques',
            'Jaw mobilization exercises',
            'Myofascial release',
            'Posture correction',
            'Relaxation techniques',
            'Activity modification guidance'
        ],
        causes: [
            'TMJ dysfunction',
            'Teeth grinding (bruxism)',
            'Jaw clenching',
            'Arthritis in TMJ',
            'Jaw injury or trauma',
            'Stress and muscle tension'
        ],
        recovery: 'Most TMJ disorders improve within 6-8 weeks of conservative treatment. Chronic cases may require longer management. Success depends on addressing contributing factors like stress and teeth grinding.'
    },

    // SPORTS, SPINE & LIFESTYLE SERVICE CONDITIONS
    {
        id: 13,
        title: 'Sports Injuries',
        slug: 'sports-injuries',
        description: 'Comprehensive sports injury rehabilitation for ligament sprains, tendinopathies, and return-to-sport programs.',
        image: '/img/conditions/sports-injuries.jpg',
        icon: FaDumbbell,
        serviceCategory: 'Sports, Spine, and Lifestyle Services',
        overview: 'Sports injuries require specialized rehabilitation to ensure safe return to activity. Our sports injury program treats ligament sprains, tendinopathies, muscle strains, and post-arthroscopy conditions using phase-wise protocols, strengthening, and return-to-sport testing.',
        symptoms: [
            'Acute injury pain and swelling',
            'Ligament sprains (ankle, knee)',
            'Tendon pain and inflammation',
            'Muscle strains',
            'Reduced athletic performance',
            'Fear of re-injury'
        ],
        treatments: [
            'Sports-specific rehabilitation',
            'Strengthening and conditioning',
            'Return-to-sport testing',
            'Taping and bracing',
            'Plyometric training',
            'Sport-specific drills'
        ],
        causes: [
            'Acute sports trauma',
            'Overuse and overtraining',
            'Improper technique',
            'Inadequate warm-up',
            'Previous injury',
            'Muscle imbalances'
        ],
        recovery: 'Sports injury recovery varies by severity. Minor sprains: 2-4 weeks. Moderate injuries: 6-12 weeks. Post-surgical: 3-6 months. Our goal is safe, complete recovery and injury prevention.'
    },
    {
        id: 14,
        title: 'Scoliosis & Postural Disorders',
        slug: 'scoliosis-postural',
        description: 'Specialized treatment for scoliosis, kyphosis, and postural back pain with corrective exercises.',
        image: '/img/conditions/scoliosis.jpg',
        icon: FaDumbbell,
        serviceCategory: 'Sports, Spine, and Lifestyle Services',
        overview: 'Scoliosis and postural disorders affect spinal alignment and can cause pain and functional limitations. Our spine clinic provides specialized treatment including corrective exercises, core strengthening, and postural training to manage symptoms and prevent progression.',
        symptoms: [
            'Visible spinal curvature',
            'Uneven shoulders or hips',
            'Back pain and muscle fatigue',
            'Postural imbalances',
            'Reduced flexibility',
            'Breathing difficulties (severe cases)'
        ],
        treatments: [
            'Scoliosis-specific exercises',
            'Core stability training',
            'Postural correction programs',
            'Manual therapy',
            'Bracing support (when needed)',
            'Functional movement training'
        ],
        causes: [
            'Idiopathic scoliosis',
            'Congenital spinal abnormalities',
            'Neuromuscular conditions',
            'Poor posture habits',
            'Muscle imbalances',
            'Leg length discrepancy'
        ],
        recovery: 'Scoliosis management is ongoing, especially during growth years. Exercise programs can reduce pain, improve posture, and potentially slow curve progression. Adult scoliosis focuses on pain management and function.'
    },
    {
        id: 15,
        title: 'Obesity & PCOD Management',
        slug: 'obesity-pcod',
        description: 'Lifestyle wellness programs with customized exercise plans for weight management and PCOD symptoms.',
        image: '/img/conditions/obesity-wellness.jpg',
        icon: FaHeartbeat,
        serviceCategory: 'Sports, Spine, and Lifestyle Services',
        overview: 'Obesity and PCOD require comprehensive lifestyle management. Our wellness program provides customized exercise plans, activity guidance, and lifestyle counseling to support weight management, improve PCOD symptoms, and enhance overall health.',
        symptoms: [
            'Excess body weight',
            'Reduced mobility and endurance',
            'Joint pain from excess weight',
            'PCOD symptoms (irregular periods, weight gain)',
            'Fatigue and low energy',
            'Difficulty with physical activities'
        ],
        treatments: [
            'Customized exercise programs',
            'Cardiovascular conditioning',
            'Strength training',
            'Lifestyle and activity counseling',
            'Progressive fitness plans',
            'Group exercise classes'
        ],
        causes: [
            'Sedentary lifestyle',
            'Poor dietary habits',
            'Hormonal imbalances (PCOD)',
            'Genetic factors',
            'Metabolic disorders',
            'Stress and emotional factors'
        ],
        recovery: 'Weight management and PCOD improvement require consistent effort over 8-12 weeks minimum. Progressive exercise programs combined with lifestyle changes lead to sustainable results and improved health markers.'
    },
    {
        id: 16,
        title: 'Prenatal & Postnatal Care',
        slug: 'prenatal-postnatal',
        description: 'Specialized exercise programs for pregnancy wellness and postpartum recovery with safe, effective protocols.',
        image: '/img/conditions/prenatal-postnatal.jpg',
        icon: FaHeartbeat,
        serviceCategory: 'Sports, Spine, and Lifestyle Services',
        overview: 'Pregnancy and postpartum periods require specialized exercise guidance. Our prenatal and postnatal programs provide safe, effective exercises to maintain fitness during pregnancy, prepare for delivery, and support postpartum recovery including core and pelvic floor rehabilitation.',
        symptoms: [
            'Pregnancy-related back pain',
            'Pelvic girdle pain',
            'Postpartum weakness',
            'Diastasis recti (abdominal separation)',
            'Pelvic floor dysfunction',
            'Reduced fitness and endurance'
        ],
        treatments: [
            'Prenatal exercise programs',
            'Postnatal recovery exercises',
            'Core and pelvic floor rehabilitation',
            'Diastasis recti treatment',
            'Safe strengthening protocols',
            'Return to fitness guidance'
        ],
        causes: [
            'Pregnancy-related changes',
            'Hormonal effects on ligaments',
            'Postural changes',
            'Delivery-related trauma',
            'Abdominal muscle separation',
            'Pelvic floor weakness'
        ],
        recovery: 'Prenatal programs continue throughout pregnancy. Postnatal recovery typically takes 6-12 weeks for basic recovery, 3-6 months for full return to pre-pregnancy fitness. Individualized programs ensure safe, effective recovery.'
    }
];
