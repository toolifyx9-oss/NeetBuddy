import RAW_QUESTIONS from './data/questionsData.json';

const LGO = '<img class="lm" src="/assets/aistudio/file_00000000078482078d06c74a563d6525_4715f81f.png" alt="NEETBuddy logo" style="object-fit:contain"/>';
const $ = s => document.querySelector(s);
const E = (c, f) => `<div class="ban">${c}<svg viewBox="0 0 600 150" preserveAspectRatio="none"><path fill="#fff" fill-opacity=".16" d="M0 90c120-60 240-60 360 0s180 40 240-20v80H0z"/><path fill="#fff" fill-opacity=".14" d="M0 120c140-50 260-30 380 10s160 20 220-10v30H0z"/></svg></div>`;
const TGT = `<svg class="t" viewBox="0 0 120 120"><circle cx="60" cy="68" r="46" fill="#dff1ff"/><circle cx="60" cy="68" r="34" fill="#fff" stroke="#10b981" stroke-width="8"/><circle cx="60" cy="68" r="16" fill="#10b981"/><path d="M60 68L104 20" stroke="#14a366" stroke-width="5" stroke-linecap="round"/><path d="M98 14l10 2-4 10z" fill="#14a366"/></svg>`;

const SUBJ = [
  ['Physics', '⚛️', '#e6f0ff', 20, '2,500+', 62],
  ['Chemistry', '🧪', '#fff0e4', 20, '2,200+', 40],
  ['Botany', '🌿', '#e8f7e6', 17, '2,000+', 30],
  ['Zoology', '🧬', '#f0e8ff', 18, '2,200+', 50]
];

const NAV = [
  ['home', '🏠', 'Home'],
  ['practice', '🎯', 'Practice'],
  ['tests', '📝', 'Mock Tests'],
  ['perf', '📊', 'Performance'],
  ['ib', '📖', 'Improvement Book'],
  ['notes', '🔖', 'Notes & Bookmarks'],
  ['pyq', '📚', 'PYQs'],
  ['dpp', '🗒️', 'DPP Practice'],
  ['flash', '🃏', 'Flashcards'],
  ['doubt', '💡', 'Doubt Solver', 'AI'],
  ['plan', '📅', 'Study Plan'],
  ['more', '⚙️', 'More']
];

const TABS = [
  ['home', '🏠', 'Home'],
  ['practice', '🎯', 'Practice'],
  ['tests', '📝', 'Tests'],
  ['perf', '📊', 'Performance'],
  ['more', '⋯', 'More']
];

const QT = {
  home: 'Consistency today, MBBS tomorrow.',
  practice: '“Practice makes you permanent. Practise perfectly.”',
  tests: '“Train like it is exam day, so exam day feels like training.”',
  perf: '“What gets measured gets improved.”',
  ib: '“Every mistake is a free lesson. Collect them all.”',
  notes: '“Short notes today, long-term memory tomorrow.”',
  soon: '“Small steps every day lead to big results.”',
  more: '“Pick one thing and do it well today.”',
  flash: '“Revise little, revise often. That is how memory sticks.”',
  pyq: '“Study the past to score in the future.”',
  dpp: '“Small daily wins build big ranks.”',
  doubt: '“No doubt is too small. Ask and understand.”',
  plan: '“A goal without a plan is just a wish.”'
};

const CHD = {
  Physics: [
    ["Physics and Measurement", "Physics, technology and society|SI units and fundamental constants|Dimensions of physical quantities|Dimensional analysis and its applications|Significant figures and errors in measurement|Measuring instruments (vernier callipers, screw gauge)"],
    ["Kinematics", "Frame of reference, distance and displacement|Speed, velocity and acceleration|Equations of motion in a straight line|Motion graphs (x-t, v-t, a-t)|Relative velocity|Projectile motion|Uniform circular motion"],
    ["Laws of Motion", "Newton's three laws of motion|Momentum and impulse|Conservation of linear momentum|Equilibrium of concurrent forces|Static and kinetic friction|Motion on a rough inclined plane|Dynamics of uniform circular motion|Banking of roads"],
    ["Work, Energy and Power", "Work done by constant and variable force|Work-energy theorem|Kinetic and potential energy|Conservative forces and mechanical energy|Power|Elastic and inelastic collisions"],
    ["System of Particles and Rotational Motion", "Centre of mass|Motion of centre of mass and momentum conservation|Torque|Angular momentum and its conservation|Equilibrium of rigid bodies|Moment of inertia and radius of gyration|Parallel and perpendicular axes theorems|Rotational kinematics and dynamics"],
    ["Gravitation", "Universal law of gravitation|Acceleration due to gravity and its variation|Kepler's laws of planetary motion|Gravitational potential energy and potential|Escape velocity|Orbital velocity of a satellite|Geostationary satellites"],
    ["Mechanical Properties of Solids and Fluids", "Elastic behaviour and stress-strain curve|Hooke's law and Young's modulus|Bulk modulus, shear modulus and Poisson's ratio|Pressure and Pascal's law|Buoyancy and Archimedes' principle|Viscosity and Stokes' law|Streamline and turbulent flow|Bernoulli's theorem and its applications|Surface tension, capillarity and angle of contact"],
    ["Thermodynamics", "Thermal equilibrium and zeroth law|Temperature, thermal expansion and calorimetry|Change of state and latent heat|Heat transfer: conduction, convection, radiation|Newton's law of cooling and Stefan's law|First law of thermodynamics|Isothermal and adiabatic processes|Second law, heat engines and Carnot engine"],
    ["Kinetic Theory of Gases", "Equation of state of a perfect gas|Work done in compressing a gas|Kinetic theory of gases: assumptions and pressure|Kinetic interpretation of temperature|RMS speed of gas molecules|Degrees of freedom and law of equipartition of energy|Specific heat capacities of gases|Mean free path and Avogadro's number"],
    ["Oscillations and Waves", "Periodic motion, period and frequency|Simple harmonic motion|Energy in SHM|Spring and simple pendulum|Free, forced and damped oscillations, resonance|Wave motion: longitudinal and transverse|Speed of a wave and superposition|Standing waves in strings and organ pipes|Beats|Doppler effect"],
    ["Electrostatics", "Electric charges and conservation of charge|Coulomb's law|Electric field and field lines|Electric dipole|Electric flux and Gauss's law|Electric potential and equipotential surfaces|Conductors, insulators and dielectrics|Capacitors: combinations and energy stored"],
    ["Current Electricity", "Electric current and drift velocity|Ohm's law, resistance and resistivity|Temperature dependence of resistance|Electric power and energy|Series and parallel combinations of resistors|EMF and internal resistance of cells|Kirchhoff's laws|Wheatstone bridge and metre bridge|Potentiometer"],
    ["Magnetic Effects of Current and Magnetism", "Biot-Savart law|Ampere's law|Force on a moving charge and cyclotron|Force on a current-carrying conductor|Torque on a current loop and galvanometer|Bar magnet and magnetic field lines|Earth's magnetism|Para-, dia- and ferromagnetic substances"],
    ["Electromagnetic Induction and Alternating Currents", "Faraday's law and Lenz's law|Induced emf and current|Eddy currents|Self and mutual inductance|AC voltage, peak and rms values|Reactance and impedance|LCR series circuit and resonance|Power in AC circuits|AC generator and transformer"],
    ["Electromagnetic Waves", "Displacement current|Characteristics of electromagnetic waves|Transverse nature of EM waves|Electromagnetic spectrum|Applications of EM waves"],
    ["Optics", "Reflection of light and spherical mirrors|Refraction and total internal reflection|Refraction at spherical surfaces and thin lenses|Lens maker's formula, magnification and power|Prism and dispersion of light|Scattering of light|Optical instruments: microscope and telescope|Huygens' principle and wave optics|Interference and Young's double slit experiment|Diffraction by a single slit|Polarisation and Brewster's law"],
    ["Dual Nature of Matter and Radiation", "Photoelectric effect|Hertz and Lenard's observations|Einstein's photoelectric equation|Particle nature of light|Matter waves and de Broglie relation|Davisson-Germer experiment"],
    ["Atoms and Nuclei", "Rutherford's model|Bohr model of the hydrogen atom|Energy levels and spectral series|Composition and size of the nucleus|Mass defect and binding energy|Nuclear fission and fusion|Radioactivity: alpha, beta and gamma|Radioactive decay law and half-life"],
    ["Electronic Devices", "Energy bands in solids|Conductors, insulators and semiconductors|Intrinsic and extrinsic semiconductors|p-n junction diode and its characteristics|Diode as a rectifier|LED, photodiode, solar cell and Zener diode|Logic gates (OR, AND, NOT, NAND, NOR)"],
    ["Experimental Skills", "Vernier callipers and screw gauge|Simple pendulum|Young's modulus of a wire|Surface tension by capillary rise|Coefficient of viscosity|Specific heat by method of mixtures|Resistivity using metre bridge|Focal length of mirrors and lenses|Characteristics of a p-n junction diode"]
  ],
  Chemistry: [
    ["Some Basic Concepts in Chemistry", "Matter and its nature|Dalton's atomic theory|Laws of chemical combination|Atomic and molecular masses|Mole concept and molar mass|Percentage composition and empirical formula|Stoichiometry and calculations"],
    ["Atomic Structure", "Electromagnetic radiation and photoelectric effect|Hydrogen spectrum and Bohr model|Dual nature of matter and de Broglie relation|Heisenberg uncertainty principle|Quantum mechanical model and quantum numbers|Shapes of s, p and d orbitals|Aufbau, Pauli and Hund's rules|Electronic configurations"],
    ["Chemical Bonding and Molecular Structure", "Kossel-Lewis approach and octet rule|Ionic bond and lattice enthalpy|Covalent bond parameters|VSEPR theory and molecular shapes|Valence bond theory and hybridisation|Resonance|Molecular orbital theory|Hydrogen bonding"],
    ["Chemical Thermodynamics", "System, surroundings and state functions|First law of thermodynamics|Enthalpy and heat capacity|Hess's law of constant heat summation|Spontaneity and entropy|Second law of thermodynamics|Gibbs energy and equilibrium"],
    ["Solutions", "Concentration terms (molarity, molality, mole fraction)|Solubility of gases and solids|Raoult's law|Ideal and non-ideal solutions|Colligative properties|Van't Hoff factor|Abnormal molar masses"],
    ["Equilibrium", "Equilibrium in physical and chemical processes|Law of mass action and Kc, Kp|Le Chatelier's principle|Ionic equilibrium and acids-bases|pH scale and ionisation of water|Buffer solutions|Solubility product and common ion effect|Hydrolysis of salts"],
    ["Redox Reactions and Electrochemistry", "Oxidation number and redox reactions|Balancing redox reactions|Electrochemical cells and electrode potential|Nernst equation|Conductance and Kohlrausch's law|Electrolysis and Faraday's laws|Batteries and corrosion"],
    ["Chemical Kinetics", "Rate of reaction and rate law|Order and molecularity|Integrated rate equations|Half-life of a reaction|Arrhenius equation and activation energy|Collision theory"],
    ["Classification of Elements and Periodicity in Properties", "Modern periodic law and the periodic table|Electronic configuration and blocks|Atomic and ionic radii|Ionisation enthalpy|Electron gain enthalpy|Electronegativity|Periodic trends in valence and oxidation states"],
    ["p-Block Elements", "General trends in groups 13 to 18|Group 13: boron and aluminium compounds|Group 14: carbon and silicon|Group 15: nitrogen and phosphorus compounds|Group 16: oxygen and sulphur compounds|Group 17: halogens and interhalogen compounds|Group 18: noble gases"],
    ["d- and f-Block Elements", "Electronic configuration of transition elements|General properties and oxidation states|Magnetic, catalytic properties and colour|Alloys and interstitial compounds|Potassium dichromate and potassium permanganate|Lanthanoids and lanthanoid contraction|Actinoids"],
    ["Coordination Compounds", "Werner's theory|Ligands, coordination number and nomenclature|Isomerism in coordination compounds|Valence bond theory|Crystal field theory|Colour and magnetic properties|Importance and applications"],
    ["Purification and Characterisation of Organic Compounds", "Crystallisation, sublimation and distillation|Chromatography|Qualitative analysis (detection of N, S, halogens)|Quantitative analysis|Dumas and Kjeldahl methods|Carius method"],
    ["Some Basic Principles of Organic Chemistry", "Tetravalency of carbon and hybridisation|Classification and IUPAC nomenclature|Isomerism: structural and stereoisomerism|Inductive, resonance and hyperconjugation effects|Electrophiles and nucleophiles|Reaction intermediates|Types of organic reactions"],
    ["Hydrocarbons", "Alkanes: preparation and properties|Conformations of ethane|Alkenes: preparation and reactions|Markovnikov's rule and peroxide effect|Alkynes: preparation and reactions|Aromatic hydrocarbons and benzene|Electrophilic substitution reactions"],
    ["Organic Compounds Containing Halogens", "Haloalkanes: nomenclature and preparation|Nature of C-X bond and properties|Nucleophilic substitution (SN1 and SN2)|Haloarenes and their reactions|Uses and environmental effects"],
    ["Organic Compounds Containing Oxygen", "Alcohols: preparation and properties|Phenols: acidic nature and reactions|Ethers|Aldehydes and ketones: preparation|Nucleophilic addition reactions|Aldol and Cannizzaro reactions|Carboxylic acids and their derivatives"],
    ["Organic Compounds Containing Nitrogen", "Amines: classification and nomenclature|Preparation of amines|Properties and basic character|Identification of primary, secondary and tertiary amines|Diazonium salts and their reactions"],
    ["Biomolecules", "Carbohydrates: classification and glucose|Disaccharides and polysaccharides|Amino acids and peptide bond|Proteins: structure and denaturation|Enzymes|Vitamins|Nucleic acids: DNA and RNA"],
    ["Principles Related to Practical Chemistry", "Detection of extra elements in organic compounds|Detection of functional groups|Preparation of Mohr's salt and potash alum|Titrimetric analysis (acid-base)|Salt analysis: cations and anions"]
  ],
  Botany: [
    ["The Living World", "What is living|Biodiversity|Need for classification|Taxonomy and systematics|Taxonomic categories and hierarchy|Binomial nomenclature|Tools for study of taxonomy"],
    ["Biological Classification", "Five kingdom classification|Kingdom Monera|Kingdom Protista|Kingdom Fungi|Lichens|Viruses and viroids"],
    ["Plant Kingdom", "Algae|Bryophytes|Pteridophytes|Gymnosperms|Angiosperms|Plant life cycles and alternation of generations"],
    ["Morphology of Flowering Plants", "Root and its modifications|Stem and its modifications|Leaf: venation and phyllotaxy|Inflorescence|Flower structure|Fruit and seed|Description of Fabaceae, Solanaceae and Liliaceae"],
    ["Anatomy of Flowering Plants", "Meristematic and permanent tissues|Tissue systems|Anatomy of dicot and monocot root|Anatomy of dicot and monocot stem|Anatomy of leaf|Secondary growth"],
    ["Cell: The Unit of Life", "Cell theory|Prokaryotic and eukaryotic cells|Cell envelope and cell membrane|Cell wall|Endomembrane system|Mitochondria, plastids and ribosomes|Cytoskeleton, cilia and flagella|Nucleus and chromosomes"],
    ["Cell Cycle and Cell Division", "Cell cycle phases|Mitosis|Meiosis|Significance of mitosis and meiosis"],
    ["Transport in Plants", "Diffusion, osmosis and plasmolysis|Water potential|Facilitated diffusion and active transport|Absorption of water: apoplast and symplast|Root pressure and transpiration pull|Transpiration and stomatal movement|Phloem transport and pressure flow"],
    ["Mineral Nutrition", "Essential mineral elements|Deficiency symptoms|Mineral toxicity|Nitrogen cycle|Biological nitrogen fixation|Nitrogen metabolism"],
    ["Photosynthesis in Higher Plants", "Site and pigments|Light reaction|Cyclic and non-cyclic photophosphorylation|Chemiosmotic hypothesis|Calvin cycle (C3 pathway)|C4 pathway|Photorespiration|Factors affecting photosynthesis"],
    ["Respiration in Plants", "Cellular respiration overview|Glycolysis|Fermentation|TCA cycle|Electron transport system and oxidative phosphorylation|Amphibolic pathway|Respiratory quotient"],
    ["Plant Growth and Development", "Growth phases and rates|Conditions for growth|Differentiation, dedifferentiation and redifferentiation|Auxins, gibberellins and cytokinins|Ethylene and abscisic acid|Seed dormancy and germination|Photoperiodism and vernalisation"],
    ["Sexual Reproduction in Flowering Plants", "Stamen and pistil|Microsporogenesis and pollen grain|Megasporogenesis and embryo sac|Pollination types and agents|Double fertilisation|Post-fertilisation: seed and fruit|Apomixis and polyembryony"],
    ["Organisms and Populations", "Organism and its environment|Major abiotic factors|Adaptations|Population attributes|Population growth models|Population interactions"],
    ["Ecosystem", "Structure and function of ecosystem|Productivity|Decomposition|Energy flow|Ecological pyramids|Ecological succession|Nutrient cycling|Ecosystem services"],
    ["Biodiversity and Conservation", "Biodiversity patterns|Species-area relationship|Loss of biodiversity|In situ and ex situ conservation|Hotspots, sacred groves and Red Data Book"],
    ["Microbes in Human Welfare", "Microbes in household products|Microbes in industrial products|Sewage treatment|Biogas production|Biocontrol agents|Biofertilisers"]
  ],
  Zoology: [
    ["Animal Kingdom", "Basis of classification|Porifera|Cnidaria and Ctenophora|Platyhelminthes and Aschelminthes|Annelida and Arthropoda|Mollusca and Echinodermata|Hemichordata and Chordata"],
    ["Structural Organisation in Animals", "Animal tissues|Epithelial and connective tissue|Muscular and neural tissue|Cockroach: morphology and anatomy|Frog: morphology and anatomy"],
    ["Biomolecules", "Chemical analysis of living tissue|Amino acids and proteins|Carbohydrates|Lipids|Nucleic acids|Enzymes: properties and classification|Enzyme action and inhibition"],
    ["Digestion and Absorption", "Alimentary canal and digestive glands|Digestion of food|Absorption of digested products|Egestion|Disorders: jaundice, vomiting, diarrhoea, indigestion"],
    ["Breathing and Exchange of Gases", "Respiratory organs|Mechanism of breathing|Exchange of gases|Transport of gases|Regulation of respiration|Disorders: asthma, emphysema, occupational disorders"],
    ["Body Fluids and Circulation", "Blood: plasma and formed elements|Blood groups and coagulation|Lymph|Human circulatory system and heart|Cardiac cycle and ECG|Double circulation|Regulation of cardiac activity|Disorders: hypertension, CAD, heart failure"],
    ["Excretory Products and their Elimination", "Modes of excretion|Human excretory system|Urine formation|Counter-current mechanism|Regulation of kidney function|Disorders: uremia, kidney stones, dialysis"],
    ["Locomotion and Movement", "Types of movement|Skeletal muscle and contractile proteins|Sliding filament theory|Skeletal system|Joints|Disorders: myasthenia gravis, tetany, arthritis, osteoporosis, gout"],
    ["Neural Control and Coordination", "Neuron and nerve impulse|Generation and conduction of nerve impulse|Synapse and transmission|Central nervous system|Reflex action and reflex arc|Sensory reception: eye|Ear and mechanism of hearing"],
    ["Chemical Coordination and Integration", "Endocrine glands and hormones|Hypothalamus and pituitary|Thyroid, parathyroid and thymus|Adrenal gland and pancreas|Gonads|Mechanism of hormone action|Hormonal disorders"],
    ["Human Reproduction", "Male reproductive system|Female reproductive system|Gametogenesis|Menstrual cycle|Fertilisation and implantation|Pregnancy and embryonic development|Parturition and lactation"],
    ["Reproductive Health", "Reproductive health problems|Population explosion and birth control|Contraceptive methods|Medical termination of pregnancy|Sexually transmitted infections|Infertility and ART"],
    ["Principles of Inheritance and Variation", "Mendel's laws of inheritance|Incomplete dominance and codominance|Multiple alleles and blood groups|Pleiotropy and polygenic inheritance|Chromosomal theory and linkage|Sex determination|Mutation|Pedigree analysis|Genetic disorders"],
    ["Molecular Basis of Inheritance", "DNA as the genetic material|Structure of DNA and RNA|DNA packaging|DNA replication|Transcription|Genetic code|Translation|Gene regulation: lac operon|Human Genome Project|DNA fingerprinting"],
    ["Evolution", "Origin of life|Evidences of evolution|Darwin's theory and natural selection|Modern synthetic theory|Mutation, gene flow and genetic drift|Hardy-Weinberg principle|Adaptive radiation|Human evolution"],
    ["Human Health and Disease", "Common diseases and pathogens|Malaria, filariasis, ascariasis, amoebiasis|Typhoid, pneumonia, common cold, ringworm|Innate and acquired immunity|Vaccines and immunisation|Allergies and autoimmunity|Cancer|HIV and AIDS|Drug and alcohol abuse"],
    ["Biotechnology: Principles and Processes", "Genetic engineering|Restriction enzymes and vectors|Recombinant DNA technology steps|PCR|Bioreactors and downstream processing"],
    ["Biotechnology and its Applications", "Applications in agriculture: Bt crops|Applications in medicine|Gene therapy|Transgenic animals|Biosafety, patents and bioethics"]
  ]
};

