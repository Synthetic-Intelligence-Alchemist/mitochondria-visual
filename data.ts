
import { LocationType, Treatment } from './types';

export const treatments: Treatment[] = [
  // ==============================================
  // PATHOLOGIES (The Problem)
  // ==============================================
  {
    id: 'aging',
    name: 'Age-Related Dysfunction',
    category: 'Pathology',
    location: LocationType.SYSTEMIC,
    specificSite: 'Global Mitochondrial Network',
    indications: 'Chronological Aging (>40y), Frailty Syndrome, Sarcopenia, Progeria.',
    mechanism: 'Progressive loss of proteostasis, genomic instability, and telomere attrition. NAD+ levels drop by ~50% every 20 years, inhibiting Sirtuin activity and DNA repair.',
    effect: 'Systemic energy failure (ATP drop), accumulation of senescent "zombie" cells, and reduced ability to respond to metabolic stress.',
    clinicalStatus: 'Universal Process',
    protocol: 'Sedentary lifestyle, chronic caloric surplus, and poor circadian hygiene accelerate this process.',
    safetyProfile: 'Leads to multi-organ functional decline, cognitive impairment, and eventual organismal death.',
    coordinates: { x: 500, y: 300 }
  },
  {
    id: 'insulin-resistance',
    name: 'Metabolic Inflexibility',
    category: 'Pathology',
    location: LocationType.SYSTEMIC, 
    specificSite: 'Cell Membrane & PDH Complex',
    indications: 'Metabolic Syndrome, Type 2 Diabetes, PCOS, Visceral Obesity.',
    mechanism: 'Chronic nutrient overload leads to serine phosphorylation of IRS-1, blocking insulin signaling. Pyruvate Dehydrogenase (PDH) becomes inhibited by high Acetyl-CoA.',
    effect: 'Mitochondria cannot access glucose despite high blood sugar ("starvation in plenty"). Cells lose the ability to switch between burning fat and sugar.',
    clinicalStatus: 'Epidemic Prevalence',
    protocol: 'High glycemic diet, frequent feeding frequency, lack of contractile stimulus.',
    safetyProfile: 'Primary driver of cardiovascular disease, neurodegeneration (Type 3 Diabetes), and cancer risk.',
    coordinates: { x: 100, y: 100 }
  },
  {
    id: 'oxidative-stress',
    name: 'Chronic Oxidative Stress',
    category: 'Pathology',
    location: LocationType.ETC,
    specificSite: 'Complex I and III Leaks',
    indications: 'Chronic Inflammation, Environmental Toxicity, Ischemia-Reperfusion, Smoking.',
    mechanism: 'Dysfunctional ETC complexes drop electrons prematurely to Oxygen, forming Superoxide (O2•-) instead of Water. This overwhelms endogenous antioxidants (SOD2, Glutathione).',
    effect: 'Peroxidation of membrane lipids (destroying cristae structure) and mutation of mtDNA, creating a vicious cycle of further dysfunction.',
    clinicalStatus: 'Underlies most chronic diseases',
    protocol: 'Exposure to heavy metals, pesticides, processed seed oils, and chronic psychological stress.',
    safetyProfile: 'Directly damages cellular machinery, triggers apoptosis or senescence, and promotes oncogenesis.',
    coordinates: { x: 400, y: 280 }
  },

  // ==============================================
  // INTERVENTIONS (The Solution)
  // ==============================================

  // --- ETC ---
  {
    id: 'metformin',
    name: 'Metformin',
    category: 'Intervention',
    location: LocationType.ETC,
    specificSite: 'Complex I (NADH Dehydrogenase)',
    indications: 'Type 2 Diabetes, Pre-diabetes, PCOS, Life Extension (Off-label).',
    mechanism: 'Acts as a mild, reversible inhibitor of Complex I. This creates a pseudo-energy crisis (raising AMP:ATP ratio), which activates the master metabolic regulator AMPK.',
    effect: 'AMPK activation inhibits mTOR (aging pathway), stimulates autophagy, increases insulin sensitivity, and boosts fatty acid oxidation.',
    clinicalStatus: 'FDA Approved / TAME Trial Candidate',
    protocol: '500mg - 1000mg extended release with dinner. Some longevity protocols cycle off during intense hypertrophy training.',
    safetyProfile: 'GI distress common initially. Risk of B12 deficiency long-term. Lactic acidosis risk is extremely rare but serious.',
    coordinates: { x: 160, y: 270 }
  },
  {
    id: 'coq10',
    name: 'Coenzyme Q10 (Ubiquinol)',
    category: 'Intervention',
    location: LocationType.ETC,
    specificSite: 'Mobile Carrier (I/II -> III)',
    indications: 'Statin-induced Myopathy, Heart Failure, Migraine, Fibromyalgia.',
    mechanism: 'The only lipid-soluble antioxidant synthesized endogenously. It physically ferries electrons between complexes and protects inner membrane lipids from peroxidation.',
    effect: 'Restores bioenergetics in high-demand tissues (heart, brain) and reduces leakage of reactive oxygen species.',
    clinicalStatus: 'Dietary Supplement / Standard of Care',
    protocol: '100mg - 300mg daily. Ubiquinol form is 3-8x more bioavailable than Ubiquinone. Must be taken with fat.',
    safetyProfile: 'Extremely safe. Very rarely causes mild insomnia if taken too close to sleep.',
    coordinates: { x: 350, y: 310 }
  },
  {
    id: 'methylene-blue',
    name: 'Methylene Blue',
    category: 'Intervention',
    location: LocationType.ETC,
    specificSite: 'Complex I & IV Bypass',
    indications: 'Methemoglobinemia, Cognitive Enhancement, Septic Shock, Neuroprotection.',
    mechanism: 'Acts as an artificial electron cycler. It accepts electrons from NADH (bypassing Complex I) and donates them directly to Cytochrome C (Complex IV).',
    effect: 'Restores ATP production in metabolically compromised cells, increases oxygen consumption, and acts as a potent antioxidant.',
    clinicalStatus: 'Research Compound / FDA (specific use)',
    protocol: '0.5mg - 4mg/kg (Low Dose). USP Grade purity is critical to avoid heavy metal contamination.',
    safetyProfile: 'MAO Inhibitor - fatal interaction with SSRIs. Turns urine blue/green. High doses are cytotoxic.',
    coordinates: { x: 220, y: 350 }
  },
  {
    id: 'red-light',
    name: 'Red Light Therapy',
    category: 'Intervention',
    location: LocationType.ETC,
    specificSite: 'Complex IV (Cytochrome C Oxidase)',
    indications: 'Wound Healing, Skin Rejuvenation, Muscle Recovery, TBI, Hair Loss.',
    mechanism: 'Photobiomodulation: Red/NIR light dissociates inhibitory Nitric Oxide (NO) from the copper centers of Complex IV, restoring electron flow.',
    effect: 'Immediate increase in ATP synthesis, modulation of ROS signaling, and reduction of systemic inflammation.',
    clinicalStatus: 'FDA Cleared Devices Available',
    protocol: '10-20 mins daily. 660nm (superficial/skin) and 850nm (deep tissue/muscle/brain). Irradiance >50mW/cm².',
    safetyProfile: 'Non-thermal and non-invasive. Eye protection recommended for high-intensity panels.',
    coordinates: { x: 620, y: 270 }
  },

  // --- MATRIX ---
  {
    id: 'nad-precursors',
    name: 'NAD+ Precursors (NR, NMN)',
    category: 'Intervention',
    location: LocationType.MATRIX,
    specificSite: 'Enzymatic Cofactor Pool',
    indications: 'Age-related NAD+ decline, Metabolic Dysfunction, Jet Lag.',
    mechanism: 'Feeds the salvage pathway to replenish NAD+, a critical substrate for Sirtuins (SIRT1/3) and DNA repair enzymes (PARPs).',
    effect: 'SIRT3 activation deacetylates mitochondrial proteins, improving fatty acid oxidation and antioxidant defenses (SOD2).',
    clinicalStatus: 'Dietary Supplement',
    protocol: '300mg - 1000mg daily (NMN or Nicotinamide Riboside). Often paired with TMG to support methylation.',
    safetyProfile: 'Generally safe. Theoretical concern regarding tumor promotion in active cancer (fueling growth).',
    coordinates: { x: 200, y: 480 }
  },
  {
    id: 'keto',
    name: 'Ketogenic Diet / Exogenous Ketones',
    category: 'Intervention',
    location: LocationType.MATRIX,
    specificSite: 'Krebs Cycle Entry',
    indications: 'Refractory Epilepsy, Type 2 Diabetes Reversal, Alzheimer\'s Prevention.',
    mechanism: 'Shifts metabolism from glucose to ketone bodies (Beta-Hydroxybutyrate). Ketones bypass the often-blocked PDH complex and burn more efficiently.',
    effect: 'Increases the Delta-G of ATP hydrolysis (more energy per molecule) and acts as an HDAC inhibitor to reduce oxidative stress.',
    clinicalStatus: 'Medical Diet / Lifestyle',
    protocol: '<30g Net Carbs/day. Ketone Esters (10-25g) for acute performance or cognitive boost.',
    safetyProfile: 'Electrolyte imbalance ("Keto Flu") common initially. Caution in specific genetic fatty acid oxidation defects.',
    coordinates: { x: 390, y: 480 }
  },
  {
    id: 'melatonin',
    name: 'Melatonin',
    category: 'Intervention',
    location: LocationType.MATRIX,
    specificSite: 'Deep Matrix Accumulation',
    indications: 'Insomnia, GERD, Cancer Adjuvant, Neuroprotection.',
    mechanism: 'Mitochondria synthesize their own melatonin. It concentrates 100x higher in the matrix than blood, scavenging hydroxyl radicals directly.',
    effect: 'Preserves cardiolipin and mtDNA integrity. Regulates the circadian rhythm of mitochondrial fission/fusion.',
    clinicalStatus: 'Dietary Supplement',
    protocol: 'Standard sleep: 0.3mg - 5mg. Oxidative stress protocols: 10mg - 60mg+ (Research dosing).',
    safetyProfile: 'Vivid dreams, grogginess. Safe even at extremely high doses in trials, but chronobiology matters.',
    coordinates: { x: 690, y: 500 }
  },
  {
    id: 'ala',
    name: 'Alpha Lipoic Acid (ALA)',
    category: 'Intervention',
    location: LocationType.MATRIX,
    specificSite: 'Dehydrogenase Complexes',
    indications: 'Diabetic Neuropathy, Heavy Metal Toxicity, Insulin Resistance.',
    mechanism: 'Essential cofactor for Pyruvate Dehydrogenase (PDH) and Alpha-Ketoglutarate Dehydrogenase. It is both water and fat soluble.',
    effect: 'Facilitates aerobic metabolism and recycles other antioxidants (Vitamin C, E, Glutathione) extending their lifespan.',
    clinicalStatus: 'Supplement / IV Therapy',
    protocol: '300mg - 600mg daily. R-Lipoic Acid (Na-R-ALA) is the biologically stable and active form.',
    safetyProfile: 'Can act as a mild chelator (move metals). Potential hypoglycemia in diabetics on medication.',
    coordinates: { x: 300, y: 480 }
  },

  // --- MEMBRANE STRUCTURE ---
  {
    id: 'ss31',
    name: 'SS-31 (Elamipretide)',
    category: 'Intervention',
    location: LocationType.INNER_MEMBRANE,
    specificSite: 'Cardiolipin Interaction',
    indications: 'Primary Mitochondrial Myopathy, Barth Syndrome, Heart Failure.',
    mechanism: 'A tetrapeptide that selectively binds to Cardiolipin, a phospholipid unique to the inner membrane that organizes the ETC.',
    effect: 'Stabilizes the physical curvature of cristae and "super-complexes", fixing the electron tunnel to prevent leaks.',
    clinicalStatus: 'Phase 3 Clinical Trials',
    protocol: 'Subcutaneous Injection or IV. Not currently available as a consumer supplement.',
    safetyProfile: 'Injection site reactions. Generally well tolerated in clinical settings.',
    coordinates: { x: 500, y: 380 }
  },
  {
    id: 'omega3',
    name: 'Omega-3 (DHA/EPA)',
    category: 'Intervention',
    location: LocationType.INNER_MEMBRANE,
    specificSite: 'Phospholipid Bilayer',
    indications: 'Hypertriglyceridemia, Depression, Cardiovascular Prevention.',
    mechanism: 'Incorporates into mitochondrial membranes, displacing stiff saturated/trans fats. Enhances membrane fluidity.',
    effect: 'Allows ETC complexes to move and collide more frequently (increasing flux) and supports rapid signal transduction.',
    clinicalStatus: 'Standard of Care / Supplement',
    protocol: '2g - 4g daily combined EPA/DHA. High oxidation standards (TOTOX) are essential for quality.',
    safetyProfile: 'Blood thinning properties. Fishy aftertaste. Sourcing matters (mercury risk in poor quality oils).',
    coordinates: { x: 400, y: 300 }
  },

  // --- BIOGENESIS & PEPTIDES ---
  {
    id: 'sunlight',
    name: 'Morning Sunlight',
    category: 'Intervention',
    location: LocationType.BIOGENESIS,
    specificSite: 'Retina (SCN) & Subcellular Melatonin',
    indications: 'Circadian Disruption, Sleep Latency, Seasonal Depression, Fatigue.',
    mechanism: 'Blue light (~480nm) signals the SCN to anchor the circadian rhythm. Near-Infrared (NIR) penetrates deep tissue to stimulate Cytochrome C Oxidase and generate subcellular melatonin.',
    effect: 'Entrains circadian rhythms for optimal repair windows and boosts antioxidant capacity via subcellular melatonin.',
    clinicalStatus: 'Lifestyle Foundation',
    protocol: '10-30 mins outdoor exposure within 1h of waking. Maximize skin area. Do not view through glass.',
    safetyProfile: 'Risk of UV damage if exposed during high solar noon. Morning/Evening windows are safest.',
    coordinates: { x: 120, y: 60 }
  },
  {
    id: 'pqq',
    name: 'PQQ (Pyrroloquinoline Quinone)',
    category: 'Intervention',
    location: LocationType.BIOGENESIS,
    specificSite: 'Nuclear Signaling',
    indications: 'Cognitive Decline, Poor Sleep, Fatigue.',
    mechanism: 'A redox cofactor that stimulates the PGC-1α pathway and CREB, signaling the nucleus to build new mitochondria.',
    effect: 'Induces Biogenesis: increases the actual number and density of mitochondria per cell.',
    clinicalStatus: 'Novel Dietary Ingredient',
    protocol: '10mg - 20mg daily. Synergistic when stacked with CoQ10.',
    safetyProfile: 'No known toxicity at standard doses. Human long-term data is still developing.',
    coordinates: { x: 850, y: 100 }
  },
  {
    id: 'mots-c',
    name: 'MOTS-c',
    category: 'Intervention',
    location: LocationType.BIOGENESIS,
    specificSite: 'Retrograde Signaling (mtDNA)',
    indications: 'Obesity, Insulin Resistance, Physical Frailty.',
    mechanism: 'A peptide encoded in the mitochondrial DNA (12S rRNA) that translocates to the nucleus to regulate metabolic genes.',
    effect: 'Mimics the metabolic effects of exercise, inhibiting the folate cycle to boost insulin sensitivity and fat metabolism.',
    clinicalStatus: 'Research Peptide',
    protocol: 'Subcutaneous injection (Experimental). e.g., 5mg - 10mg weekly.',
    safetyProfile: 'Injection site pain. Potential immune reaction (antibodies) if peptide quality is low.',
    coordinates: { x: 750, y: 150 }
  },
  {
    id: 'humanin',
    name: 'Humanin',
    category: 'Intervention',
    location: LocationType.BIOGENESIS,
    specificSite: 'Cytoprotection (Bax Inhibition)',
    indications: 'Alzheimer\'s Disease, CVD, Chemotherapy Protection.',
    mechanism: 'A mitochondrial derived peptide that binds to Bax/Bak proteins, preventing them from inducing apoptosis (cell death).',
    effect: 'Potent cytoprotection—keeps cells alive under high stress conditions (oxidative, toxic, or ischemic).',
    clinicalStatus: 'Research Peptide',
    protocol: 'Subcutaneous or Intranasal (Experimental).',
    safetyProfile: 'Unknown long-term risks. Keeping damaged cells alive (anti-apoptosis) carries theoretical cancer risk.',
    coordinates: { x: 690, y: 420 }
  },
  {
    id: 'urolithin-a',
    name: 'Urolithin A',
    category: 'Intervention',
    location: LocationType.BIOGENESIS,
    specificSite: 'Mitophagy Induction',
    indications: 'Age-related Muscle Decline, Low Endurance.',
    mechanism: 'Activates the PINK1/Parkin pathway to identify and tag defective mitochondria for lysosomal degradation.',
    effect: 'Mitophagy: Clears out metabolic "garbage" (senescent mitochondria) to make room for healthy, efficient organelles.',
    clinicalStatus: 'GRAS Supplement',
    protocol: '500mg - 1000mg daily. Direct supplementation preferred as only ~40% of people have the gut biome to make it.',
    safetyProfile: 'Very safe. No significant side effects observed in clinical trials.',
    coordinates: { x: 850, y: 200 }
  },
  {
    id: 'zone2',
    name: 'Zone 2 Exercise',
    category: 'Intervention',
    location: LocationType.BIOGENESIS,
    specificSite: 'Bioenergetic Feedback',
    indications: 'Metabolic Syndrome, Athletic Base, Longevity.',
    mechanism: 'Steady-state exercise at <2mmol Lactate levels. Maximizes fat oxidation demands without overwhelming clearance systems.',
    effect: 'The most potent physiological signal for increasing mitochondrial density, efficiency, and flexibility.',
    clinicalStatus: 'Lifestyle Foundation',
    protocol: '45-90 mins, 3-4x/week. Conversational pace (RPE 3-4/10). Nasal breathing recommended.',
    safetyProfile: 'Lowest risk form of exercise. Joint wear and tear is the only significant concern over decades.',
    coordinates: { x: 500, y: 250 }
  },
  {
    id: 'rapamycin',
    name: 'Rapamycin',
    category: 'Intervention',
    location: LocationType.BIOGENESIS,
    specificSite: 'mTORC1 Complex',
    indications: 'Organ Transplant (High Dose), Longevity (Low Dose).',
    mechanism: 'Allosteric inhibitor of mTORC1. Tricks the cell into a "fasting" state, inhibiting growth and activating repair.',
    effect: 'Massively upregulates autophagy/mitophagy and reduces cellular senescence. Gold standard for lifespan extension in mice.',
    clinicalStatus: 'FDA Approved (Transplant) / Off-label',
    protocol: 'Once weekly dosing (e.g., 3mg-6mg) to minimize immune suppression while pulsing autophagy.',
    safetyProfile: 'Mouth sores (aphthous ulcers), lipid dysregulation, immune suppression. Requires strict medical oversight.',
    coordinates: { x: 900, y: 50 }
  },

  // --- INTERMEMBRANE ---
  {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    category: 'Intervention',
    location: LocationType.INTERMEMBRANE,
    specificSite: 'Creatine Kinase (mtCK)',
    indications: 'Athletic Performance, Sarcopenia, TBI, Cognitive Fatigue.',
    mechanism: 'Phosphorylated by mitochondrial CK using ATP. Acts as a high-energy spatial shuttle to move energy out to the cytosol.',
    effect: 'Buffers ATP levels during high-intensity demand and reduces production of Reactive Oxygen Species by keeping ADP available.',
    clinicalStatus: 'Dietary Supplement',
    protocol: '3g - 5g daily. Consistent intake matters more than timing. Monohydrate is the gold standard form.',
    safetyProfile: 'Extremely safe. Minor transient water weight gain. Renal safety confirmed in healthy populations.',
    coordinates: { x: 840, y: 210 }
  }
];