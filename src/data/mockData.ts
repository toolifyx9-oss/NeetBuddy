import { 
  Question, 
  MockTest, 
  UserProfile, 
  StudyTask, 
  AiDoubtResponse, 
  ChapterNote, 
  MistakeRecord, 
  TestSubmission 
} from '../types';
import rawQuestions from './questionsData.json';

export const ALL_QUESTIONS: Question[] = rawQuestions as Question[];

export const SUBJECTS: { code: 'ph' | 'ch' | 'bi'; name: 'Physics' | 'Chemistry' | 'Biology'; icon: string; color: string; bg: string }[] = [
  { code: 'ph', name: 'Physics', icon: 'Atom', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  { code: 'ch', name: 'Chemistry', icon: 'FlaskConical', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { code: 'bi', name: 'Biology', icon: 'Dna', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
];

export const CHAPTERS_BY_SUBJECT: Record<'ph' | 'ch' | 'bi', string[]> = {
  ph: [
    'Laws of Motion',
    'Work, Energy and Power',
    'Rotational Motion',
    'Thermodynamics',
    'Electrostatics',
    'Current Electricity',
    'Magnetic Effects of Current',
    'Ray Optics & Optical Instruments',
    'Modern Physics & Atoms'
  ],
  ch: [
    'Some Basic Concepts of Chemistry',
    'Structure of Atom',
    'Chemical Bonding & Molecular Structure',
    'Chemical Thermodynamics',
    'Equilibrium',
    'Coordination Compounds',
    'Organic Chemistry: Basic Principles & Techniques',
    'Hydrocarbons',
    'Aldehydes, Ketones and Carboxylic Acids'
  ],
  bi: [
    'Cell: The Unit of Life',
    'Cell Cycle and Cell Division',
    'Photosynthesis in Higher Plants',
    'Respiration in Plants',
    'Plant Growth and Development',
    'Human Physiology: Breathing & Exchange of Gases',
    'Human Physiology: Body Fluids & Circulation',
    'Principles of Inheritance and Variation',
    'Molecular Basis of Inheritance',
    'Biotechnology: Principles and Processes'
  ]
};

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'test_nta_full_01',
    title: 'NTA NEET Full Syllabus Mock Test 2026 #1',
    subtitle: 'Full 720-marks simulation with exact 2026 revised NTA difficulty and pattern.',
    category: 'full_syllabus',
    durationMinutes: 180,
    totalQuestions: 200,
    totalMarks: 720,
    syllabus: ['Complete Physics (XI & XII)', 'Complete Chemistry (XI & XII)', 'Complete Biology (XI & XII)'],
    difficulty: 'NTA Standard',
    recommended: true,
    subjectDistribution: { physics: 50, chemistry: 50, biology: 100 }
  },
  {
    id: 'test_aiims_elite_02',
    title: 'AIIMS New Delhi Rankers Super 50',
    subtitle: 'High-yield assertion-reason and multi-statement conceptual questions.',
    category: 'high_yield',
    durationMinutes: 60,
    totalQuestions: 50,
    totalMarks: 200,
    syllabus: ['Modern Physics', 'Coordination Compounds', 'Genetics & Biotechnology'],
    difficulty: 'AIIMS Level',
    recommended: true,
    subjectDistribution: { physics: 15, chemistry: 15, biology: 20 }
  },
  {
    id: 'test_physics_mechanics',
    title: 'Physics Mastery: Mechanics & Rotational Motion',
    subtitle: 'Intensive focus on friction, angular momentum, and work-energy theorem.',
    category: 'subject_wise',
    durationMinutes: 45,
    totalQuestions: 45,
    totalMarks: 180,
    syllabus: ['Laws of Motion', 'Work, Energy & Power', 'Rotational Dynamics'],
    difficulty: 'NTA Standard',
    subjectDistribution: { physics: 45, chemistry: 0, biology: 0 }
  },
  {
    id: 'test_chemistry_organic',
    title: 'Chemistry Sprint: Organic Reaction Mechanisms & Bonding',
    subtitle: 'SN1/SN2, hybridization, molecular orbitals, and electrophilic additions.',
    category: 'subject_wise',
    durationMinutes: 45,
    totalQuestions: 45,
    totalMarks: 180,
    syllabus: ['Chemical Bonding', 'GOC & Reaction Intermediates', 'Hydrocarbons'],
    difficulty: 'Moderate',
    subjectDistribution: { physics: 0, chemistry: 45, biology: 0 }
  },
  {
    id: 'test_biology_genetics',
    title: 'Biology 360: Molecular Genetics & Biotechnology',
    subtitle: 'DNA replication, transcription, operon models, and recombinant DNA tools.',
    category: 'subject_wise',
    durationMinutes: 60,
    totalQuestions: 90,
    totalMarks: 360,
    syllabus: ['Molecular Basis of Inheritance', 'Principles of Inheritance', 'Biotech Principles'],
    difficulty: 'NTA Standard',
    recommended: true,
    subjectDistribution: { physics: 0, chemistry: 0, biology: 90 }
  },
  {
    id: 'test_rapid_dpp_01',
    title: 'Daily High-Speed DPP #1',
    subtitle: '15 sharp high-frequency questions designed for speed and rapid recall.',
    category: 'high_yield',
    durationMinutes: 15,
    totalQuestions: 15,
    totalMarks: 60,
    syllabus: ['Cell Division', 'Chemical Thermodynamics', 'Current Electricity'],
    difficulty: 'Moderate',
    subjectDistribution: { physics: 5, chemistry: 5, biology: 5 }
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr_aiims_aryan',
  name: 'Aryan Verma',
  email: 'aryan.verma@neetprep.in',
  phone: '+91 98765 43210',
  cls: 'Class 12 / Dropper',
  targetScore: 695,
  dreamCollege: 'AIIMS New Delhi',
  currentStreak: 19,
  longestStreak: 24,
  lastActiveDate: new Date().toISOString(),
  testsCompleted: 14,
  questionsAttempted: 1120,
  overallAccuracy: 86.4,
  avatar: '/images/hero-student.png'
};

export const INITIAL_STUDY_TASKS: StudyTask[] = [
  {
    id: 'task_01',
    title: 'Revise Pedigree Analysis and Mendelian Monohybrid Crosses',
    subject: 'Biology',
    chapter: 'Principles of Inheritance and Variation',
    status: 'in_progress',
    priority: 'high',
    dueDate: 'Today, 8:00 PM'
  },
  {
    id: 'task_02',
    title: 'Practice 40 Numerical Problems on Friction & Banking of Roads',
    subject: 'Physics',
    chapter: 'Laws of Motion',
    status: 'todo',
    priority: 'high',
    dueDate: 'Tomorrow'
  },
  {
    id: 'task_03',
    title: 'Memorize Electrochemical Series and Nernst Equation Applications',
    subject: 'Chemistry',
    chapter: 'Electrochemistry',
    status: 'todo',
    priority: 'medium',
    dueDate: 'In 2 days'
  },
  {
    id: 'task_04',
    title: 'Complete NCERT Line-by-Line Review for Photosynthesis C3/C4 Cycle',
    subject: 'Biology',
    chapter: 'Photosynthesis in Higher Plants',
    status: 'completed',
    priority: 'high',
    dueDate: 'Completed Yesterday'
  },
  {
    id: 'task_05',
    title: 'Solve Previous 5 Years Questions on Ray Optics Total Internal Reflection',
    subject: 'Physics',
    chapter: 'Ray Optics & Optical Instruments',
    status: 'completed',
    priority: 'medium',
    dueDate: 'Completed Oct 28'
  }
];

export const PRE_FILLED_DOUBTS = [
  {
    label: "Newton's Second Law & Friction",
    prompt: "A block of mass 2 kg rests on a rough horizontal surface with coefficient of friction μ = 0.2. A force of 10 N is applied. How do I calculate the acceleration and avoid common sign errors?"
  },
  {
    label: "Cell Division & Meiosis I",
    prompt: "In which sub-stage of Prophase I does crossing over occur, and which enzyme facilitates the recombination process?"
  },
  {
    label: "SN1 vs SN2 Mechanisms",
    prompt: "How does solvent polarity and substrate hindrance determine whether a haloalkane undergoes SN1 or SN2 substitution?"
  },
  {
    label: "Carnot Engine & Efficiency",
    prompt: "A Carnot engine operates between 27°C and 327°C. What is its theoretical maximum efficiency, and how do I convert Celsius to Kelvin reliably?"
  },
  {
    label: "Hardy-Weinberg Principle",
    prompt: "If 16% of an isolated population suffers from a recessive genetic disorder, what is the frequency of heterozygous carriers?"
  }
];

export const PREBUILT_AI_RESPONSES: Record<string, { concept: string; solutionSteps: string[]; formulas: string[]; proTip: string }> = {
  default: {
    concept: "Fundamental NEET Core Mechanism & NCERT Mapping",
    solutionSteps: [
      "Step 1: Identify given physical/chemical variables and convert all units into standard SI units.",
      "Step 2: Draw the free-body diagram (FBD) or write the stoichiometric/biochemical sequence.",
      "Step 3: Apply the governing NCERT theorem and eliminate irrelevant answer choices first.",
      "Step 4: Check boundary conditions (signs, directions, and extreme limits)."
    ],
    formulas: [
      "Governing Equation: Net Cause = Resistance × Flow",
      "NCERT Golden Rule: Always verify if question asks for INCORRECT or CORRECT statement!"
    ],
    proTip: "In NEET exams, over 40% of negative marks occur due to misreading units or failing to notice negative prefixes."
  },
  friction: {
    concept: "Static vs Kinetic Friction in Equilibrium and Accelerated Systems",
    solutionSteps: [
      "Step 1: Calculate limiting static friction: f_max = μ_s × N = μ_s × (m × g). For 2 kg, f_max = 0.2 × 2 × 10 = 4 N.",
      "Step 2: Compare applied force F = 10 N with f_max (4 N). Since F > f_max, the block moves and kinetic friction opposes motion.",
      "Step 3: Apply Newton's second law: F_net = F_applied - f_friction = 10 N - 4 N = 6 N.",
      "Step 4: Acceleration a = F_net / m = 6 / 2 = 3 m/s²."
    ],
    formulas: [
      "f_limit = μ × m × g",
      "F_net = F_applied - f_k = m × a",
      "a = (F - μmg) / m"
    ],
    proTip: "Never calculate a = F/m directly before checking if the applied force actually exceeds static friction!"
  },
  meiosis: {
    concept: "Pachytene Sub-Stage and Crossing Over in Meiosis I",
    solutionSteps: [
      "Step 1: Prophase I of Meiosis I consists of 5 stages: Leptotene, Zygotene, Pachytene, Diplotene, and Diakinesis.",
      "Step 2: During Pachytene, four chromatids of each bivalent chromosome become distinct as tetrads.",
      "Step 3: Crossing over takes place between non-sister chromatids of homologous chromosomes.",
      "Step 4: The enzyme mediating crossing over is 'Recombinase' (an enzyme complex)."
    ],
    formulas: [
      "Order Mnemonic: Lazy Zebras Play During Day (Leptotene, Zygotene, Pachytene, Diplotene, Diakinesis)",
      "Key Enzyme: Recombinase (acts in Pachytene)"
    ],
    proTip: "Chiasmata become visible in Diplotene (dissolution of synaptonemal complex), NOT in Pachytene!"
  },
  sn1_sn2: {
    concept: "Nucleophilic Substitution Kinetics and Stereochemistry",
    solutionSteps: [
      "Step 1: Substrate Hindrance: SN2 favors 1° > 2° > 3° (steric ease of backside attack). SN1 favors 3° > 2° > 1° (carbocation stability).",
      "Step 2: Nucleophile Strength: SN2 requires strong nucleophile (e.g. OH⁻, RO⁻, CN⁻). SN1 works with weak nucleophiles (H₂O, EtOH).",
      "Step 3: Solvent: Polar Aprotic (DMSO, DMF, Acetone) accelerates SN2. Polar Protic (H₂O, MeOH) stabilizes carbocation for SN1.",
      "Step 4: Stereochemistry: SN2 leads to complete Walden Inversion. SN1 leads to Racemization with slight inversion retention."
    ],
    formulas: [
      "SN2 Rate = k[Substrate][Nucleophile] (Bimolecular, single step)",
      "SN1 Rate = k[Substrate] (Unimolecular, carbocation intermediate)"
    ],
    proTip: "Tertiary halides NEVER undergo SN2 due to severe steric crowding of the three methyl/alkyl groups."
  },
  carnot: {
    concept: "Carnot Thermal Efficiency & Absolute Thermodynamic Scale",
    solutionSteps: [
      "Step 1: Always convert Celsius to Kelvin: T_cold = 27 + 273 = 300 K; T_hot = 327 + 273 = 600 K.",
      "Step 2: Formula for Carnot engine efficiency: η = 1 - (T_cold / T_hot).",
      "Step 3: Substitute Kelvin values: η = 1 - (300 / 600) = 1 - 0.5 = 0.5 or 50%.",
      "Step 4: Output work W = η × Q_hot; Heat rejected Q_cold = (1 - η) × Q_hot."
    ],
    formulas: [
      "η = 1 - (T₂ / T₁)",
      "W / Q₁ = 1 - T₂ / T₁",
      "T(K) = T(°C) + 273.15"
    ],
    proTip: "Substituting temperatures in Celsius (e.g. 1 - 27/327) is the #1 reason students lose 5 marks on this classic question."
  },
  hardy: {
    concept: "Hardy-Weinberg Equilibrium Genotype Frequency Calculation",
    solutionSteps: [
      "Step 1: Let p = dominant allele frequency (A) and q = recessive allele frequency (a).",
      "Step 2: Given q² (recessive phenotype) = 16% = 0.16. Therefore, q = √0.16 = 0.4.",
      "Step 3: Since p + q = 1, p = 1 - 0.4 = 0.6.",
      "Step 4: Heterozygous carriers (Aa) frequency = 2pq = 2 × 0.6 × 0.4 = 0.48 or 48%."
    ],
    formulas: [
      "Allele Frequency: p + q = 1",
      "Genotype Frequency: p² + 2pq + q² = 1",
      "Carrier Frequency = 2pq"
    ],
    proTip: "Never confuse allele frequency (q) with phenotype/genotype frequency (q²)."
  }
};

export const CHAPTER_NOTES: ChapterNote[] = [
  {
    id: 'note_genetics',
    subject: 'Biology',
    chapter: 'Molecular Basis of Inheritance',
    weightage: 'High-Yield (6-8 Questions in NEET)',
    summary: 'The physical and chemical structure of DNA, semi-conservative replication by Meselson-Stahl, RNA transcription, genetic code universality, and lac operon regulation.',
    keyFormulas: [
      { name: "Chargaff's Rule", formula: "A = T, G = C, (A + T) / (G + C) ≠ 1 (varies per species)", note: "Applicable only to double-stranded DNA" },
      { name: "DNA Pitch", formula: "3.4 nm per turn with 10 bp, distance between bp = 0.34 nm", note: "B-DNA geometry in standard physiological state" }
    ],
    highYieldPoints: [
      "DNA replication is semi-conservative, semi-discontinuous (leading continuous, lagging Okazaki fragments).",
      "RNA Polymerase in eukaryotes: Pol I (rRNA except 5S), Pol II (mRNA precursor hnRNA), Pol III (tRNA, 5S rRNA, snRNA).",
      "Lac Operon: Inducer is Allolactose/Lactose; Repressor protein binds to Operator; gene z encodes β-galactosidase, y encodes permease, a encodes transacetylase."
    ]
  },
  {
    id: 'note_mechanics',
    subject: 'Physics',
    chapter: 'Laws of Motion & Friction',
    weightage: 'Core Mechanics (3-4 Questions in NEET)',
    summary: 'Newtonian mechanics, momentum conservation, variable mass systems (rockets), static and kinetic friction thresholds, circular banking of tracks, and connected block systems.',
    keyFormulas: [
      { name: "Maximum Banking Speed", formula: "v_max = √[ r·g · (μ + tanθ) / (1 - μ·tanθ) ]", note: "With friction on curved road" },
      { name: "Connected Blocks Tension", formula: "a = (m₂ - m₁)g / (m₁ + m₂), T = 2·m₁·m₂·g / (m₁ + m₂)", note: "Ideal massless pulley and string" }
    ],
    highYieldPoints: [
      "Static friction is self-adjusting from 0 up to limiting friction (μ_s · N). Kinetic friction remains nearly constant.",
      "In non-inertial frames, pseudo force = -m · a_frame, applied through center of mass.",
      "Rocket propulsion: Thrust F = v_rel · (-dm/dt); Acceleration a = (v_rel / m) · (-dm/dt) - g."
    ]
  },
  {
    id: 'note_chemical_bonding',
    subject: 'Chemistry',
    chapter: 'Chemical Bonding & Molecular Structure',
    weightage: 'Essential Foundation (4-5 Questions in NEET)',
    summary: 'VSEPR theory, hybridization (sp to sp3d2), Molecular Orbital Theory (MOT) for homonuclear diatomics, hydrogen bonding types, and resonance dipole moments.',
    keyFormulas: [
      { name: "Bond Order (MOT)", formula: "B.O. = ½ · (N_b - N_a)", note: "Fractional bond orders denote paramagnetic or resonance stability" },
      { name: "Steric Number", formula: "S.N. = ½ · [ V + M - C + A ]", note: "V = valence e⁻ on central atom, M = monovalent atoms" }
    ],
    highYieldPoints: [
      "MOT energy order for B2, C2, N2: σ1s < σ*1s < σ2s < σ*2s < (π2px = π2py) < σ2pz.",
      "For O2, F2: σ2pz is lower in energy than π2px = π2py.",
      "Species with odd electrons or unpaired electrons in MO are Paramagnetic (e.g. O2 has 2 unpaired electrons in π*2px, π*2py)."
    ]
  }
];

export const INITIAL_PAST_SUBMISSIONS: TestSubmission[] = [
  {
    id: 'sub_001',
    testId: 'test_aiims_elite_02',
    title: 'AIIMS New Delhi Rankers Super 50',
    date: '2026-10-28T14:30:00.000Z',
    score: 178,
    maxScore: 200,
    accuracy: 89.0,
    timeSpentSeconds: 2840,
    correctCount: 45,
    incorrectCount: 3,
    unattemptedCount: 2,
    subjectScores: {
      physics: { score: 54, max: 60, correct: 14, incorrect: 1 },
      chemistry: { score: 52, max: 60, correct: 13, incorrect: 1 },
      biology: { score: 72, max: 80, correct: 18, incorrect: 1 }
    },
    answers: {},
    questions: []
  },
  {
    id: 'sub_002',
    testId: 'test_chemistry_organic',
    title: 'Chemistry Sprint: Organic Reaction Mechanisms & Bonding',
    date: '2026-10-26T10:15:00.000Z',
    score: 162,
    maxScore: 180,
    accuracy: 90.0,
    timeSpentSeconds: 2200,
    correctCount: 41,
    incorrectCount: 3,
    unattemptedCount: 1,
    subjectScores: {
      physics: { score: 0, max: 0, correct: 0, incorrect: 0 },
      chemistry: { score: 162, max: 180, correct: 41, incorrect: 3 },
      biology: { score: 0, max: 0, correct: 0, incorrect: 0 }
    },
    answers: {},
    questions: []
  }
];

export const INITIAL_MISTAKES: MistakeRecord[] = [
  {
    id: 'mistake_001',
    questionId: ALL_QUESTIONS[0]?.id ?? 0,
    question: ALL_QUESTIONS[0] ?? {
      id: 0,
      subjectCode: 'ph',
      subjectName: 'Physics',
      chapter: 'Laws of Motion',
      topic: 'Friction',
      question: 'A block of mass 2 kg rests on a rough horizontal surface (μ = 0.2). A horizontal force of 10 N is applied on it. The acceleration of the block is:',
      options: ['5 m/s²', '4 m/s²', '3 m/s²', '1 m/s²'],
      correctAnswer: 2,
      explanation: 'Friction f = μmg = 0.2 × 2 × 10 = 4 N|Net force = 10 − 4 = 6 N|a = F/m = 6 / 2 = 3 m/s²',
      commonMistake: 'Students often forget to subtract friction from the applied force and calculate 10/2 = 5 m/s².'
    },
    userAnswer: 0,
    correctAnswer: 2,
    date: '2026-10-29T16:20:00.000Z',
    isMastered: false,
    notes: 'Remember to deduct opposing friction before applying F=ma.'
  },
  {
    id: 'mistake_002',
    questionId: ALL_QUESTIONS[101]?.id ?? 101,
    question: ALL_QUESTIONS[101] ?? {
      id: 101,
      subjectCode: 'ch',
      subjectName: 'Chemistry',
      chapter: 'Chemical Bonding & Molecular Structure',
      topic: 'Molecular Orbital Theory',
      question: 'Which of the following diatomic species has a bond order of 2.5 and is paramagnetic?',
      options: ['O₂', 'O₂⁺', 'N₂⁺', 'C₂'],
      correctAnswer: 1,
      explanation: 'O₂ has 16 e⁻ (B.O = 2). O₂⁺ has 15 e⁻ (B.O = 2.5, 1 unpaired e⁻ in π*2p orbital, paramagnetic).',
      commonMistake: 'Confusing O₂⁺ with N₂ which is diamagnetic.'
    },
    userAnswer: 0,
    correctAnswer: 1,
    date: '2026-10-28T11:45:00.000Z',
    isMastered: false,
    notes: 'Review MOT configuration for O2+ vs N2+.'
  }
];