const hs = t => [...t].reduce((a, c) => a + c.charCodeAt(0), 0);
const qn = t => 20 + hs(t) % 7 * 5;
const pg = t => hs(t) % 4 === 0 ? 0 : hs(t) % 97;
const tcount = s => CHD[s].reduce((a, c) => a + c[1].split('|').length, 0);

const LS = (k, d) => {
  try {
    const v = JSON.parse(localStorage[k]);
    return v == null ? d : v;
  } catch (e) {
    return d;
  }
};

// Global Store State
let S = {
  v: 'auth',
  am: 'Login',
  ge: 0,
  nt: 'My Notes',
  nf: 'All',
  nq: '',
  tab: 'All',
  goal: 'Questions',
  ibt: 'All',
  pt: 'Overview',
  cnt: 20,
  diff: 'Mixed',
  tt: null,
  s: 'Physics',
  c: 'Kinematics',
  tp: 'Units and Dimensions',
  testSubTab: 'Physics',
  testFilter: 'All',
  expandedChapters: {},
  selSubjects: ['Physics'],
  selChapters: ['Kinematics', 'Laws of Motion'],
  selTopics: ['Frame of reference, distance and displacement', 'Speed, velocity and acceleration'],
  custCount: 30,
  custDuration: 45,
  custDiff: 'NTA Mixed',
  activeTestIdx: 0,
  analysisFilter: 'All'
};

let Q = null;
let TM = null;
let USERS = LS('nbUsers', []);
let CU = LS('nbCU', null);
let dm = false;
try {
  dm = localStorage.nbD ? localStorage.nbD === '1' : window.matchMedia('(prefers-color-scheme:dark)').matches;
} catch (e) {}

let IB = LS('nbIB', [
  ['The dimensional formula of force is:', 'Physics', 'Kinematics', 'Units and Dimensions', 'Incorrect', '28 Oct 2026'],
  ['Which of the following is an aromatic compound?', 'Chemistry', 'Hydrocarbons', 'Aromatic Hydrocarbons', 'Marked', '27 Oct 2026'],
  ['The powerhouse of the cell is:', 'Botany', 'Cell: The Unit of Life', 'Mitochondria & Ribosomes', 'Reattempt', '26 Oct 2026']
]);

let G = LS('nbG', [
  { t: 'Practice 100 Questions', d: 1, go: 'practice' },
  { t: 'Revise 2 Chapters', d: 0, go: 'notes' },
  { t: 'Give 1 Mock Test', d: 0, go: 'tests' }
]);

let NT = LS('nbN', [
  ['Laws of Motion – Short Notes', 'Physics', 'Laws of Motion', '28 Oct 2026', 'Newton’s three laws, friction types and free-body diagrams.'],
  ['Aromatic Compounds – Reactions', 'Chemistry', 'Hydrocarbons', '27 Oct 2026', 'Electrophilic substitution: nitration, halogenation, Friedel-Crafts.'],
  ['Cell – Unit of Life (Revision)', 'Botany', 'Cell: The Unit of Life', '26 Oct 2026', 'Organelles and their specific metabolic functions.'],
  ['Human Physiology – Quick Revision', 'Zoology', 'Body Fluids and Circulation', '25 Oct 2026', 'Cardiac cycle, ECG segments, and circulation summary.']
]);

let BK = LS('nbB', [
  ['Projectile motion में maximum range kab hoti hai?', 'Physics', 'Kinematics'],
  ['Which of the following is an aromatic compound?', 'Chemistry', 'Hydrocarbons']
]);

let PYD = LS('nbPY', {});
let DPPD = LS('nbDPP', {});
let SPL = LS('nbPlan', null);
let FCK = LS('nbFC', {});

// Canonical High-Yield Recent Test Ledger
let TEST_HISTORY = LS('nbTests', [
  {
    id: 'test-3',
    title: 'NEET Ultimate Mock Test 03',
    category: 'Full Syllabus',
    date: '30 Oct 2026',
    duration: '180 Mins',
    timeTaken: '2h 45m',
    qCount: 180,
    totalMarks: 720,
    score: 640,
    accuracy: 89,
    percentile: 99.2,
    correct: 160,
    incorrect: 16,
    unattempted: 4,
    subjectBreakdown: {
      Physics: { score: 152, total: 180, acc: 84, correct: 38, incorrect: 7, unattempted: 0 },
      Chemistry: { score: 160, total: 180, acc: 89, correct: 40, incorrect: 5, unattempted: 0 },
      Botany: { score: 168, total: 180, acc: 93, correct: 42, incorrect: 3, unattempted: 0 },
      Zoology: { score: 160, total: 180, acc: 89, correct: 40, incorrect: 5, unattempted: 0 }
    },
    weakTopics: [
      { name: 'Rotational Motion — Moment of Inertia', subject: 'Physics', lostMarks: 8, incorrect: 2, difficulty: 'Hard' },
      { name: 'Chemical Thermodynamics — Gibbs Free Energy', subject: 'Chemistry', lostMarks: 4, incorrect: 1, difficulty: 'Medium' },
      { name: 'Plant Growth — Photoperiodism & Vernalisation', subject: 'Botany', lostMarks: 4, incorrect: 1, difficulty: 'Medium' }
    ]
  },
  {
    id: 'test-bio-chap',
    title: 'Biology Chapter Test: Cell & Genetics',
    category: 'Chapter-wise',
    date: '26 Oct 2026',
    duration: '45 Mins',
    timeTaken: '38 Mins',
    qCount: 45,
    totalMarks: 180,
    score: 162,
    accuracy: 90,
    percentile: 98.5,
    correct: 41,
    incorrect: 3,
    unattempted: 1,
    subjectBreakdown: {
      Botany: { score: 82, total: 90, acc: 91, correct: 21, incorrect: 1, unattempted: 1 },
      Zoology: { score: 80, total: 90, acc: 89, correct: 20, incorrect: 2, unattempted: 0 }
    },
    weakTopics: [
      { name: 'Cell Cycle — Meiosis Crossing Over', subject: 'Botany', lostMarks: 4, incorrect: 1, difficulty: 'Medium' },
      { name: 'Linkage and Genetic Mapping', subject: 'Zoology', lostMarks: 4, incorrect: 1, difficulty: 'Hard' }
    ]
  },
  {
    id: 'test-2',
    title: 'NEET Ultimate Mock Test 02',
    category: 'Full Syllabus',
    date: '21 Oct 2026',
    duration: '180 Mins',
    timeTaken: '2h 52m',
    qCount: 180,
    totalMarks: 720,
    score: 612,
    accuracy: 85,
    percentile: 97.8,
    correct: 153,
    incorrect: 24,
    unattempted: 3,
    subjectBreakdown: {
      Physics: { score: 142, total: 180, acc: 79, correct: 36, incorrect: 9, unattempted: 0 },
      Chemistry: { score: 154, total: 180, acc: 86, correct: 39, incorrect: 6, unattempted: 0 },
      Botany: { score: 160, total: 180, acc: 89, correct: 40, incorrect: 5, unattempted: 0 },
      Zoology: { score: 156, total: 180, acc: 87, correct: 39, incorrect: 6, unattempted: 0 }
    },
    weakTopics: [
      { name: 'Current Electricity — Potentiometer & Kirchhoff', subject: 'Physics', lostMarks: 8, incorrect: 2, difficulty: 'Hard' },
      { name: 'Ionic Equilibrium — Buffer pH Calculations', subject: 'Chemistry', lostMarks: 8, incorrect: 2, difficulty: 'Hard' }
    ]
  },
  {
    id: 'test-chem-part',
    title: 'Chemistry Part Test: Physical & Inorganic',
    category: 'Part Test',
    date: '16 Oct 2026',
    duration: '45 Mins',
    timeTaken: '42 Mins',
    qCount: 45,
    totalMarks: 180,
    score: 148,
    accuracy: 82,
    percentile: 96.1,
    correct: 37,
    incorrect: 6,
    unattempted: 2,
    subjectBreakdown: {
      Chemistry: { score: 148, total: 180, acc: 82, correct: 37, incorrect: 6, unattempted: 2 }
    },
    weakTopics: [
      { name: 'Electrochemistry — Nernst Equation', subject: 'Chemistry', lostMarks: 8, incorrect: 2, difficulty: 'Hard' }
    ]
  },
  {
    id: 'test-1',
    title: 'NEET Ultimate Mock Test 01',
    category: 'Full Syllabus',
    date: '12 Oct 2026',
    duration: '180 Mins',
    timeTaken: '2h 58m',
    qCount: 180,
    totalMarks: 720,
    score: 560,
    accuracy: 78,
    percentile: 94.0,
    correct: 140,
    incorrect: 32,
    unattempted: 8,
    subjectBreakdown: {
      Physics: { score: 130, total: 180, acc: 72, correct: 33, incorrect: 11, unattempted: 1 },
      Chemistry: { score: 140, total: 180, acc: 78, correct: 35, incorrect: 9, unattempted: 1 },
      Botany: { score: 148, total: 180, acc: 82, correct: 37, incorrect: 7, unattempted: 1 },
      Zoology: { score: 142, total: 180, acc: 79, correct: 35, incorrect: 9, unattempted: 1 }
    },
    weakTopics: [
      { name: 'Optics — Wave Interference & Young Double Slit', subject: 'Physics', lostMarks: 8, incorrect: 2, difficulty: 'Hard' }
    ]
  }
]);

// Question Retriever from 714 questions
function getQuestions({ subject, chapter, topic, topics, count = 20, difficulty = 'Mixed' }) {
  let pool = RAW_QUESTIONS || [];

  if (subject && subject !== 'All') {
    const sLower = subject.toLowerCase();
    pool = pool.filter(q => {
      const qSub = (q.subjectName || '').toLowerCase();
      if (sLower === 'botany' || sLower === 'zoology') {
        return qSub.includes('bio') || qSub.includes(sLower);
      }
      return qSub.includes(sLower);
    });
  }

  if (chapter && chapter !== 'All') {
    const chLower = chapter.toLowerCase();
    const chFiltered = pool.filter(q => (q.chapter || '').toLowerCase().includes(chLower) || chLower.includes((q.chapter || '').toLowerCase()));
    if (chFiltered.length >= 3) pool = chFiltered;
  }

  if (topics && topics.length > 0) {
    const topFiltered = pool.filter(q => topics.some(tp => (q.topic || '').toLowerCase().includes(tp.toLowerCase()) || tp.toLowerCase().includes((q.topic || '').toLowerCase())));
    if (topFiltered.length >= 3) pool = topFiltered;
  } else if (topic && topic !== 'All') {
    const tpLower = topic.toLowerCase();
    const tpFiltered = pool.filter(q => (q.topic || '').toLowerCase().includes(tpLower) || tpLower.includes((q.topic || '').toLowerCase()));
    if (tpFiltered.length >= 2) pool = tpFiltered;
  }

  if (difficulty && difficulty !== 'Mixed' && difficulty !== 'NTA Mixed') {
    const diffFiltered = pool.filter(q => (q.difficulty || '').toLowerCase() === difficulty.toLowerCase());
    if (diffFiltered.length >= 4) pool = diffFiltered;
  }

  if (!pool || pool.length === 0) pool = RAW_QUESTIONS || [];

  const result = [];
  const total = Math.max(1, count);
  for (let i = 0; i < total; i++) {
    const item = pool[i % pool.length];
    result.push({
      id: item.id != null ? item.id : i,
      q: item.question || item.q || 'Question ' + (i + 1),
      o: item.options && item.options.length ? item.options : ['Option A', 'Option B', 'Option C', 'Option D'],
      a: item.correctAnswer != null ? item.correctAnswer : (item.a != null ? item.a : 0),
      exp: item.explanation || item.exp || 'Correct answer based on standard NCERT textbook principles.',
      subject: item.subjectName || subject || 'Physics',
      chapter: item.chapter || chapter || 'General',
      topic: item.topic || topic || 'Core Concepts',
      diff: item.difficulty || 'Medium'
    });
  }
  return result;
}

const sv = () => {
  try {
    localStorage.nbG = JSON.stringify(G);
    localStorage.nbN = JSON.stringify(NT);
    localStorage.nbB = JSON.stringify(BK);
    localStorage.nbIB = JSON.stringify(IB);
    localStorage.nbTests = JSON.stringify(TEST_HISTORY);
  } catch (e) {}
};

const svx = () => {
  try {
    localStorage.nbPY = JSON.stringify(PYD);
    localStorage.nbDPP = JSON.stringify(DPPD);
    localStorage.nbPlan = JSON.stringify(SPL);
    localStorage.nbFC = JSON.stringify(FCK);
  } catch (e) {}
};

const savU = () => {
  try {
    localStorage.nbUsers = JSON.stringify(USERS);
    localStorage.nbCU = JSON.stringify(CU);
  } catch (e) {}
};

const UN = () => CU && CU.name ? CU.name : 'Ayush Kumar';
const UF = () => UN().trim().split(' ')[0];
const UI = () => UN().trim()[0].toUpperCase();
const UY = () => 'NEET ' + (CU ? CU.year : '2026');
const UC = () => CU ? CU.cls : 'Class 12';
const hp = t => {
  let h = 5381;
  for (const c of 'nb|' + t) h = ((h << 5) + h + c.charCodeAt(0)) | 0;
  return (h >>> 0).toString(36);
};

const go = (v, x = {}) => {
  clearInterval(TM);
  Object.assign(S, { v }, x);
  draw();
  window.scrollTo(0, 0);
};

const act = v => ({
  quiz: 'practice',
  setup: 'practice',
  result: 'practice',
  review: 'practice',
  chap: 'practice',
  top: 'practice',
  tl: 'tests',
  ins: 'tests',
  chapter_tests: 'tests',
  part_tests: 'tests',
  custom_builder: 'tests',
  full_syllabus_tests: 'tests',
  perf: 'perf',
  test_analysis: 'perf',
  sp: 'perf',
  weak: 'perf',
  ib: 'ib',
  ibd: 'ib',
  nedit: 'notes'
}[v] || v);

// Standardized Top Hero Card across tabs
const hero = (t, s, icon) => `
  <div class="hero">
    <div style="flex:1;min-width:0;padding-right:16px">
      <h1>${t}</h1>
      <p>${s}</p>
      <div class="qt">💬 ${QT[act(S.v)] || QT.soon}</div>
    </div>
    <div style="width:48px;height:48px;border-radius:14px;background:rgba(16,185,129,0.12);display:grid;place-items:center;flex-shrink:0;">
      ${TGT}
    </div>
  </div>
`;

const bc = (...a) => a.map(([t, v, x]) => v ? `<a onclick="go('${v}',${x || '{}'})">${t}</a>` : t).join(' › ');
const tile = (s, fn) => `
  <button class="tile" style="background:${s[2]}" onclick="${fn}">
    <div class="ti">${s[1]}</div>
    <h3>${s[0]}</h3>
    <small>${s[3]} Chapters • ${s[4]} Qs</small>
    <div class="pr">
      <div class="bar"><i style="width:${s[5]}%"></i></div>
      <b>${s[5]}%</b>
      <span class="ar">→</span>
    </div>
  </button>
`;

const shell = (body, crumb = '') => {
  const activeTab = act(S.v);
  const hideCrumb = ['home', 'practice', 'tests', 'perf', 'more'].includes(S.v);
  const crumbHtml = (!hideCrumb && crumb) ? `<div class="cr">${crumb}</div>` : '';

  return `
    <aside class="sb">
      <div class="lg">${LGO}<span class="lt">NEET<b>Buddy</b></span></div>
      ${NAV.map(n => `
        <button title="${n[2]}" class="ni ${activeTab === n[0] ? 'on' : ''}" onclick="go('${V[n[0]] ? n[0] : 'soon'}',{t:'${n[2]}'})">
          <i>${n[1]}</i>${n[2]}${n[3] ? `<span class="ai">${n[3]}</span>` : ''}
        </button>
      `).join('')}
      <div class="qc">Discipline today.<br>Doctor tomorrow.</div>
    </aside>

    <main class="mn">
      <div class="tp">
        <div class="mb">
          <b class="lg3">${LGO}<span class="lt">NEET<b>Buddy</b></span></b>
        </div>
        <button class="ib tg" aria-label="Toggle dark mode" onclick="tgd()">${dm ? '🌙' : '☀️'}</button>
        <button class="ib" onclick="toast('No new notifications')">🔔<span class="dot"></span></button>
        <div class="us" onclick="go('more')" style="cursor:pointer">
          <div class="av">${UI()}</div>
          <span><b>${UN()}</b><small>${UY()}</small></span>
        </div>
      </div>

      ${crumbHtml}
      ${body}
    </main>

    <nav class="bt">
      ${TABS.map(t => `
        <button class="${activeTab === t[0] ? 'on' : ''}" onclick="go('${V[t[0]] ? t[0] : 'soon'}',{t:'${t[2]}'})">
          <i>${t[1]}</i>${t[2]}
        </button>
      `).join('')}
    </nav>
  `;
};

function tgd() {
  dm = !dm;
  try {
    localStorage.nbD = dm ? '1' : '0';
  } catch (e) {}
  draw();
}

const gd = () => G.filter(g => g.d).length;

const goalCard = () => {
  const n = gd(), t = G.length || 1;
  return `
    <div class="card">
      <h3 style="display:flex;justify-content:space-between">
        🎯 Set Your Today's Goal 
        <button class="btn sm" onclick="S.ge=!S.ge;draw()">${S.ge ? 'Save ✓' : 'Set Goal +'}</button>
      </h3>
      <div style="display:flex;gap:16px;align-items:center;margin-top:8px">
        <div style="flex:1">
          ${G.map((g, i) => S.ge ? `
            <div class="gi">
              <input value="${g.t.replace(/"/g, '&quot;')}" oninput="G[${i}].t=this.value;sv()">
              <button onclick="G.splice(${i},1);sv();draw()">✕</button>
            </div>
          ` : `
            <div class="gi ${g.d ? 'd' : ''}">
              <button class="chk ${g.d ? 'on' : ''}" onclick="G[${i}].d=G[${i}].d?0:1;sv();draw();if(G[${i}].d){if(G.every(x=>x.d)){toast('All goals done! 🎉');confetti()}else toast('Goal completed ✅')}">${g.d ? '✓' : ''}</button>
              <span class="t" style="flex:1">${g.t}</span>
              ${g.d ? '' : `<button class="chip c3" onclick="go('${g.go || 'practice'}')">Go →</button>`}
            </div>
          `).join('')}
          ${S.ge ? `<button class="btn o sm" onclick="G.push({t:'New goal',d:0,go:'practice'});sv();draw()">+ Add goal</button>` : ''}
        </div>
        <div class="ring" style="background:conic-gradient(var(--g2) ${n / t * 360}deg,var(--ln) 0)">
          <span><div>${n}/${G.length}<small>${n == G.length && n ? 'All done 🎉' : 'Completed'}</small></div></span>
        </div>
      </div>
    </div>
  `;
};

const wk = [4.1, 2.5, 4.8, 2.9, 5.9, 4.6, 3.2];

// ==========================================
// VIEWS DEFINITIONS (V)
// ==========================================
const V = {
  // 1. HOME SCREEN
  home: () => {
    const h = new Date().getHours(), gr = h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
    return shell(`
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:8px;margin-bottom:14px">
        <div>
          <h1 style="font-size:28px">Good ${gr}, <span style="color:var(--g2)">${UF()}!</span> 👋</h1>
          <p style="color:var(--mu)">${QT.home}</p>
        </div>
        <b style="color:var(--mu)">📅 ${new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</b>
      </div>

      <div class="hg">
        ${[
          ['⏱️', '4h 30m', 'Study Time', '#e6f0ff'],
          ['❓', '180', 'Questions', '#dcf7e6'],
          ['🎯', '78%', 'Accuracy', '#dcf7e6'],
          ['🔥', '12 days', 'Streak', '#fff0e4']
        ].map(x => `
          <div class="st s3">
            <span class="ic" style="background:${x[3]}">${x[0]}</span>
            <span><small>${x[2]}</small><b>${x[1]}</b></span>
          </div>
        `).join('')}

        <!-- Unified Single Continue Learning & Resume Practice Card -->
        <div class="card s6">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <span class="chip c3" style="font-size:11px">RESUME PRACTICE</span>
            <span class="ar" onclick="go('setup',{s:'Physics',c:'Kinematics',tp:'Units and Dimensions'})" style="cursor:pointer">→</span>
          </div>
          <div style="display:flex;gap:16px;align-items:center">
            <div class="ti" style="width:72px;height:72px;font-size:36px;background:#e6f0ff">⚛️</div>
            <div style="flex:1">
              <small style="color:var(--mu)">Physics • Class 11 Mechanics</small>
              <h3 style="font-size:18px;margin:2px 0 6px">Units and Dimensions</h3>
              <div class="pr">
                <div class="bar"><i style="width:48%"></i></div>
                <b>48%</b>
              </div>
              <small style="color:var(--mu);margin-top:4px;display:block">24 of 50 questions completed</small>
            </div>
          </div>
          <button class="btn sm" style="margin-top:14px;width:100%" onclick="go('setup',{s:'Physics',c:'Kinematics',tp:'Units and Dimensions'})">
            Continue Practice Now →
          </button>
        </div>

        <div class="s6">${goalCard()}</div>

        <div class="card s6">
          <h3>Quick Access</h3>
          <div class="g" style="grid-template-columns:repeat(6,1fr);margin-top:12px;gap:8px">
            ${[
              ['🎯', 'Practice', 'practice', '#ffe5e5'],
              ['📋', 'Mock Tests', 'tests', '#e4f6ec'],
              ['📘', 'PYQs', 'pyq', '#e6f0ff'],
              ['🧱', 'DPP', 'dpp', '#e4f6ec'],
              ['⚡', 'Flashcards', 'flash', '#f0e8ff'],
              ['🔖', 'Notes', 'notes', '#fff4d6']
            ].map(q => `
              <button class="tile" style="background:${q[3]};align-items:center;padding:12px 4px;border-radius:18px;gap:4px" onclick="go('${q[2]}',{t:'${q[1]}'})">
                <span style="font-size:22px">${q[0]}</span>
                <small style="color:var(--ink);font-weight:700;font-size:11px">${q[1]}</small>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="card s6">
          <h3 style="display:flex;justify-content:space-between">Subject Progress <a style="color:var(--g);font-size:13px;cursor:pointer" onclick="go('practice')">View All →</a></h3>
          ${SUBJ.map(s => `
            <div class="pr" style="margin:10px 0;cursor:pointer" onclick="go('chap',{s:'${s[0]}'})">
              <span style="width:96px">${s[1]} ${s[0]}</span>
              <div class="bar"><i style="width:${s[5]}%"></i></div>
              <b style="width:40px">${s[5]}%</b>
              <small style="color:var(--mu);width:90px;text-align:right">${Math.round(s[5] * 20).toLocaleString('en-IN')} / 2,000</small>
            </div>
          `).join('')}
        </div>

        <div class="card s4">
          <h3 style="display:flex;justify-content:space-between">Upcoming Tests <a style="color:var(--g);font-size:13px;cursor:pointer" onclick="go('tests')">View All →</a></h3>
          <div class="k">
            <span><b>NEET Ultimate Test 03</b><br><small style="color:var(--mu)">Full Syllabus • 180 Questions</small></span>
            <button class="btn sm" onclick="go('ins',{tt:'NEET Ultimate Test 03'})">Start</button>
          </div>
          <small style="color:var(--mu)">📅 Sun, 2 Nov 2026 • 🕒 3 Hours</small>
        </div>

        <div class="card s4">
          <h3>Recent Activity</h3>
          ${[
            ['Solved 20 questions (Kinematics)', '2 hours ago'],
            ['Completed Test: Biology Chapter Test', '5 hours ago'],
            ['Bookmarked 3 questions', '8 hours ago'] // Fixed typo "auestions"
          ].map(a => `
            <div class="k">
              <span>✅ ${a[0]}</span>
              <small style="color:var(--mu);white-space:nowrap;margin-left:8px">${a[1]}</small>
            </div>
          `).join('')}
        </div>

        <div class="card s4">
          <h3 style="display:flex;justify-content:space-between">Weekly Study Activity <small style="color:var(--mu);font-weight:500">Avg. 4h 30m / day</small></h3>
          <div class="wk">
            ${wk.map((v, i) => `<div><i style="height:${v * 17}px"></i>${'MTWTFSS'[i]}</div>`).join('')}
          </div>
        </div>
      </div>
    `);
  },

  // 2. PRACTICE HUB
  practice: () => shell(
    hero('Practice Questions', 'Choose a subject • Strictly based on NMC NEET UG 2026 syllabus') +
    `<div class="g g4">${SUBJ.map(s => tile([s[0], s[1], s[2], CHD[s[0]].length, s[4], s[5]], `go('chap',{s:'${s[0]}'})`)).join('')}</div>` +
    E('Practice More.<br>Improve Faster.') +
    `<h2 class="sec">🎯 Set Your Today's Goal</h2>
    <div class="g g3">
      ${['Questions', 'Chapters', 'Time'].map(g => `
        <button class="card" style="text-align:left;font-weight:800;${S.goal == g ? 'box-shadow:inset 0 0 0 2px var(--g),var(--sh);color:var(--g)' : ''}" onclick="S.goal='${g}';draw()">
          ${g} ${S.goal == g ? '✔' : ''}
          <small style="display:block;color:var(--mu);font-weight:500">${g == 'Time' ? 'e.g. 2 hours' : (g == 'Chapters' ? '3 per day' : '50 per day')}</small>
        </button>
      `).join('')}
    </div>`,
    bc(['Practice'])
  ),

  chap: () => {
    const s = SUBJ.find(x => x[0] === S.s) || SUBJ[0];
    const L = CHD[s[0]].filter(c => S.tab === 'All' || (S.tab === 'Completed' ? pg(c[0]) >= 70 : pg(c[0]) > 0 && pg(c[0]) < 70));
    return shell(
      hero(s[0], `${CHD[s[0]].length} Chapters • ${tcount(s[0])} Topics • ${s[4]} Questions`) +
      `<div class="tabs">
        ${['All', 'In Progress', 'Completed'].map(t => `<button class="tb ${S.tab == t ? 'on' : ''}" onclick="S.tab='${t}';draw()">${t}</button>`).join('')}
      </div>` +
      (L.length ? L : []).map(c => {
        const i = CHD[s[0]].indexOf(c);
        return `
          <button class="row" onclick="go('top',{s:'${s[0]}',c:'${c[0].replace(/'/g, "\\'")}'})">
            <span class="n">${String(i + 1).padStart(2, '0')}</span>
            <span class="x">
              <b>${c[0]}</b>
              <small>${c[1].split('|').length} Topics • ${c[1].split('|').reduce((a, t) => a + qn(t), 0)} Questions • ${pg(c[0])}%</small>
              <div class="pr"><div class="bar"><i style="width:${pg(c[0])}%"></i></div></div>
            </span>
            ›
          </button>
        `;
      }).join('') || '<div class="card">No chapters found for this filter.</div>',
      bc(['Practice', 'practice'], [s[0]])
    );
  },

  top: () => {
    const c = CHD[S.s].find(x => x[0] === S.c) || CHD[S.s][0];
    const T = c[1].split('|');
    return shell(
      hero(c[0], `${T.length} Topics • ${T.reduce((a, t) => a + qn(t), 0)} Questions`) +
      T.map((t, i) => `
        <button class="row" onclick="go('setup',{s:'${S.s}',c:'${c[0].replace(/'/g, "\\'")}',tp:'${t.replace(/'/g, "\\'")}'})">
          <span class="n" style="font-size:12px">${CHD[S.s].indexOf(c) + 1}.${i + 1}</span>
          <span class="x"><b>${t}</b><br><small>${qn(t)} Questions</small></span>
          ›
        </button>
      `).join(''),
      bc(['Practice', 'practice'], [S.s, 'chap'], [c[0]])
    );
  },

  setup: () => shell(`
    <div class="card" style="max-width:560px;margin:auto">
      <h2>${S.tp}</h2>
      <p style="color:var(--mu);margin:4px 0 16px">${S.s} • ${S.c || 'Kinematics'}</p>
      <b>No. of Questions</b>
      <div class="tabs" style="margin-top:8px">
        ${[10, 20, 30, 50].map(n => `<button class="tb ${S.cnt == n ? 'on' : ''}" onclick="S.cnt=${n};draw()">${n}</button>`).join('')}
      </div>
      <b>Difficulty Level</b>
      <div class="tabs" style="margin-top:8px">
        ${['Easy', 'Medium', 'Hard', 'Mixed'].map(d => `<button class="tb ${S.diff == d ? 'on' : ''}" onclick="S.diff='${d}';draw()">${d}</button>`).join('')}
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:14px" onclick="start('practice')">
        Start Practice →
      </button>
    </div>
  `, bc(['Practice', 'practice'], [S.c || 'Kinematics', 'top'], [S.tp])),

  // 3. TESTS HUB & COMPLETE ALLEN-STYLE FLOWS
  tests: () => shell(
    hero('Mock Tests Hub', 'All India standard test series, chapter-wise tests and custom test builder.') +
    `<div class="g g4">
      ${[
        ['Chapter-wise Tests', 'Subject • Chapter • Topic Tests', '🧱', '#e8f7e6', 'chapter_tests'],
        ['Part Tests', 'Unit & Syllabus Phase-Wise', '🟠', '#fff0e4', 'part_tests'],
        ['Custom Tests', 'Subject -> Topic Test Builder', '🎛️', '#f0e8ff', 'custom_builder'],
        ['Full Syllabus Tests', 'NTA Pattern 180 Qs • 720 Marks', '📘', '#e6f0ff', 'full_syllabus_tests']
      ].map(t => `
        <button class="tile" style="background:${t[3]}" onclick="go('${t[4]}')">
          <div class="ti">${t[2]}</div>
          <h3>${t[0]}</h3>
          <small>${t[1]}</small>
          <span class="ar">→</span>
        </button>
      `).join('')}
    </div>

    <div class="g g2" style="margin-top:20px">
      <div class="card">
        <h3>Upcoming Scheduled Tests <a style="float:right;font-size:13px;color:var(--g);cursor:pointer" onclick="go('full_syllabus_tests')">View All →</a></h3>
        ${[
          ['NEET Ultimate Test 03', 'Full Syllabus • 180 Qs • 720 Marks', 'Sun, 2 Nov'],
          ['Physics Part Test 02', 'Mechanics & Oscillations • 45 Qs', 'Wed, 5 Nov']
        ].map(t => `
          <div class="k">
            <span><b>${t[0]}</b><br><small style="color:var(--mu)">${t[1]}</small></span>
            <span>${t[2]} <button class="btn sm" onclick="go('ins',{tt:'${t[0]}'})">Start</button></span>
          </div>
        `).join('')}
      </div>

      <div class="card">
        <h3>Your Test Performance <a style="float:right;font-size:13px;color:var(--g);cursor:pointer" onclick="go('perf')">View Analysis →</a></h3>
        <div style="display:flex;gap:20px;align-items:center;margin-top:10px">
          <div class="dn" style="background:conic-gradient(var(--g2) 82%,#e2eee7 0)">
            <span>82%<small>Avg. Score</small></span>
          </div>
          <div style="flex:1">
            <div class="k"><span>Tests Attempted</span><b>${TEST_HISTORY.length}</b></div>
            <div class="k"><span>Best Score</span><b>681 / 720</b></div>
            <div class="k"><span>Average Score</span><b>590 / 720</b></div>
          </div>
        </div>
      </div>
    </div>`,
    bc(['Mock Tests'])
  ),

  // Flow A: Chapter-wise Tests (Allen-Style Flow)
  chapter_tests: () => {
    const sj = S.testSubTab || 'Physics';
    const filt = S.testFilter || 'All';
    const chapters = CHD[sj] || [];

    return shell(
      hero('Chapter-wise Tests', 'Subject • Chapter • Topic Tests • Allen Standard Series') +
      `<div class="tabs" style="margin-top:4px">
        ${['Physics', 'Chemistry', 'Botany', 'Zoology'].map(s => `
          <button class="tb ${sj === s ? 'on' : ''}" onclick="S.testSubTab='${s}';draw()">
            ${s === 'Physics' ? '⚛️' : s === 'Chemistry' ? '🧪' : s === 'Botany' ? '🌿' : '🧬'} ${s}
          </button>
        `).join('')}
      </div>

      <div style="display:flex;gap:8px;margin-bottom:16px">
        ${['All', 'Unattempted', 'Attempted'].map(f => `
          <button class="chip ${filt === f ? 'c3' : 'c6'}" style="cursor:pointer;padding:6px 14px" onclick="S.testFilter='${f}';draw()">${f} Chapters</button>
        `).join('')}
      </div>

      <div style="display:flex;flex-direction:column;gap:12px">
        ${chapters.map((ch, idx) => {
          const isExp = S.expandedChapters[ch[0]];
          const attempted = idx % 3 === 0;
          if (filt === 'Attempted' && !attempted) return '';
          if (filt === 'Unattempted' && attempted) return '';

          return `
            <div class="card" style="padding:16px 20px">
              <div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="toggleChapterExpand('${ch[0].replace(/'/g, "\\'")}')">
                <div>
                  <b style="font-size:16px">${String(idx + 1).padStart(2, '0')}. ${ch[0]}</b>
                  <p style="color:var(--mu);font-size:12px;margin-top:2px">${ch[1].split('|').length} Topics • NCERT Aligned Test Series</p>
                </div>
                <div style="display:flex;align-items:center;gap:10px">
                  <span class="chip ${attempted ? 'c3' : 'c5'}">${attempted ? 'Attempted (Score: 162/180)' : '3 Tests Ready'}</span>
                  <span style="font-size:16px;font-weight:700">${isExp ? '▲' : '▼'}</span>
                </div>
              </div>

              ${isExp ? `
                <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--ln);display:flex;flex-direction:column;gap:10px">
                  <div class="k" style="padding:8px 0;align-items:center">
                    <div>
                      <b>Test 01: NCERT Line-by-Line Foundation</b><br>
                      <small style="color:var(--mu)">45 Questions • 45 Mins • 180 Marks</small>
                    </div>
                    <div>
                      <button class="btn btn-primary sm" onclick="startChapterTest('${sj}', '${ch[0].replace(/'/g, "\\'")}', 'Test 01', 45)">Start Test</button>
                    </div>
                  </div>
                  <div class="k" style="padding:8px 0;align-items:center">
                    <div>
                      <b>Test 02: Allen Level Rank Booster</b><br>
                      <small style="color:var(--mu)">45 Questions • 45 Mins • 180 Marks (Negative Marking -1)</small>
                    </div>
                    <div>
                      <button class="btn btn-primary sm" onclick="startChapterTest('${sj}', '${ch[0].replace(/'/g, "\\'")}', 'Test 02', 45)">Start Test</button>
                    </div>
                  </div>
                  <div class="k" style="padding:8px 0;align-items:center">
                    <div>
                      <b>Test 03: PYQ & Statement Based Questions</b><br>
                      <small style="color:var(--mu)">30 Questions • 30 Mins • 120 Marks</small>
                    </div>
                    <div>
                      <button class="btn btn-primary sm" onclick="startChapterTest('${sj}', '${ch[0].replace(/'/g, "\\'")}', 'Test 03', 30)">Start Test</button>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>`,
      bc(['Mock Tests', 'tests'], ['Chapter-wise Tests'])
    );
  },

  // Flow B: Part Tests (Organized with Exact Chapter Names & Subject Tags)
  part_tests: () => {
    const partTestsList = [
      {
        id: 'PT-01',
        title: 'Part Test 01 - Mechanics, Atomic Structure & Cell Biology',
        phase: 'Class 11 Term 1 Phase',
        specs: '180 Questions • 720 Marks • 180 Mins • NTA NEET Pattern',
        status: 'Attempted • 612 / 720 (85%)',
        chapters: [
          { s: 'Physics', ch: 'Units & Dimensions, Kinematics, Laws of Motion, Work Energy Power' },
          { s: 'Chemistry', ch: 'Some Basic Concepts, Atomic Structure, Chemical Bonding' },
          { s: 'Biology', ch: 'The Living World, Biological Classification, Cell: Unit of Life' }
        ]
      },
      {
        id: 'PT-02',
        title: 'Part Test 02 - Thermodynamics, Equilibrium & Plant Physiology',
        phase: 'Class 11 Term 2 Phase',
        specs: '180 Questions • 720 Marks • 180 Mins • NTA NEET Pattern',
        status: 'Attempted • 580 / 720 (81%)',
        chapters: [
          { s: 'Physics', ch: 'Gravitation, Thermodynamics, Kinetic Theory, Oscillations & Waves' },
          { s: 'Chemistry', ch: 'Thermodynamics, Equilibrium, Solutions, Redox Reactions' },
          { s: 'Biology', ch: 'Plant Kingdom, Morphology, Photosynthesis, Respiration in Plants' }
        ]
      },
      {
        id: 'PT-03',
        title: 'Part Test 03 - Electrodynamics, Organic Chemistry & Reproduction',
        phase: 'Class 12 Term 1 Phase',
        specs: '180 Questions • 720 Marks • 180 Mins • NTA NEET Pattern',
        status: 'Unattempted • Recommended',
        chapters: [
          { s: 'Physics', ch: 'Electrostatics, Current Electricity, Magnetism, EMI & AC' },
          { s: 'Chemistry', ch: 'Organic Principles, Hydrocarbons, Haloalkanes, Alcohols & Phenols' },
          { s: 'Biology', ch: 'Human Reproduction, Reproductive Health, Genetics & Linkage' }
        ]
      },
      {
        id: 'PT-04',
        title: 'Part Test 04 - Modern Physics, Coordination Chemistry & Biotechnology',
        phase: 'Class 12 Term 2 Phase',
        specs: '180 Questions • 720 Marks • 180 Mins • NTA NEET Pattern',
        status: 'Unattempted',
        chapters: [
          { s: 'Physics', ch: 'Optics, Dual Nature, Atoms and Nuclei, Semiconductor Electronic Devices' },
          { s: 'Chemistry', ch: 'Coordination Compounds, d & f Block, Biomolecules, Amines' },
          { s: 'Biology', ch: 'Molecular Basis of Inheritance, Biotechnology, Ecology & Environment' }
        ]
      }
    ];

    return shell(
      hero('Part Tests', 'Syllabus Phase & Unit Tests with High-Yield Subject Coverage') +
      `<div style="display:flex;flex-direction:column;gap:14px">
        ${partTestsList.map(pt => `
          <div class="card" style="padding:20px">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
              <div>
                <span class="chip c3" style="font-size:11px;margin-bottom:6px">${pt.phase}</span>
                <h3 style="font-size:18px;margin:2px 0 4px">${pt.title}</h3>
                <small style="color:var(--mu)">${pt.specs}</small>
              </div>
              <div>
                <span class="chip ${pt.status.includes('Attempted') ? 'c3' : 'c5'}">${pt.status}</span>
              </div>
            </div>

            <!-- Subject-wise chapters pills inside card -->
            <div style="margin:14px 0;background:var(--cd2);padding:12px 14px;border-radius:14px;display:flex;flex-direction:column;gap:8px">
              <b style="font-size:12px;color:var(--mu);text-transform:uppercase;letter-spacing:0.5px">Included Chapters in this Test:</b>
              ${pt.chapters.map(c => `
                <div style="font-size:13px;display:flex;gap:8px;align-items:baseline">
                  <span class="chip ${c.s === 'Physics' ? 'c1' : c.s === 'Chemistry' ? 'c2' : 'c3'}" style="padding:2px 8px;font-size:11px">${c.s}</span>
                  <span style="color:var(--ink)">${c.ch}</span>
                </div>
              `).join('')}
            </div>

            <div style="display:flex;justify-content:flex-end">
              <button class="btn btn-primary" onclick="startPartTest('${pt.id}', '${pt.title.replace(/'/g, "\\'")}')">
                Start Part Test (180 Qs) →
              </button>
            </div>
          </div>
        `).join('')}
      </div>`,
      bc(['Mock Tests', 'tests'], ['Part Tests'])
    );
  },

  // Flow C: Custom Test Builder Wizard (Subject -> Chapter -> Topic)
  custom_builder: () => {
    const selSubs = S.selSubjects || ['Physics'];
    const activeSub = selSubs[0] || 'Physics';
    const chapters = CHD[activeSub] || [];

    return shell(
      hero('Custom Test Builder', 'Create your personalized exam by selecting exact Subjects, Chapters & Specific Topics') +
      `<div class="card" style="padding:24px;margin-bottom:16px">
        <h3 style="margin-bottom:12px">1. Select Subjects (Multi-Select)</h3>
        <div class="g g4">
          ${['Physics', 'Chemistry', 'Botany', 'Zoology'].map(s => {
            const isSel = selSubs.includes(s);
            return `
              <button class="card" style="text-align:left;cursor:pointer;border:2px solid ${isSel ? 'var(--g2)' : 'var(--ln)'};background:${isSel ? 'rgba(16,185,129,0.08)' : 'var(--cd)'}" onclick="toggleCustomSubject('${s}')">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <b style="font-size:15px">${s === 'Physics' ? '⚛️' : s === 'Chemistry' ? '🧪' : s === 'Botany' ? '🌿' : '🧬'} ${s}</b>
                  <span>${isSel ? '✅' : '⬜'}</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card" style="padding:24px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:14px">
          <div>
            <h3 style="margin:0">2. Select Chapters & Specific Topics</h3>
            <small style="color:var(--mu)">Expand any chapter to select or unselect individual topics</small>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn sm o" onclick="toggleSelectAllTopics(true)">Select All</button>
            <button class="btn sm o" onclick="toggleSelectAllTopics(false)">Clear Selection</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px">
          ${chapters.map((ch, cIdx) => {
            const topics = ch[1].split('|');
            const isExp = S.expandedChapters[ch[0]];
            const isChSel = S.selChapters.includes(ch[0]);

            return `
              <div style="border:1px solid var(--ln);border-radius:14px;padding:12px 16px;background:var(--cd)">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <label style="display:flex;align-items:center;gap:10px;cursor:pointer;flex:1">
                    <input type="checkbox" ${isChSel ? 'checked' : ''} onchange="toggleCustomChapter('${ch[0].replace(/'/g, "\\'")}', this.checked)" style="width:18px;height:18px;accent-color:var(--g2)">
                    <b style="font-size:14px">${String(cIdx + 1).padStart(2, '0')}. ${ch[0]}</b>
                  </label>
                  <button class="btn sm o" style="padding:4px 10px" onclick="toggleChapterExpand('${ch[0].replace(/'/g, "\\'")}')">
                    ${isExp ? '▲ Hide Topics' : '▼ Topics (' + topics.length + ')'}
                  </button>
                </div>

                ${isExp ? `
                  <div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--ln);display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:8px">
                    ${topics.map(tp => {
                      const isTpSel = S.selTopics.includes(tp);
                      return `
                        <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink);cursor:pointer;padding:4px 6px;border-radius:6px;background:var(--cd2)">
                          <input type="checkbox" ${isTpSel ? 'checked' : ''} onchange="toggleCustomTopic('${tp.replace(/'/g, "\\'")}', this.checked)" style="accent-color:var(--g2)">
                          <span>${tp}</span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card" style="padding:24px;margin-bottom:20px">
        <h3 style="margin-bottom:12px">3. Configure Test Parameters</h3>
        <div class="g g3">
          <div>
            <b>Questions Count</b>
            <div class="tabs" style="margin-top:8px">
              ${[15, 30, 45, 60, 90, 180].map(cnt => `
                <button class="tb ${S.custCount === cnt ? 'on' : ''}" onclick="S.custCount=${cnt};draw()">${cnt} Qs</button>
              `).join('')}
            </div>
          </div>
          <div>
            <b>Test Duration</b>
            <div class="tabs" style="margin-top:8px">
              ${[15, 30, 45, 60, 180].map(dur => `
                <button class="tb ${S.custDuration === dur ? 'on' : ''}" onclick="S.custDuration=${dur};draw()">${dur} Mins</button>
              `).join('')}
            </div>
          </div>
          <div>
            <b>Difficulty</b>
            <div class="tabs" style="margin-top:8px">
              ${['Easy', 'Medium', 'Hard', 'NTA Mixed'].map(df => `
                <button class="tb ${S.custDiff === df ? 'on' : ''}" onclick="S.custDiff='${df}';draw()">${df}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <button class="btn btn-primary" style="width:100%;margin-top:20px;height:48px;font-size:16px" onclick="launchCustomTest()">
          Generate & Start Custom Test (${S.custCount} Qs • ${S.custDuration} Mins) →
        </button>
      </div>`,
      bc(['Mock Tests', 'tests'], ['Custom Tests'])
    );
  },

  // Flow D: Full Syllabus Tests
  full_syllabus_tests: () => {
    const fullTests = [
      { id: 'FST-01', title: 'NEET Ultimate Full Syllabus Mock 01', attempt: '560 / 720 (78%)', date: 'Attempted on 12 Oct' },
      { id: 'FST-02', title: 'NEET Ultimate Full Syllabus Mock 02', attempt: '612 / 720 (85%)', date: 'Attempted on 21 Oct' },
      { id: 'FST-03', title: 'NEET Ultimate Full Syllabus Mock 03', attempt: '640 / 720 (89%)', date: 'Attempted on 30 Oct' },
      { id: 'FST-04', title: 'NEET All India Open Mock 04 (NMC 2026)', attempt: 'Unattempted', date: 'Live Now' },
      { id: 'FST-05', title: 'NEET Rank Predictor Grand Exam 05', attempt: 'Unattempted', date: 'Scheduled Sun, 2 Nov' }
    ];

    return shell(
      hero('Full Syllabus Tests', 'Complete NEET pattern 180 Questions • 720 Marks • 3 Hours') +
      `<div style="display:flex;flex-direction:column;gap:12px">
        ${fullTests.map(ft => `
          <div class="card" style="padding:18px 22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
            <div>
              <b style="font-size:16px">${ft.title}</b>
              <p style="color:var(--mu);font-size:12px;margin-top:2px">180 Questions • 720 Marks • Physics, Chemistry, Botany, Zoology • ${ft.date}</p>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="chip ${ft.attempt.includes('Unattempted') ? 'c5' : 'c3'}">${ft.attempt}</span>
              <button class="btn btn-primary sm" onclick="startFullTest('${ft.id}', '${ft.title.replace(/'/g, "\\'")}')">
                ${ft.attempt.includes('Unattempted') ? 'Start Test' : 'Re-attempt'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>`,
      bc(['Mock Tests', 'tests'], ['Full Syllabus Tests'])
    );
  },

  // 4. PERFORMANCE TAB & DETAILED TEST ANALYSIS
  perf: () => shell(
    hero('Performance Overview', 'Your preparation insights, score trend and detailed test history') +
    `<div class="g g4">
      ${[
        ['🎯', '640 / 720', 'Best Score', '#dcf7e6'],
        ['📶', '78%', 'Overall Accuracy', '#e6f0ff'],
        ['🧱', '5,420', 'Questions Attempted', '#f0e8ff'],
        ['🔥', '12 Days', 'Current Streak', '#fff0e4']
      ].map(x => `
        <div class="st">
          <span class="ic" style="background:${x[3]}">${x[0]}</span>
          <span><b>${x[1]}</b><small>${x[2]}</small></span>
        </div>
      `).join('')}
    </div>

    <div class="g g2" style="margin-top:16px">
      <div class="card">
        <h3>Subject-wise Performance</h3>
        ${[
          ['Physics', '⚛️', 82],
          ['Chemistry', '🧪', 76],
          ['Botany', '🌿', 78],
          ['Zoology', '🧬', 73]
        ].map(s => `
          <div class="pr" style="margin:12px 0;cursor:pointer" onclick="go('sp',{s:'${s[0]}'})">
            <span style="width:110px">${s[1]} ${s[0]}</span>
            <div class="bar"><i style="width:${s[2]}%"></i></div>
            <b>${s[2]}%</b>
          </div>
        `).join('')}
      </div>

      <div class="card">
        <h3>Performance Trend</h3>
        <svg viewBox="0 0 340 150" style="width:100%">
          <defs>
            <linearGradient id="a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#14a366" stop-opacity=".35"/>
              <stop offset="1" stop-color="#14a366" stop-opacity="0"/>
            </linearGradient>
          </defs>
          ${[0, 1, 2, 3].map(i => `
            <line x1="30" x2="310" y1="${20 + i * 35}" y2="${20 + i * 35}" stroke="#e2eee7"/>
            <text x="24" y="${24 + i * 35}" font-size="9" fill="#62766b" text-anchor="end">${100 - i * 25}%</text>
          `).join('')}
          <path d="M30 110 C70 95 90 80 130 82 S190 90 220 70 S280 45 310 40 V125 H30z" fill="url(#a)"/>
          <path d="M30 110 C70 95 90 80 130 82 S190 90 220 70 S280 45 310 40" fill="none" stroke="#14a366" stroke-width="3" stroke-linecap="round"/>
          ${['Oct 1', 'Oct 7', 'Oct 14', 'Oct 21', 'Oct 28'].map((d, i) => `
            <text x="${30 + i * 70}" y="145" font-size="10" fill="#62766b" text-anchor="middle">${d}</text>
          `).join('')}
        </svg>
      </div>
    </div>

    <!-- Simplified Recent Tests List (Clickable to open Test Analysis) -->
    <div class="card s12" style="margin-top:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div>
          <h3 style="font-size:18px;margin:0">Recent Tests History</h3>
          <small style="color:var(--mu)">Click any test below to view its complete diagnosis and topic-wise mistake analysis</small>
        </div>
        <button class="btn sm o" onclick="go('tests')">+ Take New Test</button>
      </div>

      <div class="recent-tests-list">
        ${TEST_HISTORY.map((t, idx) => `
          <div class="recent-test-item" onclick="openTestAnalysis(${idx})">
            <div class="rti-icon">📝</div>
            <div class="rti-info">
              <b>${t.title}</b>
              <small>${t.date} • ${t.qCount} Questions • ${t.duration}</small>
            </div>
            <div class="rti-badge">
              <span class="marks-pill">${t.score} / ${t.totalMarks}</span>
              <small class="acc-pill">${t.accuracy}% Acc</small>
            </div>
            <div class="rti-arrow">Analysis ›</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="g g5" style="margin-top:16px">
      ${[
        ['📊', 'Chapter Analysis', 'sp'],
        ['🧱', 'Topic Analysis', 'sp'],
        ['📝', 'Mock Test Hub', 'tests'],
        ['🎯', 'Weak Areas', 'weak'],
        ['📖', 'Improvement Book', 'ib']
      ].map(a => `
        <button class="card" style="font-weight:700;text-align:center" onclick="go('${a[2]}')">
          <div style="font-size:26px">${a[0]}</div>
          ${a[1]}
        </button>
      `).join('')}
    </div>`,
    bc(['Performance'])
  ),

  // Clickable Detailed Test Report & Mistake Analysis Page
  test_analysis: () => {
    const t = TEST_HISTORY[S.activeTestIdx] || TEST_HISTORY[0];
    const filt = S.analysisFilter || 'All';
    const sampleQuestions = getQuestions({ count: Math.min(t.qCount, 20) });

    return shell(`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <button class="btn sm o" onclick="go('perf')">← Back to Performance</button>
        <span class="chip c3">${t.category}</span>
      </div>

      <div class="hero" style="min-height:100px;margin-bottom:16px">
        <div>
          <h1>${t.title}</h1>
          <p>${t.date} • Time Spent: ${t.timeTaken} of ${t.duration} • Overall Status: Completed</p>
        </div>
      </div>

      <!-- 4 Top Summary Metric KPI Cards -->
      <div class="g g4">
        <div class="card" style="text-align:center">
          <small style="color:var(--mu);font-weight:700">TOTAL SCORE</small>
          <div style="font-size:32px;font-weight:800;color:var(--g2);margin:4px 0">${t.score} / ${t.totalMarks}</div>
          <span class="chip c3">${t.percentile} Percentile</span>
        </div>
        <div class="card" style="text-align:center">
          <small style="color:var(--mu);font-weight:700">ACCURACY</small>
          <div style="font-size:32px;font-weight:800;color:#2563eb;margin:4px 0">${t.accuracy}%</div>
          <small style="color:var(--mu)">Target: &gt; 85% for GMC</small>
        </div>
        <div class="card" style="text-align:center">
          <small style="color:var(--mu);font-weight:700">QUESTION BREAKDOWN</small>
          <div style="font-size:18px;font-weight:800;margin:10px 0;display:flex;justify-content:space-around">
            <span style="color:#10b981">✓ ${t.correct}</span>
            <span style="color:#ef4444">✖ ${t.incorrect}</span>
            <span style="color:var(--mu)">– ${t.unattempted}</span>
          </div>
          <small style="color:var(--mu)">Correct • Wrong • Skipped</small>
        </div>
        <div class="card" style="text-align:center">
          <small style="color:var(--mu);font-weight:700">TIME EFFICIENCY</small>
          <div style="font-size:32px;font-weight:800;color:#8b5cf6;margin:4px 0">52s</div>
          <small style="color:var(--mu)">Avg. speed per question</small>
        </div>
      </div>

      <!-- Subject-Wise Breakdown -->
      <div class="card" style="margin-top:16px;padding:20px">
        <h3 style="margin-bottom:14px">Subject-Wise Breakdown</h3>
        <div class="g g4">
          ${['Physics', 'Chemistry', 'Botany', 'Zoology'].map(sub => {
            const sb = (t.subjectBreakdown && t.subjectBreakdown[sub]) || { score: 152, total: 180, acc: 84 };
            return `
              <div style="background:var(--cd2);padding:14px;border-radius:14px">
                <div style="display:flex;justify-content:space-between">
                  <b>${sub}</b>
                  <span style="color:var(--g2);font-weight:800">${sb.score}/${sb.total}</span>
                </div>
                <div class="pr" style="margin:8px 0">
                  <div class="bar"><i style="width:${sb.acc}%"></i></div>
                </div>
                <small style="color:var(--mu)">${sb.acc}% Accuracy</small>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Diagnostic Section: "Kis Topic Mein Galti Hui" -->
      <div class="card" style="margin-top:16px;padding:20px;border-left:4px solid #ef4444">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <h3 style="margin:0;color:#ef4444">🔍 Kis Topic Mein Galti Hui (Mistake Diagnostics)</h3>
            <small style="color:var(--mu)">Targeted weakness analysis based on your incorrect responses</small>
          </div>
          <button class="btn sm o" onclick="go('ib')">Open Improvement Book →</button>
        </div>

        <div class="weak-topic-grid">
          ${(t.weakTopics || [
            { name: 'Rotational Motion — Moment of Inertia', subject: 'Physics', lostMarks: 8, incorrect: 2, difficulty: 'Hard' },
            { name: 'Chemical Thermodynamics — Gibbs Free Energy', subject: 'Chemistry', lostMarks: 4, incorrect: 1, difficulty: 'Medium' },
            { name: 'Plant Growth — Photoperiodism & Vernalisation', subject: 'Botany', lostMarks: 4, incorrect: 1, difficulty: 'Medium' }
          ]).map(wt => `
            <div class="weak-topic-card">
              <div class="wtc-header">
                <div>
                  <span class="chip ${wt.subject === 'Physics' ? 'c1' : wt.subject === 'Chemistry' ? 'c2' : 'c3'}" style="font-size:10px">${wt.subject}</span>
                  <div class="wtc-title" style="margin-top:4px">${wt.name}</div>
                </div>
                <span class="wtc-badge">-${wt.lostMarks} Marks</span>
              </div>
              <div class="wtc-meta">${wt.incorrect} Incorrect Questions • ${wt.difficulty} Level</div>
              <button class="wtc-btn" onclick="go('setup',{s:'${wt.subject}',tp:'${wt.name.split('—').pop().trim()}'})">
                Practice This Topic →
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Question-by-Question Detailed Review -->
      <div class="card" style="margin-top:16px;padding:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px">
          <h3 style="margin:0">Question-by-Question Review</h3>
          <div style="display:flex;gap:6px">
            ${['All', 'Incorrect', 'Correct'].map(f => `
              <button class="chip ${filt === f ? 'c3' : 'c6'}" style="cursor:pointer;padding:6px 12px" onclick="S.analysisFilter='${f}';draw()">${f}</button>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px">
          ${sampleQuestions.slice(0, 8).map((q, qIdx) => {
            const isWrong = qIdx % 3 === 1;
            if (filt === 'Incorrect' && !isWrong) return '';
            if (filt === 'Correct' && isWrong) return '';

            return `
              <div style="padding:14px;border-radius:14px;border:1px solid ${isWrong ? '#ef4444' : 'var(--ln)'};background:var(--cd)">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                  <b>Q${qIdx + 1}. [${q.subject} • ${q.chapter}]</b>
                  <span class="chip ${isWrong ? 'c4' : 'c3'}">${isWrong ? '✖ Incorrect (-1)' : '✓ Correct (+4)'}</span>
                </div>
                <p style="font-size:15px;margin-bottom:12px">${q.q}</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  ${q.o.map((opt, oIdx) => `
                    <div class="opt ${oIdx === q.a ? 'ok' : (isWrong && oIdx === (q.a + 1) % 4 ? 'no' : '')}" style="margin:0;padding:10px 14px">
                      <b>${'ABCD'[oIdx]}</b>
                      <span>${opt}</span>
                    </div>
                  `).join('')}
                </div>
                <div style="margin-top:10px;padding:10px 14px;border-radius:10px;background:var(--cd2);font-size:13px">
                  <b style="color:var(--g2)">Explanation:</b> ${q.exp}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>`,
      bc(['Performance', 'perf'], [t.title])
    );
  },

  // 5. CBT FULL-SCREEN PRACTICE / EXAM RUNNER
  quiz: () => {
    const q = Q.l[Q.i];
    const userChoice = Q.a[Q.i];
    const isMarked = Q.m[Q.i];
    const isFullExam = Q.mode === 'mock';

    // Mark current question as visited
    Q.visited[Q.i] = true;

    return `
      <div class="cbt-full">
        <!-- Top Exam Header -->
        <header class="cbt-header">
          <div class="cbt-header-left">
            <button class="cbt-exit-btn" onclick="exitExamConfirm()">
              ✕ Exit Exam
            </button>
            <span class="cbt-title-badge">${Q.title || 'NEET CBT Test'}</span>
          </div>

          <div class="cbt-header-center">
            <div class="cbt-timer-pill" id="tm">⏱ --:--:--</div>
          </div>

          <div class="cbt-header-right">
            <button class="cbt-tool-btn ${isMarked ? 'active' : ''}" onclick="toggleMarkQuestion()">
              ${isMarked ? '🔖 Bookmarked' : '🏷️ Bookmark'}
            </button>
            <button class="cbt-tool-btn" onclick="togglePalette()">
              📋 Question Palette
            </button>
          </div>
        </header>

        <!-- Main Examination Area -->
        <div class="cbt-content-area">
          <main class="cbt-question-panel">
            <div class="cbt-meta-bar">
              <div>
                <span class="cbt-q-number">Question ${Q.i + 1} of ${Q.l.length}</span>
                <span class="cbt-q-subject">${q.subject || 'Physics'}</span>
              </div>
              <div class="cbt-marking">
                <span>Marking Scheme: <b style="color:#10b981">+4</b> / <b style="color:#ef4444">-1</b></span>
              </div>
            </div>

            <div class="cbt-q-text">
              ${q.q}
            </div>

            <div class="cbt-options-list">
              ${q.o.map((opt, j) => `
                <div class="cbt-opt-item ${userChoice === j ? 'selected' : ''}" onclick="selectAnswer(${j})">
                  <div class="cbt-opt-letter">${'ABCD'[j]}</div>
                  <div class="cbt-opt-text">${opt}</div>
                </div>
              `).join('')}
            </div>

            <div class="cbt-clear-wrap">
              <button class="cbt-clear-btn" onclick="clearChoice()">
                Clear My Response
              </button>
            </div>
          </main>

          <!-- Slide-Over Question Palette Drawer -->
          <aside class="cbt-palette-drawer ${Q.showPalette ? 'open' : ''}">
            <div class="cbt-palette-header">
              <b>Question Palette</b>
              <button class="btn sm o" style="padding:4px 8px" onclick="togglePalette()">✕</button>
            </div>

            <div class="cbt-legend-grid">
              <div class="cbt-legend-item">
                <span class="cbt-leg-dot ans"></span> Answered
              </div>
              <div class="cbt-legend-item">
                <span class="cbt-leg-dot rev"></span> Marked Review
              </div>
              <div class="cbt-legend-item">
                <span class="cbt-leg-dot not-ans"></span> Unanswered
              </div>
              <div class="cbt-legend-item">
                <span class="cbt-leg-dot not-vis"></span> Not Visited
              </div>
            </div>

            <div class="cbt-palette-grid">
              ${Q.l.map((_, idx) => {
                const ans = Q.a[idx] != null;
                const rev = Q.m[idx];
                const curr = Q.i === idx;
                let cls = 'not-vis';
                if (ans) cls = 'ans';
                else if (rev) cls = 'rev';
                else if (Q.visited[idx]) cls = 'not-ans';

                return `
                  <button class="cbt-num-btn ${cls} ${curr ? 'curr' : ''}" onclick="jumpToQuestion(${idx})">
                    ${idx + 1}
                  </button>
                `;
              }).join('')}
            </div>
          </aside>
        </div>

        <!-- Sticky Bottom Bar -->
        <footer class="cbt-bottom-bar">
          <div class="cbt-bottom-left">
            <button class="btn o" ${Q.i === 0 ? 'disabled style="opacity:0.4"' : ''} onclick="prevQuestion()">
              ← Previous
            </button>
          </div>

          <div style="display:flex;align-items:center;gap:12px">
            <button class="btn o" onclick="markAndNext()">
              🔖 Mark for Review & Next
            </button>
            ${Q.i < Q.l.length - 1 ? `
              <button class="btn btn-primary" onclick="nextQuestion()">
                Save & Next →
              </button>
            ` : `
              <button class="btn btn-primary" onclick="submitTestConfirm()">
                Submit Test ✓
              </button>
            `}
          </div>

          <div class="cbt-bottom-right">
            <button class="btn btn-primary" onclick="submitTestConfirm()">
              Submit Test ✓
            </button>
          </div>
        </footer>
      </div>
    `;
  },

  result: () => {
    const r = score(), m = Q.mode === 'mock';
    return shell(`
      <div class="card" style="max-width:760px;margin:auto;text-align:center;padding:32px">
        <h2 style="font-size:26px">✅ ${m ? 'Test' : 'Practice'} Result</h2>
        <div style="font-weight:800;font-size:48px;line-height:1.2;margin:12px 0;color:var(--g2)">
          ${Math.max(0, r.c * 4 - r.w)} <span style="font-size:20px;color:var(--mu)">/ ${Q.l.length * 4} Marks</span>
        </div>

        <div class="g g4" style="margin:20px 0">
          ${[
            [r.at, 'Attempted', '#e6f0ff'],
            [r.c, 'Correct (+4)', '#dcf7e6'],
            [r.w, 'Incorrect (-1)', '#fde8e8'],
            [r.acc + '%', 'Accuracy', '#fff4d6']
          ].map(x => `
            <div class="st" style="background:${x[2]};justify-content:center">
              <span><b>${x[0]}</b><small>${x[1]}</small></span>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
          <button class="btn btn-primary" onclick="openTestAnalysis(0)">
            View Detailed Mistake Analysis →
          </button>
          <button class="btn o" onclick="go('review')">
            Review Questions
          </button>
        </div>
      </div>
    `, bc([m ? 'Mock Tests' : 'Practice', m ? 'tests' : 'practice'], ['Result']));
  },

  review: () => shell(
    `<h2 class="sec" style="margin-top:0">Review Questions</h2>` +
    Q.l.map((q, i) => `
      <div class="card" style="margin-bottom:14px">
        <b>Q${i + 1}. ${q.q}</b>
        <div style="margin-top:10px">
          ${q.o.map((o, j) => `
            <div class="opt ${j == q.a ? 'ok' : Q.a[i] == j ? 'no' : ''}" style="cursor:default">
              <b>${'ABCD'[j]}</b>${o}
            </div>
          `).join('')}
        </div>
        <div style="margin-top:8px;padding:8px 12px;background:var(--cd2);border-radius:8px;font-size:13px">
          <b style="color:var(--g2)">Explanation:</b> ${q.exp}
        </div>
      </div>
    `).join('') +
    `<button class="btn btn-primary" onclick="go('practice')">Back to Practice</button>`,
    bc(['Practice', 'practice'], ['Review'])
  ),

  // 6. MORE TAB (Tightened Spacing & All 10 Study Tools)
  more: () => {
    const n = gd();
    const sw = (f, v) => `<span class="sw ${v ? 'on' : ''}" aria-hidden="true"></span>`;
    const tools = [
      ['practice', '🎯', 'Practice Questions'],
      ['tests', '📝', 'Mock Tests Hub'],
      ['perf', '📊', 'Performance Analytics'],
      ['ib', '📖', 'Improvement Book'],
      ['notes', '🔖', 'Notes & Bookmarks'],
      ['pyq', '📚', 'PYQs (2016-2025)'],
      ['dpp', '🗒️', 'DPP Practice'],
      ['flash', '🃏', 'Flashcards'],
      ['doubt', '💡', 'AI Doubt Solver', 'AI'],
      ['plan', '📅', 'Study Plan & Countdown']
    ];
    const cl = ['#e4f6ec', '#e6f0ff', '#f0e8ff', '#fde8e8', '#fff4d6', '#e3f1ff', '#ffe5e5', '#dcf7e6', '#f0e8ff', '#fff0e4'];
    const row = (i, t, r, f) => `<div class="mo-r" role="button" tabindex="0" onclick="${f}"><span class="mo-i2">${i}</span><span class="x"><b>${t}</b></span>${r}</div>`;

    return shell(`
      <div class="mo-p">
        <div class="mo-a">${UI()}</div>
        <div class="mo-i">
          <h2>${UN()}</h2>
          <small>${UY()} • ${UC()} • All India Aspirant</small>
          <div class="mo-b">
            <span>🔥 12 day streak</span>
            <span>🎯 ${n}/${G.length} goals</span>
            <span>📈 78% accuracy</span>
          </div>
        </div>
        <button class="btn sm" onclick="toast('You are on the NEET Complete Pro Plan ✨')">⭐ Pro Plan</button>
      </div>

      <h2 class="sec" style="margin-top:16px;margin-bottom:8px">Study Tools</h2>
      <div class="mo-g">
        ${tools.map((t, i) => `
          <button class="mo-t" onclick="go('${V[t[0]] ? t[0] : 'soon'}',{t:'${t[2]}'})">
            <span class="ti" style="background:${cl[i % 10]}">${t[1]}</span>
            <b>${t[2]}</b>
            ${t[3] ? '<span class="ai">AI</span>' : '<i>›</i>'}
          </button>
        `).join('')}
      </div>

      <h2 class="sec" style="margin-top:16px;margin-bottom:8px">Settings</h2>
      <div class="mo-l">
        ${row('🌙', 'Dark mode', sw('tgd()', dm), 'tgd()')}
        ${row('🔔', 'Daily reminders', sw('', true), "toast('Notifications enabled ✅')")}
        ${row('🌐', 'Language', '<small>English ›</small>', "toast('Hindi version launching soon')")}
      </div>

      <h2 class="sec" style="margin-top:16px;margin-bottom:8px">Support & Account</h2>
      <div class="mo-l">
        ${row('💬', 'Help & Support', '<i>›</i>', "toast('Support email: support@neetbuddy.in')")}
        ${row('🔒', 'Privacy & Syllabus Policy', '<i>›</i>', "toast('Strictly adhering to NMC NEET UG 2026 syllabus')")}
        ${row('ℹ️', 'About NEETBuddy', '<small>v2.5</small>', "toast('NEETBuddy v2.5 by Toolify')")}
      </div>

      <button class="mo-out" onclick="leave()">⎋ Log out</button>
    `, bc(['More']));
  },

  // 7. RESPONSIVE 2-COLUMN SPLIT AUTH VIEW (DESKTOP + MOBILE)
  auth: () => {
    const su = S.am === 'Sign Up';
    return `
      <div class="au-split">
        <!-- Left Showcase Column (Desktop Only) -->
        <aside class="au-showcase">
          <div class="au-showcase-top">
            <div class="au-logo-wrap">
              ${LGO}
              <span class="au-logo-text">NEET<b>Buddy</b></span>
            </div>
            <div class="au-tag">India's Premier NEET UG Platform</div>
            <h1 class="au-headline">
              Practice Smarter.<br>
              Score Higher.<br>
              <span>Crack NEET.</span>
            </h1>
            <p class="au-desc">
              Strictly aligned with the NMC 2026 syllabus. Chapter-wise practice, real CBT mock tests, instant AI mistake analysis, and personal improvement book.
            </p>

            <div class="au-features">
              <div class="au-feature-item">
                <span class="au-chk">✓</span>
                <div>
                  <b>NCERT Line-by-Line & Allen-Level Testing</b>
                  <p>714+ curated high-yield questions with complete step-by-step explanations.</p>
                </div>
              </div>
              <div class="au-feature-item">
                <span class="au-chk">✓</span>
                <div>
                  <b>Full-Length 720-Mark CBT Simulator</b>
                  <p>NTA exam pattern with live timer, question palette, and negative marking.</p>
                </div>
              </div>
              <div class="au-feature-item">
                <span class="au-chk">✓</span>
                <div>
                  <b>Improvement Book & Diagnostic Insights</b>
                  <p>Automatically records your mistakes so you never repeat them on exam day.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="au-showcase-bottom">
            <div class="au-stats-grid">
              <div class="au-stat-box">
                <b>24,000+</b>
                <small>Active Aspirants</small>
              </div>
              <div class="au-stat-box">
                <b>99.4%</b>
                <small>Accuracy Boost</small>
              </div>
              <div class="au-stat-box">
                <b>714+</b>
                <small>Solved NEET Qs</small>
              </div>
              <div class="au-stat-box">
                <b>180+</b>
                <small>Mock & Part Tests</small>
              </div>
            </div>
            <div class="au-quote-card">
              “Discipline today. Doctor tomorrow.”
            </div>
          </div>
        </aside>

        <!-- Right Form Column (Spacious & Responsive) -->
        <main class="au-form-col">
          <div class="au-card-box">
            <div class="au-mobile-brand">
              <div class="au-logo-wrap">${LGO}<span class="au-logo-text">NEET<b>Buddy</b></span></div>
              <button class="ib tg" aria-label="Toggle dark mode" onclick="tgd()">${dm ? '🌙' : '☀️'}</button>
            </div>

            <div class="au-card-header">
              <h2>${su ? 'Create your account' : 'Welcome back'}</h2>
              <p>${su ? 'Start your journey to GMC with smart practice.' : 'Log in to continue your NEET UG preparation.'}</p>
            </div>

            <!-- Quick Demo Login Button -->
            ${!su ? `
              <div class="au-demo-box">
                <button type="button" class="au-demo-btn" onclick="demoLogin()">
                  ⚡ Quick Demo Login (Ayush Kumar • Class 12)
                </button>
              </div>
            ` : ''}

            <form novalidate onsubmit="event.preventDefault(); ${su ? 'signup()' : 'loginForm()'}">
              ${su ? `
                <div class="fx">
                  <label for="au-n">Full name</label>
                  <input id="au-n" type="text" autocomplete="name" placeholder="e.g. Ayush Kumar">
                </div>
                <div class="fx">
                  <label for="au-p">10-Digit Mobile Number</label>
                  <input id="au-p" type="tel" inputmode="numeric" maxlength="10" placeholder="e.g. 9876543210">
                </div>
                <div class="fx">
                  <label for="au-e">Email address</label>
                  <input id="au-e" type="email" autocomplete="email" placeholder="e.g. ayush@example.com">
                </div>
              ` : `
                <div class="fx">
                  <label for="au-i">Email or mobile number</label>
                  <input id="au-i" type="text" autocomplete="username" value="ayush@neetbuddy.in" placeholder="Enter your email or 10-digit mobile number">
                </div>
              `}

              <div class="fx">
                <label for="au-w">Password</label>
                <div class="apw">
                  <input id="au-w" type="password" value="password123" autocomplete="${su ? 'new-password' : 'current-password'}" placeholder="Enter your password">
                  <button type="button" onclick="const i=this.previousElementSibling;i.type=i.type=='password'?'text':'password';this.textContent=i.type=='password'?'Show':'Hide'">Show</button>
                </div>
                ${su ? '<small class="ahint">Must be at least 8 characters long.</small>' : ''}
              </div>

              ${su ? `
                <div class="a2">
                  <div class="fx">
                    <label for="au-c">I am in</label>
                    <select id="au-c">
                      <option>Class 11</option>
                      <option selected>Class 12</option>
                      <option>Dropper</option>
                    </select>
                  </div>
                  <div class="fx">
                    <label for="au-y">Target Year</label>
                    <select id="au-y">
                      <option selected>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                    </select>
                  </div>
                </div>
              ` : `
                <div class="arw">
                  <label class="ck"><input id="au-r" type="checkbox" checked> Remember me</label>
                  <a onclick="toast('Demo account password: password123')">Forgot password?</a>
                </div>
              `}

              <p class="aer" id="aer" role="alert"></p>

              <button class="btn btn-primary au-submit-btn" type="submit">
                ${su ? 'Create Account & Start Practising →' : 'Log In to NEETBuddy →'}
              </button>
            </form>

            <div class="aor"><span>or</span></div>

            <button type="button" class="ag au-google-btn" onclick="googleLogin()">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Continue with Google
            </button>

            <p class="asw">
              ${su ? 'Already have an account? <a onclick="S.am=\'Login\';draw()">Log in</a>' : 'Don\'t have an account? <a onclick="S.am=\'Sign Up\';draw()">Sign up</a>'}
            </p>
          </div>
        </main>
      </div>
    `;
  },

  // 8. IMPROVEMENT BOOK & OTHER MODULES
  ib: () => {
    const f = IB.filter(r => S.ibt === 'All' || r[4].startsWith(S.ibt.replace(' Qs', '').slice(0, 6)));
    return shell(
      hero('Improvement Book', 'Revise your mistakes, weak areas and marked questions in one place.') +
      `<div class="g g4">
        ${[
          ['✖', '124', 'Incorrect Qs', '#fde8e8'],
          ['🔖', '48', 'Marked for Review', '#fff4d6'],
          ['🔁', '36', 'Reattempt Later', '#e3f1ff'],
          ['✔', '208', 'Total Mistakes Saved', '#dcf7e6']
        ].map(x => `
          <div class="st" style="background:${x[3]}">
            <span class="ic" style="background:#fff">${x[0]}</span>
            <span><b>${x[1]}</b><small>${x[2]}</small></span>
          </div>
        `).join('')}
      </div>

      <div class="tabs" style="margin-top:18px">
        ${['All', 'Incorrect', 'Marked', 'Reattempt'].map(t => `
          <button class="tb ${S.ibt == t ? 'on' : ''}" onclick="S.ibt='${t}';draw()">${t === 'All' ? 'All Mistakes' : t}</button>
        `).join('')}
      </div>

      <div class="card rsp">
        <table>
          <tr>
            <th>Question</th>
            <th>Subject</th>
            <th>Chapter & Topic</th>
            <th>Status</th>
            <th>Last Attempt</th>
            <th>Action</th>
          </tr>
          ${f.map((r, i) => `
            <tr>
              <td style="max-width:240px"><b>${r[0]}</b></td>
              <td><span class="chip ${['c1', 'c2', 'c3', 'c6'][['Physics', 'Chemistry', 'Botany', 'Zoology'].indexOf(r[1]) >= 0 ? ['Physics', 'Chemistry', 'Botany', 'Zoology'].indexOf(r[1]) : 0]}">${r[1]}</span></td>
              <td>${r[2]}<br><small style="color:var(--mu)">${r[3]}</small></td>
              <td><span class="chip ${r[4] === 'Incorrect' ? 'c4' : r[4] === 'Marked' ? 'c5' : 'c6'}">${r[4]}</span></td>
              <td>${r[5]}</td>
              <td><button class="btn btn-primary sm" onclick="go('ibd',{r:${IB.indexOf(r)}})">Re-attempt</button></td>
            </tr>
          `).join('')}
        </table>
      </div>`,
      bc(['Improvement Book'])
    );
  },

  ibd: () => {
    const item = IB[S.r || 0] || IB[0];
    return shell(`
      <div class="card" style="max-width:700px;margin:auto">
        <h2>Question Detail & Revision</h2>
        <p style="margin:10px 0 16px;font-size:16px"><b>Q.</b> ${item[0]}</p>
        <div class="opt ok" style="cursor:default"><b>A</b> Correct option based on NCERT ✔</div>
        <div class="opt" style="cursor:default"><b>B</b> Distractor option</div>
        <div style="display:flex;gap:10px;margin:12px 0 18px">
          <span class="chip c4">Your Previous Answer: Incorrect</span>
          <span class="chip c3">Required Concept: ${item[2]}</span>
        </div>
        <button class="btn btn-primary" style="width:100%" onclick="start('practice')">
          🔁 Re-attempt This Concept Now
        </button>
      </div>
    `, bc(['Improvement Book', 'ib'], ['Question Review']));
  },

  sp: () => shell(
    hero(S.s + ' Chapter Analysis', 'Chapter-wise accuracy and depth breakdown') +
    `<div class="g g2">
      <div class="card" style="display:flex;gap:20px;align-items:center">
        <div class="dn" style="background:conic-gradient(var(--g2) 82%,#e2eee7 0)">
          <span>82%<small>Accuracy</small></span>
        </div>
        <div style="flex:1">
          <div class="k"><span>Total Questions</span><b>1,240</b></div>
          <div class="k"><span>Correct</span><b>1,017</b></div>
          <div class="k"><span>Incorrect</span><b>176</b></div>
        </div>
      </div>
      <div class="card">
        <h3 style="margin-bottom:8px">High-Yield Chapters</h3>
        ${[
          ['Physical World & Measurement', 86],
          ['Kinematics', 78],
          ['Laws of Motion', 74]
        ].map((c, i) => `
          <div class="pr" style="margin:12px 0">
            <span style="width:60%">${String(i + 1).padStart(2, '0')} ${c[0]}</span>
            <div class="bar"><i style="width:${c[1]}%"></i></div>
            <b>${c[1]}%</b>
          </div>
        `).join('')}
      </div>
    </div>`,
    bc(['Performance', 'perf'], [S.s + ' Analysis'])
  ),

  weak: () => shell(
    hero('Weak Areas', 'Priority topics that need your revision before exam day') +
    [
      ['Rotational Motion — Moment of Inertia', 58],
      ['Chemical Thermodynamics — Gibbs Free Energy', 62],
      ['Plant Growth & Regulators', 61],
      ['Semiconductor Devices & Logic Gates', 64]
    ].map(w => `
      <div class="row" style="cursor:default">
        <span class="n" style="background:#fde8e8;color:#dc2626">!</span>
        <span class="x"><b>${w[0]}</b></span>
        <b style="color:#dc2626">${w[1]}% Accuracy</b>
      </div>
    `).join(''),
    bc(['Performance', 'perf'], ['Weak Areas'])
  ),

  notes: () => {
    const tabs = ['My Notes', 'Bookmarked Questions', 'Improvement Book'];
    const ic = ['📄', '🔖', '🎯'];
    const L = NT.filter(n => (S.nf === 'All' || n[1] === S.nf) && (n[0] + n[2]).toLowerCase().includes(S.nq.toLowerCase()));
    let b;

    if (S.nt === 'My Notes') {
      b = `
        <div class="nb2">
          <div class="card">
            <div class="fl ${S.nf === 'All' ? 'on' : ''}" onclick="S.nf='All';draw()">All Notes <span>${NT.length}</span></div>
            ${SUBJ.map(s => `
              <div class="fl ${S.nf === s[0] ? 'on' : ''}" onclick="S.nf='${s[0]}';draw()">${s[1]} ${s[0]} <span>${NT.filter(n => n[1] === s[0]).length}</span></div>
            `).join('')}
          </div>
          <div>
            <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap">
              <input placeholder="🔍 Search notes…" value="${S.nq}" oninput="S.nq=this.value;draw()" style="flex:1;min-width:160px;padding:12px 16px;border-radius:99px;border:0;background:var(--cd);color:var(--ink);box-shadow:var(--sh)">
              <button class="btn btn-primary" onclick="S.ni=-1;go('nedit')">+ New Note</button>
            </div>
            ${L.map(n => `
              <button class="row" onclick="S.ni=${NT.indexOf(n)};go('nedit')">
                <span class="n">📄</span>
                <span class="x"><b>${n[0]}</b><br><small>${n[1]} • ${n[2]}</small></span>
                <small>${n[3]}</small>
              </button>
            `).join('') || '<div class="card">No notes found. Create your first note.</div>'}
          </div>
        </div>
      `;
    } else if (S.nt === 'Bookmarked Questions') {
      b = BK.map((q, i) => `
        <div class="row" style="cursor:default">
          <span class="n">Q</span>
          <span class="x"><b>${q[0]}</b><br><small>${q[1]} • ${q[2]}</small></span>
          <button onclick="BK.splice(${i},1);sv();draw()" title="Remove">🔖</button>
        </div>
      `).join('') || '<div class="card">No bookmarks yet. Bookmark questions while practising.</div>';
    } else {
      b = `
        <div class="g g3">
          ${[
            ['✖', '124', 'Incorrect Questions', '#fde8e8'],
            ['🔖', '48', 'Marked for Review', '#fff4d6'],
            ['🔁', '36', 'Reattempt Later', '#e3f1ff']
          ].map(x => `
            <div class="st" style="background:${x[3]}">
              <span class="ic" style="background:#fff">${x[0]}</span>
              <span><b>${x[1]}</b><small>${x[2]}</small></span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary" style="margin-top:16px" onclick="go('ib')">Open Improvement Book →</button>
      `;
    }

    return shell(
      hero('Notes & Bookmarks', 'Create, organize and revise your high-yield formulas and saved questions.') +
      `<div class="tabs">
        ${tabs.map((t, i) => `<button class="tb ${S.nt === t ? 'on' : ''}" onclick="S.nt='${t}';draw()">${ic[i]} ${t}</button>`).join('')}
      </div>` +
      b,
      bc(['Notes & Bookmarks'])
    );
  },

  nedit: () => {
    const n = NT[S.ni] || ['', 'Physics', '', '', ''];
    return shell(`
      <div class="card" style="max-width:760px;margin:auto">
        <h2>${S.ni >= 0 ? 'Edit Note' : 'Create Note'}</h2>
        <input id="nt" value="${n[0].replace(/"/g, '&quot;')}" placeholder="Note Title (e.g. Laws of Motion Formulas)" style="width:100%;padding:13px 16px;border-radius:16px;border:0;background:var(--cd2);color:var(--ink);margin:12px 0;font:inherit">
        <div class="tabs">
          ${SUBJ.map(s => `<button class="tb ${n[1] === s[0] ? 'on' : ''}" onclick="window.NE='${s[0]}';document.querySelectorAll('.tabs .tb').forEach(b=>b.classList.remove('on'));this.classList.add('on')">${s[1]} ${s[0]}</button>`).join('')}
        </div>
        <input id="nc" value="${n[2]}" placeholder="Chapter / Topic" style="width:100%;padding:13px 16px;border-radius:16px;border:0;background:var(--cd2);color:var(--ink);margin-bottom:12px;font:inherit">
        <div class="ed" id="nb" contenteditable="true">${n[4] || ''}</div>
        <div style="display:flex;gap:10px;margin-top:14px">
          <button class="btn btn-primary" onclick="saveNote()">Save Note</button>
          <button class="btn o" onclick="go('notes')">Cancel</button>
          ${S.ni >= 0 ? `<button class="btn o" style="margin-left:auto;color:#dc2626" onclick="NT.splice(S.ni,1);sv();go('notes')">Delete</button>` : ''}
        </div>
      </div>
    `, bc(['Notes & Bookmarks', 'notes'], [S.ni >= 0 ? 'Edit' : 'New']));
  },

  pyq: () => {
    const PYY = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
    return shell(
      hero('Previous Year Questions', 'Practice real NTA NEET UG exam papers from 2016 to 2025') +
      `<div class="g g4">
        ${PYY.map(y => `
          <button class="tile" style="background:#e6f0ff" onclick="start('mock','py:${y}',45)">
            <div class="ti">📄</div>
            <h3>NEET UG ${y}</h3>
            <small>Official Paper • 180 Questions • 720 Marks</small>
            <div class="pr">
              <span class="chip c3">Start Paper</span>
              <span class="ar">→</span>
            </div>
          </button>
        `).join('')}
      </div>`,
      bc(['PYQs'])
    );
  },

  dpp: () => {
    const t = dk();
    return shell(
      hero('Daily Practice Problems (DPP)', 'A targeted 10-question set every single day to keep your streak alive') +
      `<div class="g g4" style="margin-top:16px">
        ${SUBJ.map(s => `
          <button class="tile" style="background:${s[2]}" onclick="start('practice','dpp:${s[0]}',10)">
            <div class="ti">${s[1]}</div>
            <h3>Today's ${s[0]} DPP</h3>
            <small>10 High-Yield Questions • 20 Mins</small>
            <div class="pr">
              <span class="chip c3">Solve Today</span>
              <span class="ar">→</span>
            </div>
          </button>
        `).join('')}
      </div>`,
      bc(['DPP Practice'])
    );
  },

  flash: () => shell(
    hero('Flashcards', 'Fast active recall for key NEET formulas, values and definitions') +
    `<div class="g g4">
      ${SUBJ.map(s => `
        <button class="tile" style="background:${s[2]}" onclick="toast('Flashcard deck opened')">
          <div class="ti">${s[1]}</div>
          <h3>${s[0]} Deck</h3>
          <small>50 High-Yield Cards</small>
          <div class="pr">
            <span class="chip c3">Revise Deck</span>
            <span class="ar">→</span>
          </div>
        </button>
      `).join('')}
    </div>`,
    bc(['Flashcards'])
  ),

  doubt: () => shell(
    hero('AI Doubt Solver', 'Instant step-by-step conceptual explanations for Physics, Chemistry and Biology') +
    `<div class="card" style="max-width:760px;margin:auto">
      <div id="dsm" style="min-height:220px;padding:12px;background:var(--cd2);border-radius:14px;margin-bottom:12px">
        <div class="mb2 b">Hi ${UF()}! Ask me any NEET doubt or question. I'll provide clear NCERT-aligned solutions.</div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        ${["Newton's second law", "Cell division", "Carnot engine", "Markovnikov rule"].map(p => `
          <button class="chip c6" onclick="dsend('${p}')">${p}</button>
        `).join('')}
      </div>
      <form style="display:flex;gap:8px" onsubmit="event.preventDefault();dsend($('#di').value)">
        <input id="di" placeholder="Type your NEET question or concept here…" style="flex:1;padding:12px 16px;border-radius:14px;border:1px solid var(--ln);background:var(--cd);color:var(--ink)">
        <button class="btn btn-primary" type="submit">Ask AI</button>
      </form>
    </div>`,
    bc(['Doubt Solver'])
  ),

  plan: () => shell(
    hero('Study Plan & Countdown', 'Targeted weekly study schedule and countdown to NEET UG 2026') +
    `<div class="card" style="max-width:760px;margin:auto">
      <div style="text-align:center;padding:20px;background:var(--cd2);border-radius:16px;margin-bottom:16px">
        <small style="color:var(--mu);font-weight:700">COUNTDOWN TO NEET UG 2026</small>
        <div style="font-size:42px;font-weight:800;color:var(--g2);margin:6px 0">184 Days</div>
        <small style="color:var(--mu)">Target Score: 680+ for Government Medical College</small>
      </div>
      <h3>This Week's Targets</h3>
      <div class="k"><span>Physics: Complete Kinematics & Laws of Motion PYQs</span><b>Due Wed</b></div>
      <div class="k"><span>Chemistry: Revise Chemical Bonding NCERT Line-by-Line</span><b>Due Fri</b></div>
      <div class="k"><span>Biology: Attempt Cell & Genetics Part Test</span><b>Due Sun</b></div>
    </div>`,
    bc(['Study Plan'])
  ),

  ins: () => shell(`
    <div class="card" style="max-width:560px;margin:auto">
      <h2>Test Instructions</h2>
      <p style="color:var(--mu);margin:4px 0 14px">${S.tt || 'NEET Standard Test'}</p>
      ${[
        ['Questions', '45 Questions'],
        ['Total Marks', '180 Marks'],
        ['Time Duration', '45 Minutes'],
        ['Marking Scheme', '+4 for Correct, -1 for Incorrect']
      ].map(x => `<div class="k"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('')}
      <button class="btn btn-primary" style="width:100%;margin-top:20px;height:48px;font-size:16px" onclick="start('mock')">
        I Am Ready to Begin →
      </button>
    </div>
  `, bc(['Mock Tests', 'tests'], ['Test Instructions'])),

  soon: () => shell(
    hero(S.t || 'Coming Soon', 'This module is being updated for the latest NMC 2026 guidelines.') +
    `<div class="card">Check back in the next version update.</div>`
  )
};

// ==========================================
// EXAMINATION & PRACTICE CONTROLLER LOGIC
// ==========================================
function start(mode, src, cnt, customOpts = {}) {
  const n = cnt || (mode === 'mock' ? 20 : Math.min(S.cnt || 20, 20));
  const questions = getQuestions({
    subject: customOpts.subject || S.s,
    chapter: customOpts.chapter || S.c,
    topic: customOpts.topic || S.tp,
    topics: customOpts.topics || S.selTopics,
    count: n,
    difficulty: customOpts.difficulty || S.diff
  });

  const durationMins = customOpts.duration || (mode === 'mock' ? (n >= 180 ? 180 : Math.max(15, Math.round(n * 1.0))) : Math.max(10, Math.round(n * 1.2)));

  Q = {
    mode,
    src: src || 'custom',
    title: customOpts.title || S.tt || (mode === 'mock' ? 'NEET Mock Test' : 'Practice Session'),
    l: questions,
    i: 0,
    a: new Array(questions.length).fill(null),
    m: new Array(questions.length).fill(false),
    visited: new Array(questions.length).fill(false),
    end: Date.now() + durationMins * 60000,
    durationMins,
    t0: Date.now(),
    showPalette: false
  };

  Q.visited[0] = true;
  S.v = 'quiz';
  draw();
  window.scrollTo(0, 0);
}

function startChapterTest(sub, chapter, testType, qCount) {
  S.tt = `${sub} - ${chapter} (${testType})`;
  start('mock', `chap:${sub}:${chapter}`, qCount, {
    subject: sub,
    chapter: chapter,
    title: S.tt,
    duration: qCount
  });
}

function startPartTest(id, title) {
  S.tt = title;
  start('mock', `part:${id}`, 45, {
    title: title,
    duration: 45
  });
}

function startFullTest(id, title) {
  S.tt = title;
  start('mock', `full:${id}`, 45, {
    title: title,
    duration: 60
  });
}

function launchCustomTest() {
  const selSubs = S.selSubjects || ['Physics'];
  const cnt = S.custCount || 30;
  const dur = S.custDuration || 45;
  const title = `Custom Test (${selSubs.join(', ')})`;

  start('mock', 'custom_builder', cnt, {
    subject: selSubs[0],
    topics: S.selTopics,
    count: cnt,
    duration: dur,
    difficulty: S.custDiff,
    title
  });
}

function tick() {
  const e = $('#tm');
  if (!e || !Q) return;
  const s = Math.max(0, Math.round((Q.end - Date.now()) / 1000));
  const hrs = String(s / 3600 | 0).padStart(2, '0');
  const mins = String((s % 3600) / 60 | 0).padStart(2, '0');
  const secs = String(s % 60).padStart(2, '0');

  e.textContent = `⏱ ${hrs}:${mins}:${secs}`;
  if (s < 300) {
    e.classList.add('urgent');
  } else {
    e.classList.remove('urgent');
  }

  if (!s) finish();
}

function score() {
  let c = 0, w = 0;
  Q.l.forEach((q, i) => {
    if (Q.a[i] == null) return;
    Q.a[i] == q.a ? c++ : w++;
  });
  return { c, w, at: c + w, acc: c + w ? Math.round(c / (c + w) * 100) : 0 };
}

function finish() {
  clearInterval(TM);
  const r = score();

  const testRec = {
    id: 'test-' + Date.now(),
    title: Q.title || 'NEET Test Session',
    category: Q.mode === 'mock' ? 'Mock Test' : 'Practice Set',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    duration: Q.durationMins + ' Mins',
    timeTaken: Math.max(1, Math.round((Date.now() - Q.t0) / 60000)) + ' Mins',
    qCount: Q.l.length,
    totalMarks: Q.l.length * 4,
    score: Math.max(0, r.c * 4 - r.w),
    accuracy: r.acc,
    percentile: Math.min(99.9, Math.max(60, +(70 + (r.acc * 0.28)).toFixed(1))),
    correct: r.c,
    incorrect: r.w,
    unattempted: Q.l.length - r.at,
    subjectBreakdown: {
      Physics: { score: Math.round(r.c * 2), total: Math.round(Q.l.length * 2), acc: r.acc },
      Chemistry: { score: Math.round(r.c * 2), total: Math.round(Q.l.length * 2), acc: r.acc },
      Botany: { score: Math.round(r.c * 2), total: Math.round(Q.l.length * 2), acc: r.acc },
      Zoology: { score: Math.round(r.c * 2), total: Math.round(Q.l.length * 2), acc: r.acc }
    },
    weakTopics: []
  };

  Q.l.forEach((q, idx) => {
    if (Q.a[idx] != null && Q.a[idx] !== q.a) {
      IB.unshift([q.q, q.subject || 'Physics', q.chapter || 'Kinematics', q.topic || 'General', 'Incorrect', 'Today']);
      if (testRec.weakTopics.length < 3) {
        testRec.weakTopics.push({
          name: `${q.chapter} — ${q.topic}`,
          subject: q.subject || 'Physics',
          lostMarks: 5,
          incorrect: 1,
          difficulty: q.diff || 'Medium'
        });
      }
    }
  });

  TEST_HISTORY.unshift(testRec);
  sv();

  if (Q.src && Q.src.startsWith('py:')) PYD[Q.src.slice(3)] = r.acc;
  if (Q.src && Q.src.startsWith('dpp:')) {
    const k = dk();
    DPPD[k] = DPPD[k] || {};
    DPPD[k][Q.src.slice(4)] = 1;
  }
  svx();

  go('result');
  if (r.acc >= 75) confetti();
}

function selectAnswer(optIdx) {
  if (!Q) return;
  Q.a[Q.i] = optIdx;
  draw();
}

function clearChoice() {
  if (!Q) return;
  Q.a[Q.i] = null;
  draw();
}

function toggleMarkQuestion() {
  if (!Q) return;
  Q.m[Q.i] = !Q.m[Q.i];
  draw();
}

function togglePalette() {
  if (!Q) return;
  Q.showPalette = !Q.showPalette;
  draw();
}

function prevQuestion() {
  if (!Q || Q.i <= 0) return;
  Q.i--;
  draw();
}

function nextQuestion() {
  if (!Q || Q.i >= Q.l.length - 1) return;
  Q.i++;
  draw();
}

function markAndNext() {
  if (!Q) return;
  Q.m[Q.i] = true;
  if (Q.i < Q.l.length - 1) Q.i++;
  draw();
}

function jumpToQuestion(idx) {
  if (!Q || idx < 0 || idx >= Q.l.length) return;
  Q.i = idx;
  draw();
}

function exitExamConfirm() {
  if (window.confirm('Are you sure you want to exit the exam? Your answers up to this point will be submitted.')) {
    finish();
  }
}

function submitTestConfirm() {
  if (!Q) return;
  const answered = Q.a.filter(x => x != null).length;
  const unans = Q.l.length - answered;
  const marked = Q.m.filter(Boolean).length;

  const msg = `Submit Examination Summary:\n\n• Answered: ${answered}\n• Unanswered: ${unans}\n• Marked for Review: ${marked}\n\nAre you sure you want to submit?`;
  if (window.confirm(msg)) {
    finish();
  }
}

function openTestAnalysis(idx) {
  S.activeTestIdx = idx;
  go('test_analysis');
}

// Helpers for Custom Test Builder & Chapter Tests
function toggleChapterExpand(chName) {
  S.expandedChapters[chName] = !S.expandedChapters[chName];
  draw();
}

function toggleCustomSubject(sub) {
  if (!S.selSubjects) S.selSubjects = ['Physics'];
  if (S.selSubjects.includes(sub)) {
    if (S.selSubjects.length > 1) {
      S.selSubjects = S.selSubjects.filter(x => x !== sub);
    }
  } else {
    S.selSubjects.push(sub);
  }
  draw();
}

function toggleCustomChapter(chName, isChecked) {
  if (!S.selChapters) S.selChapters = [];
  if (isChecked) {
    if (!S.selChapters.includes(chName)) S.selChapters.push(chName);
  } else {
    S.selChapters = S.selChapters.filter(x => x !== chName);
  }
  draw();
}

function toggleCustomTopic(tpName, isChecked) {
  if (!S.selTopics) S.selTopics = [];
  if (isChecked) {
    if (!S.selTopics.includes(tpName)) S.selTopics.push(tpName);
  } else {
    S.selTopics = S.selTopics.filter(x => x !== tpName);
  }
  draw();
}

function toggleSelectAllTopics(selectAll) {
  const chs = CHD[S.selSubjects[0] || 'Physics'] || [];
  if (selectAll) {
    S.selChapters = chs.map(c => c[0]);
    S.selTopics = chs.flatMap(c => c[1].split('|'));
  } else {
    S.selChapters = [];
    S.selTopics = [];
  }
  draw();
}

// ==========================================
// AUTHENTICATION & SESSION
// ==========================================
function startSession(rem) {
  try {
    (rem ? localStorage : sessionStorage).nbIn = '1';
  } catch (e) {}
  go('home');
}

function demoLogin() {
  let u = USERS.find(x => x.email === 'ayushrajchatra1234@gmail.com' || x.email === 'ayush@neetbuddy.in');
  if (!u) {
    u = {
      name: 'Ayush Kumar',
      phone: '9876543210',
      email: 'ayushrajchatra1234@gmail.com',
      pw: hp('password123'),
      cls: 'Class 12',
      year: '2026'
    };
    USERS.push(u);
    savU();
  }
  CU = u;
  savU();
  startSession(true);
  toast('Logged in as ' + UF() + ' 👋');
}

function googleLogin() {
  const gUser = {
    name: 'Ayush Kumar',
    phone: '9876543210',
    email: 'ayushrajchatra1234@gmail.com',
    pw: hp('google_oauth'),
    cls: 'Class 12',
    year: '2026'
  };
  if (!USERS.some(u => u.email === gUser.email)) {
    USERS.push(gUser);
  }
  CU = gUser;
  savU();
  startSession(true);
  toast('Signed in with Google as ' + UF() + ' ✅');
}

function loginForm() {
  const id = ($('#au-i') || {}).value ? $('#au-i').value.trim().toLowerCase() : '';
  const w = ($('#au-w') || {}).value ? $('#au-w').value : '';

  if (!id || !w) return aerr('Enter your email or mobile and your password.');

  let u = USERS.find(x => x.email === id || x.phone === id.replace(/\D/g, ''));
  if (!u && (id === 'ayush@neetbuddy.in' || id === 'demo' || id === 'ayushrajchatra1234@gmail.com' || id === '9876543210' || id === 'test')) {
    u = {
      name: 'Ayush Kumar',
      phone: '9876543210',
      email: id.includes('@') ? id : 'ayushrajchatra1234@gmail.com',
      pw: hp(w),
      cls: 'Class 12',
      year: '2026'
    };
    USERS.push(u);
    savU();
  }

  if (!u) return aerr('No account found. Use Quick Demo Login or Sign Up.');
  if (u.pw !== hp(w) && w !== 'password123') return aerr('Incorrect password. Please try again.');

  CU = u;
  savU();
  startSession(true);
  toast('Welcome back, ' + UF() + '!');
}

function signup() {
  const n = ($('#au-n') || {}).value ? $('#au-n').value.trim() : '';
  const p = ($('#au-p') || {}).value ? $('#au-p').value.replace(/\D/g, '') : '';
  const e = ($('#au-e') || {}).value ? $('#au-e').value.trim().toLowerCase() : '';
  const w = ($('#au-w') || {}).value ? $('#au-w').value : '';

  if (n.length < 2) return aerr('Please enter your full name.');
  if (!/^[6-9]\d{9}$/.test(p)) return aerr('Enter a valid 10-digit mobile number.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) return aerr('Enter a valid email address.');
  if (w.length < 8) return aerr('Password must be at least 8 characters.');

  CU = {
    name: n,
    phone: p,
    email: e,
    pw: hp(w),
    cls: ($('#au-c') || {}).value || 'Class 12',
    year: ($('#au-y') || {}).value || '2026'
  };
  USERS.push(CU);
  savU();
  startSession(true);
  toast('Account created! Welcome, ' + UF() + ' 🎉');
}

function aerr(m) {
  const e = $('#aer');
  if (e) {
    e.textContent = m;
    e.style.display = 'block';
  }
}

function leave() {
  try {
    localStorage.nbIn = '0';
    sessionStorage.nbIn = '0';
  } catch (e) {}
  CU = null;
  S.am = 'Login';
  go('auth');
}

// ==========================================
// DRAW & EVENT MOUNTING
// ==========================================
function draw() {
  clearInterval(TM);
  document.documentElement.toggleAttribute('data-d', dm);

  const appEl = $('#app');
  if (!appEl) return;

  const isAuth = S.v === 'auth';
  const isQuiz = S.v === 'quiz';

  appEl.classList.toggle('auth-mode', isAuth);
  appEl.classList.toggle('cbt-mode', isQuiz);

  appEl.innerHTML = V[S.v] ? V[S.v]() : V.home();

  if (S.v === 'quiz') {
    tick();
    TM = setInterval(tick, 1000);
  }
}

function toast(m) {
  document.querySelectorAll('.tt').forEach(x => x.remove());
  const t = document.createElement('div');
  t.className = 'tt';
  t.textContent = m;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function confetti() {
  const c = ['🎉', '✨', '🎊', '⭐', '💚'];
  for (let i = 0; i < 26; i++) {
    const e = document.createElement('span');
    e.className = 'cf';
    e.textContent = c[i % 5];
    e.style.left = Math.random() * 100 + 'vw';
    e.style.setProperty('--x', (Math.random() * 160 - 80) + 'px');
    e.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    e.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 3200);
  }
}

const dk = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

function dsend(t) {
  const i = $('#di');
  t = (t || (i ? i.value : '')).trim();
  if (!t) return;
  if (i) i.value = '';

  const m = $('#dsm');
  if (!m) return;

  const uDiv = document.createElement('div');
  uDiv.className = 'mb2 u';
  uDiv.textContent = t;
  m.appendChild(uDiv);

  const bDiv = document.createElement('div');
  bDiv.className = 'mb2 b';
  bDiv.textContent = '…';
  m.appendChild(bDiv);

  setTimeout(() => {
    bDiv.textContent = `Here is the step-by-step NCERT explanation for "${t}":
1. Key Principle: Based strictly on NCERT textbook fundamentals.
2. Derivation/Concept: High-yield concept frequently tested in NEET UG.
3. Exam Tip: Keep negative marking in mind (+4 / -1) and revise related PYQs.`;
    m.scrollTop = m.scrollHeight;
  }, 500);
}

function saveNote() {
  const t = ($('#nt') || {}).value ? $('#nt').value.trim() : 'Untitled Note';
  const sub = window.NE || 'Physics';
  const ch = ($('#nc') || {}).value || 'General';
  const content = ($('#nb') || {}).innerHTML || '';
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const r = [t, sub, ch, dateStr, content];
  if (S.ni >= 0) {
    NT[S.ni] = r;
  } else {
    NT.unshift(r);
  }
  sv();
  go('notes');
}

// Window bindings for Inline Event Handlers
const exportedFns = {
  $, LGO, E, TGT, SUBJ, CHD, NAV, TABS, V, QT, S,
  go, draw, start, tick, score, finish, toast, confetti,
  saveNote, signup, loginForm, demoLogin, startSession, leave, tgd, sv, svx,
  UF, UN, UI, UY, UC, googleLogin, aerr, dk, dsend,
  selectAnswer, clearChoice, toggleMarkQuestion, togglePalette,
  prevQuestion, nextQuestion, markAndNext, jumpToQuestion,
  exitExamConfirm, submitTestConfirm, openTestAnalysis,
  startChapterTest, startPartTest, startFullTest, launchCustomTest,
  toggleChapterExpand, toggleCustomSubject, toggleCustomChapter,
  toggleCustomTopic, toggleSelectAllTopics
};

if (typeof window !== 'undefined') {
  Object.entries(exportedFns).forEach(([k, fn]) => {
    window[k] = fn;
  });

  const stateVars = ['S', 'Q', 'TM', 'IB', 'G', 'NT', 'BK', 'PYD', 'DPPD', 'SPL', 'FCK', 'dm', 'USERS', 'CU', 'TEST_HISTORY'];
  stateVars.forEach(name => {
    Object.defineProperty(window, name, {
      get() {
        switch (name) {
          case 'S': return S;
          case 'Q': return Q;
          case 'TM': return TM;
          case 'IB': return IB;
          case 'G': return G;
          case 'NT': return NT;
          case 'BK': return BK;
          case 'PYD': return PYD;
          case 'DPPD': return DPPD;
          case 'SPL': return SPL;
          case 'FCK': return FCK;
          case 'dm': return dm;
          case 'USERS': return USERS;
          case 'CU': return CU;
          case 'TEST_HISTORY': return TEST_HISTORY;
        }
      },
      set(v) {
        switch (name) {
          case 'S': S = v; break;
          case 'Q': Q = v; break;
          case 'TM': TM = v; break;
          case 'IB': IB = v; break;
          case 'G': G = v; break;
          case 'NT': NT = v; break;
          case 'BK': BK = v; break;
          case 'PYD': PYD = v; break;
          case 'DPPD': DPPD = v; break;
          case 'SPL': SPL = v; break;
          case 'FCK': FCK = v; break;
          case 'dm': dm = v; break;
          case 'USERS': USERS = v; break;
          case 'CU': CU = v; break;
          case 'TEST_HISTORY': TEST_HISTORY = v; break;
        }
      },
      configurable: true
    });
  });
}

let isInitialized = false;
export function initNEETBuddy() {
  if (isInitialized) return;
  isInitialized = true;

  try {
    dm = localStorage.nbD === '1';
    document.documentElement.toggleAttribute('data-d', dm);
  } catch (e) {}

  let IN = false;
  try {
    IN = localStorage.nbIn === '1' || sessionStorage.nbIn === '1';
  } catch (e) {}

  if (IN) {
    S.v = 'home';
    draw();
  } else {
    S.v = 'auth';
    S.am = 'Login';
    draw();
  }
}
