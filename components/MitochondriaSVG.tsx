
import React from 'react';
import { motion } from 'framer-motion';
import { Treatment, LocationType } from '../types';

interface Props {
  selectedTreatment: Treatment | null;
  onSelect: (id: string | null) => void;
  showFlow: boolean;
}

export const MitochondriaSVG: React.FC<Props> = ({ selectedTreatment, onSelect, showFlow }) => {
  
  const isActive = (location: LocationType) => {
    if (!selectedTreatment) return true; 
    // If pathology is global/systemic, everything might be relevant, but we highlight specific areas
    if (selectedTreatment.category === 'Pathology') return true;
    return selectedTreatment.location === location;
  };

  const isSpecificActive = (id: string) => {
    if (!selectedTreatment) return false;
    return selectedTreatment.id === id;
  };

  // === DISEASE STATE MODIFIERS ===
  const isAging = isSpecificActive('aging');
  const isInsulinResistant = isSpecificActive('insulin-resistance');
  const isOxidativeStress = isSpecificActive('oxidative-stress');

  // Time Dilation for Aging: slows everything down by 3x
  const timeScale = isAging ? 3 : 1;
  const getDuration = (baseDuration: number) => `${baseDuration * timeScale}s`;

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 relative overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full max-w-full select-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="matrixGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity={isAging ? "0.05" : "0.1"} />
            <stop offset="100%" stopColor="#78350f" stopOpacity={isAging ? "0.2" : "0.4"} />
          </linearGradient>
          <linearGradient id="imsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="sunbeamGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="electronGlow">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="30%" stopColor="#facc15" stopOpacity="1" />
            <stop offset="100%" stopColor="#a16207" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="protonGlow">
             <stop offset="0%" stopColor="#cffafe" stopOpacity="1" />
             <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          
          {/* Lipid Bilayer Pattern */}
          <pattern id="lipidPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <circle cx="10" cy="5" r="3" fill="#475569" opacity="0.6"/>
             <circle cx="10" cy="15" r="3" fill="#475569" opacity="0.6"/>
             <line x1="10" y1="5" x2="10" y2="15" stroke="#334155" strokeWidth="1" opacity="0.4"/>
          </pattern>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
          
          <marker id="blue-arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>

          {/* MOLECULE SYMBOLS */}
          {/* NADH: Blue carrier */}
          <symbol id="mol-nadh" viewBox="0 0 24 12">
             <rect x="0" y="0" width="24" height="12" rx="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1" />
             <text x="12" y="9" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">NADH</text>
          </symbol>
           {/* FADH2: Orange carrier */}
          <symbol id="mol-fadh2" viewBox="0 0 24 12">
             <polygon points="0,12 6,0 18,0 24,12" fill="#f97316" stroke="#fdba74" strokeWidth="1" />
             <text x="12" y="9" fontSize="7" textAnchor="middle" fill="white" fontWeight="bold">FADH₂</text>
          </symbol>
          {/* CO2: Grey Gas */}
          <symbol id="mol-co2" viewBox="0 0 16 10">
             <circle cx="8" cy="5" r="4" fill="#94a3b8" />
             <circle cx="3" cy="5" r="3" fill="#cbd5e1" />
             <circle cx="13" cy="5" r="3" fill="#cbd5e1" />
          </symbol>
          {/* ATP: Starburst */}
          <symbol id="mol-atp" viewBox="0 0 16 16">
              <path d="M8,0 L9.5,6 L16,8 L9.5,10 L8,16 L6.5,10 L0,8 L6.5,6 Z" fill={isAging ? "#713f12" : "#facc15"} stroke={isAging ? "#451a03" : "#ca8a04"} strokeWidth="1" />
              <text x="8" y="11" fontSize="5" textAnchor="middle" fill={isAging ? "#a16207" : "#451a03"} fontWeight="bold">ATP</text>
          </symbol>
          {/* PCr: Phosphocreatine */}
          <symbol id="mol-pcr" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="7" fill="#a855f7" stroke="#d8b4fe" strokeWidth="1" />
              <text x="8" y="11" fontSize="5" textAnchor="middle" fill="white" fontWeight="bold">PCr</text>
          </symbol>
          {/* ADP: Two circles */}
          <symbol id="mol-adp" viewBox="0 0 14 10">
              <circle cx="4" cy="5" r="3.5" fill="#94a3b8" stroke="#64748b" />
              <circle cx="10" cy="5" r="3.5" fill="#94a3b8" stroke="#64748b" />
              <text x="7" y="8" fontSize="4" textAnchor="middle" fill="white" fontWeight="bold">ADP</text>
          </symbol>
          {/* Pi: Small circle */}
          <symbol id="mol-pi" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" fill="#fcd34d" />
              <text x="4" y="6" fontSize="4" textAnchor="middle" fill="#78350f" fontWeight="bold">P</text>
          </symbol>
           {/* ROS: Spiky shape */}
          <symbol id="mol-ros" viewBox="0 0 10 10">
              <path d="M5,0 L6,4 L10,5 L6,6 L5,10 L4,6 L0,5 L4,4 Z" fill="#ef4444" />
          </symbol>
          {/* PROTON: H+ */}
          <symbol id="mol-proton" viewBox="0 0 10 10">
             <circle cx="5" cy="5" r="5" fill="#06b6d4" stroke="white" strokeWidth="1" />
             <line x1="5" y1="2" x2="5" y2="8" stroke="white" strokeWidth="2" />
             <line x1="2" y1="5" x2="8" y2="5" stroke="white" strokeWidth="2" />
          </symbol>
          {/* ELECTRON: e- */}
          <symbol id="mol-electron" viewBox="0 0 8 8">
             <circle cx="4" cy="4" r="4" fill="url(#electronGlow)" />
          </symbol>
          {/* Peptide: Spiral */}
          <symbol id="mol-peptide-mots" viewBox="0 0 20 10">
             <path d="M0,5 Q2.5,0 5,5 T10,5 T15,5 T20,5" fill="none" stroke="#4ade80" strokeWidth="2" />
             <circle cx="10" cy="5" r="2" fill="#22c55e" />
          </symbol>
           <symbol id="mol-peptide-humanin" viewBox="0 0 20 10">
             <path d="M0,5 Q2.5,10 5,5 T10,5 T15,5 T20,5" fill="none" stroke="#d8b4fe" strokeWidth="2" />
             <circle cx="10" cy="5" r="2" fill="#a855f7" />
          </symbol>

        </defs>

        {/* ============================================================================
            BACKGROUND ZONES
           ============================================================================ */}
        
        {/* 1. Cytosol */}
        <rect x="0" y="0" width="1000" height="150" fill={isAging ? "#020617" : "#0f172a"} />
        <text x="500" y="30" fill="#64748b" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="2">CYTOSOL</text>

        {/* Nucleus (Biogenesis Source) */}
        <g opacity={isActive(LocationType.BIOGENESIS) ? 1 : 0.3} onClick={() => onSelect('pqq')} className="cursor-pointer transition-opacity">
          <path d="M850,0 Q850,100 1000,120 V0 Z" fill="#312e81" />
          <text x="920" y="40" fill="#a5b4fc" fontSize="14" fontWeight="bold">NUCLEUS</text>
          <text x="920" y="60" fill="#6366f1" fontSize="12">PGC-1α Signaling</text>
        </g>

        {/* Sunlight Overlay */}
        {isSpecificActive('sunlight') && (
          <g>
             {/* Sun Source */}
             <g transform="translate(100, 80)">
                <motion.circle r="25" fill="#facc15" stroke="#fef08a" strokeWidth="2" 
                   animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity }}
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(i => (
                   <motion.line key={i} x1="0" y1="0" x2="40" y2="0" stroke="#facc15" strokeWidth="2" transform={`rotate(${i})`} 
                     animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: i*0.1, repeat: Infinity }}
                   />
                ))}
             </g>
             
             {/* Rays entering cell */}
             <path d="M100,80 L900,300 L900,600 L100,600" fill="url(#sunbeamGradient)" />

             {/* Signaling Particles to Nucleus (Circadian Entrainment) */}
             {[0, 1, 2].map(i => (
               <motion.circle key={i} r="3" fill="#fef08a">
                  <animateMotion path="M100,80 Q300,100 900,60" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
               </motion.circle>
             ))}
             <text x="500" y="120" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">CIRCADIAN ENTRAINMENT</text>
          </g>
        )}

        {/* 2. Outer Membrane */}
        <rect x="0" y="150" width="1000" height="20" fill="url(#lipidPattern)" stroke="#334155" strokeWidth="2" />
        <text x="800" y="165" fill="#94a3b8" fontSize="12" fontWeight="bold">OUTER MEMBRANE</text>
        <rect x="80" y="150" width="30" height="20" fill="#475569" rx="2" /> {/* Porin */}
        
        {/* INSULIN RESISTANCE BLOCKADE */}
        {isInsulinResistant && (
           <g>
             <rect x="75" y="145" width="40" height="30" fill="#ef4444" opacity="0.6" rx="4" />
             <line x1="75" y1="145" x2="115" y2="175" stroke="#7f1d1d" strokeWidth="3" />
             <line x1="115" y1="145" x2="75" y2="175" stroke="#7f1d1d" strokeWidth="3" />
             <text x="95" y="190" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">BLOCKED</text>
           </g>
        )}

        {/* 3. IMS */}
        <rect x="0" y="170" width="1000" height="130" fill="url(#imsGradient)" />
        <text x="800" y="200" fill="#60a5fa" fontSize="14" fontWeight="bold" opacity="0.7">INTERMEMBRANE SPACE</text>

        {/* 4. Inner Membrane */}
        <g>
          <rect x="0" y="300" width="1000" height="60" fill="#1e293b" opacity="0.9" />
          {/* Dynamic Lipid Pattern for Omega-3 */}
          {isSpecificActive('omega3') ? (
            <g>
              <rect x="0" y="300" width="1000" height="60" fill="url(#lipidPattern)" opacity="0.5" />
              <motion.rect 
                 x="0" y="300" width="1000" height="60" fill="url(#lipidPattern)" 
                 animate={{ x: [-20, 0] }} 
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
              <text x="400" y="340" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">INCREASED FLUIDITY</text>
            </g>
          ) : (
            <rect x="0" y="300" width="1000" height="60" fill="url(#lipidPattern)" /> 
          )}
          
          {/* SS-31 Stabilization Effect */}
          {isSpecificActive('ss31') && (
            <g>
               {[100, 250, 400, 550, 700, 850].map(x => (
                 <motion.g key={x} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                    <path d={`M${x},300 L${x+10},310 L${x+20},300`} fill="none" stroke="#bef264" strokeWidth="3" />
                    <circle cx={x+10} cy={310} r="3" fill="#bef264" />
                 </motion.g>
               ))}
               <text x="500" y="350" fill="#bef264" fontSize="12" fontWeight="bold" textAnchor="middle">CRISTAE STABILIZATION</text>
            </g>
          )}

          <text x="720" y="335" fill="#94a3b8" fontSize="12" fontWeight="bold">INNER MEMBRANE</text>
          {/* MPC Transporter */}
          <path d="M80,300 L85,360 L105,360 L110,300 Z" fill="#475569" />
          <path d="M85,300 L90,360 L100,360 L105,300 Z" fill="#1e293b" />
          <text x="95" y="340" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">MPC</text>
        </g>

        {/* 5. Matrix */}
        <rect x="0" y="360" width="1000" height="240" fill="url(#matrixGradient)" />
        <text x="900" y="580" fill="#fbbf24" fontSize="16" fontWeight="bold" opacity="0.5">MATRIX</text>

        {/* ============================================================================
            INTERVENTION SPECIFIC OVERLAYS
           ============================================================================ */}
        
        {/* Mitophagy (Urolithin A) - Lysosome Docking */}
        {isSpecificActive('urolithin-a') && (
          <motion.g 
             initial={{ x: 850, y: -100, opacity: 0 }}
             animate={{ x: 850, y: 130, opacity: 1 }}
             transition={{ duration: 2 }}
          >
             <circle r="30" fill="#be123c" stroke="#fb7185" strokeWidth="2" />
             <text x="0" y="5" fill="white" textAnchor="middle" fontSize="10" fontWeight="bold">LYSOSOME</text>
             <motion.path 
               d="M-10,25 L0,35 L10,25" fill="none" stroke="#fb7185" strokeWidth="2" 
               animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}
             />
          </motion.g>
        )}

        {/* MOTS-c (Matrix -> Nucleus) */}
        {isSpecificActive('mots-c') && (
           <g>
              <path d="M690,500 Q600,400 750,300 T880,60" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
              <text x="720" y="400" fill="#22c55e" fontSize="12" fontWeight="bold">MOTS-c Translocation</text>
              {[0, 1, 2].map(i => (
                <motion.g key={i}>
                   <use href="#mol-peptide-mots" width="20" height="10" />
                   <animateMotion path="M690,500 Q600,400 750,300 T880,60" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
                   <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
                </motion.g>
              ))}
           </g>
        )}

        {/* Humanin (Matrix -> Outer Membrane/Bax) */}
        {isSpecificActive('humanin') && (
          <g>
            {/* Bax Protein (The Bad Guy) */}
            <path d="M600,150 L610,165 L620,150" stroke="#ef4444" strokeWidth="3" fill="none" />
            <text x="610" y="145" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">BAX</text>
            
            {/* Humanin Intercepting */}
            <path d="M690,500 Q650,300 610,170" fill="none" stroke="#d8b4fe" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
            {[0, 1].map(i => (
                <motion.g key={i}>
                   <use href="#mol-peptide-humanin" width="20" height="10" />
                   <animateMotion path="M690,500 Q650,300 610,170" dur="2s" begin={`${i}s`} repeatCount="indefinite" />
                   <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i}s`} repeatCount="indefinite" />
                </motion.g>
            ))}
            <text x="650" y="250" fill="#d8b4fe" fontSize="12" fontWeight="bold">Humanin Defense</text>
          </g>
        )}

        {/* Biogenesis Signals (PQQ / Zone 2) */}
        {(isSpecificActive('pqq') || isSpecificActive('zone2')) && (
           <g>
             {[0, 1, 2, 3].map(i => (
               <motion.circle key={i} r="3" fill="#818cf8">
                 <animateMotion path="M900,60 L880,200 L880,400 L750,500" dur="3s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
                 <animate attributeName="opacity" values="1;0" dur="3s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
               </motion.circle>
             ))}
           </g>
        )}

        {/* ============================================================================
            STATIC STRUCTURES (GLYCOLYSIS & ETC)
           ============================================================================ */}

        {/* GLYCOLYSIS */}
        <g transform="translate(50, 40)">
           <rect x="-20" y="-20" width="240" height="100" rx="10" fill="#1e293b" stroke="#334155" strokeDasharray="4 4" opacity="0.5"/>
           <text x="100" y="-5" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">GLYCOLYSIS</text>
           {/* Glucose */}
           <path d="M15,0 L30,10 L30,30 L15,40 L0,30 L0,10 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" />
           <text x="40" y="25" fill="#94a3b8" fontSize="12" fontWeight="bold">Glucose</text>
           {/* Arrow */}
           <path d="M15,45 V80" stroke={isInsulinResistant ? "#ef4444" : "#64748b"} strokeWidth="2" markerEnd="url(#arrowhead)" />
           {/* Output */}
           <use href="#mol-atp" x="60" y="50" width="15" height="15" opacity={isInsulinResistant ? 0.3 : 1} />
           <use href="#mol-nadh" x="80" y="55" width="25" height="12" opacity={isInsulinResistant ? 0.3 : 1} />
           <text x="15" y="110" fill="#fda4af" fontSize="12" fontWeight="bold" opacity={isInsulinResistant ? 0.3 : 1}>Pyruvate</text>
        </g>

        {/* ETC COMPLEXES */}
        <g opacity={isActive(LocationType.ETC) ? 1 : 0.5} className="transition-opacity">
            
            {/* Complex I */}
            <g transform="translate(160, 270)" onClick={() => onSelect('metformin')} className="cursor-pointer">
               <path d="M0,0 H40 V90 H80 V130 H0 Z" fill={isSpecificActive('metformin') ? '#9ca3af' : '#ef4444'} stroke={isSpecificActive('metformin') ? 'white' : 'none'} strokeWidth="3"/>
               <text x="20" y="50" fill="white" fontSize="16" fontWeight="bold">I</text>
               {isSpecificActive('metformin') && (
                 <g>
                   <path d="M10,20 L30,40 M30,20 L10,40" stroke="#7f1d1d" strokeWidth="4" />
                   <text x="20" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">INHIBITED</text>
                 </g>
               )}
            </g>
            
            {/* Complex II */}
            <g transform="translate(280, 300)">
               <path d="M0,0 H40 V60 H0 Z" fill="#f97316" />
               <text x="20" y="35" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">II</text>
            </g>
            
            {/* Q - CoQ10 */}
            <g transform="translate(350, 310)" onClick={() => onSelect('coq10')} className="cursor-pointer">
               <motion.circle cx="15" cy="15" r="12" 
                 fill="#facc15" stroke={isSpecificActive('coq10') ? 'white' : '#b45309'} strokeWidth="2"
                 animate={isSpecificActive('coq10') ? { x: [0, 10, 0] } : {}}
                 transition={{ duration: 0.5, repeat: Infinity }}
               />
               <text x="15" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#451a03">Q</text>
               {isSpecificActive('coq10') && (
                 <text x="15" y="-10" fill="#facc15" fontSize="10" textAnchor="middle">OPTIMIZED</text>
               )}
            </g>
            
            {/* Complex III */}
            <g transform="translate(440, 270)">
               <path d="M0,10 H60 V130 H0 Z" fill="#84cc16" />
               <path d="M10,0 H50 V20 H10 Z" fill="#65a30d" />
               <text x="30" y="70" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">III</text>
            </g>
            
            {/* Cyt C */}
            <g transform="translate(530, 260)">
               <circle cx="10" cy="10" r="8" fill="#22d3ee" />
            </g>
            
            {/* Complex IV */}
            <g transform="translate(620, 270)" onClick={() => onSelect('red-light')} className="cursor-pointer">
               <path d="M0,10 H70 V130 H0 Z" fill="#6366f1" stroke={isSpecificActive('red-light') ? '#ffffff' : 'none'} strokeWidth="3"/>
               <path d="M10,0 H60 V20 H10 Z" fill="#4f46e5" />
               <text x="35" y="70" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">IV</text>
               {isSpecificActive('red-light') && (
                  <>
                    <motion.circle cx="35" cy="70" r="40" fill="url(#glow)" stroke="#f87171" strokeWidth="2" opacity="0.5"
                     animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Incoming Photons */}
                    {[0, 1, 2].map(i => (
                      <motion.path 
                        key={i}
                        d="M20,-30 L35,10" 
                        stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </>
               )}
            </g>
            
            {/* ATP Synthase (Complex V) */}
            <g transform="translate(800, 300)"> 
               {/* F0 Base (In Membrane) */}
               <rect x="0" y="0" width="50" height="60" rx="4" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2" />
               <text x="25" y="35" textAnchor="middle" fill="#ddd6fe" fontSize="10" fontWeight="bold">F₀</text>
               {/* Stator Arm */}
               <path d="M-10,10 C-15,10 -15,120 -10,130 L0,130" fill="none" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round"/>
               {/* Central Stalk (Axis) */}
               <rect x="20" y="60" width="10" height="40" fill="#c4b5fd" />
               {/* F1 Head (In Matrix) - Rotating */}
               <motion.g 
                 style={{ originX: "25px", originY: "110px" }}
                 animate={showFlow ? { rotate: 360 } : {}}
                 transition={{ duration: isAging ? 9 : 3, repeat: Infinity, ease: "linear" }}
               >
                  {/* Alpha/Beta Subunits arranged in hexagon */}
                  <g transform="translate(25, 110)">
                     <circle cx="0" cy="-15" r="12" fill="#8b5cf6" stroke="#7c3aed"/>
                     <circle cx="13" cy="-7.5" r="12" fill="#a78bfa" stroke="#7c3aed"/>
                     <circle cx="13" cy="7.5" r="12" fill="#8b5cf6" stroke="#7c3aed"/>
                     <circle cx="0" cy="15" r="12" fill="#a78bfa" stroke="#7c3aed"/>
                     <circle cx="-13" cy="7.5" r="12" fill="#8b5cf6" stroke="#7c3aed"/>
                     <circle cx="-13" cy="-7.5" r="12" fill="#a78bfa" stroke="#7c3aed"/>
                     <circle cx="0" cy="0" r="6" fill="#4c1d95" />
                  </g>
               </motion.g>
               <text x="25" y="160" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">ATP Synthase</text>
            </g>
        </g>

        {/* ============================================================================
            DETAILED KREBS CYCLE
           ============================================================================ */}
        <g transform="translate(380, 480)" onClick={() => onSelect('keto')} className="cursor-pointer">
           {/* Cycle Path */}
           <motion.circle cx="0" cy="0" r="80" fill="none" stroke={isSpecificActive('keto') ? '#facc15' : '#fb923c'} strokeWidth={isSpecificActive('keto') ? 3 : 1} strokeDasharray="4 4" opacity="0.3"
             animate={isSpecificActive('keto') ? { rotate: 360 } : {}} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           />
           
           {/* Intermediates - arranged in a circle */}
           {/* 12 o'clock: Citrate */}
           <g transform="translate(0, -80)">
             <circle r="6" fill="#fdba74" />
             <text y="-12" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="bold">Citrate</text>
           </g>
           {/* 3 o'clock: Alpha-Ketoglutarate */}
           <g transform="translate(80, 0)">
             <circle r="5" fill="#fb923c" />
             <text x="10" y="4" fill="#fb923c" fontSize="9">α-KG</text>
           </g>
           {/* 6 o'clock: Succinate */}
           <g transform="translate(0, 80)">
             <circle r="5" fill="#f97316" />
             <text y="15" textAnchor="middle" fill="#f97316" fontSize="9">Succinate</text>
           </g>
           {/* 8 o'clock: Fumarate */}
           <g transform="translate(-69, 40)">
             <circle r="4" fill="#ea580c" />
             <text x="-8" y="5" textAnchor="end" fill="#ea580c" fontSize="8">Fumarate</text>
           </g>
           {/* 9 o'clock: Malate */}
           <g transform="translate(-80, 0)">
             <circle r="4" fill="#c2410c" />
             <text x="-10" y="4" textAnchor="end" fill="#c2410c" fontSize="9">Malate</text>
           </g>
           {/* 10 o'clock: Oxaloacetate */}
           <g transform="translate(-69, -40)">
             <circle r="5" fill="#9a3412" />
             <text x="-10" y="-5" textAnchor="end" fill="#9a3412" fontSize="9">OAA</text>
           </g>

           {/* Center Label */}
           <text x="0" y="5" textAnchor="middle" fill="#fb923c" fontSize="14" fontWeight="bold" opacity="0.2">KREBS CYCLE</text>

           {/* PDH Complex (Entry Point) */}
           <g transform="translate(-50, -100)">
              <rect x="-20" y="-15" width="40" height="30" rx="5" fill="#b45309" opacity="0.8" stroke={isSpecificActive('ala') ? 'white' : 'none'} strokeWidth={2}/>
              <text x="0" y="5" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PDH</text>
           </g>
        </g>

        {/* ============================================================================
            ANIMATED FLOW
           ============================================================================ */}
        {showFlow && (
            <>
                {/* 1. Pyruvate Entry Path: Cytosol -> Porin -> MPC -> PDH */}
                <g>
                  {isInsulinResistant ? (
                    // Bounce Effect for Insulin Resistance
                    <motion.g>
                        <polygon points="0,-5 5,5 -5,5" fill="#fda4af" stroke="white" strokeWidth="1" />
                        <animateMotion 
                          path="M65,140 L95,150 L70,120" 
                          dur="1s" 
                          repeatCount="indefinite"
                        />
                         <animate attributeName="opacity" values="1;1;0" dur="1s" repeatCount="indefinite" />
                    </motion.g>
                  ) : (
                     // Normal Entry
                    <motion.g>
                        <polygon points="0,-5 5,5 -5,5" fill="#fda4af" stroke="white" strokeWidth="1" />
                        <animateMotion 
                          path="M65,140 L95,160 L95,360 L120,400 L330,380" 
                          dur={getDuration(4)}
                          repeatCount="indefinite"
                        />
                    </motion.g>
                  )}
                </g>

                {/* 2. Acetyl-CoA Entry: PDH -> Citrate */}
                {!isInsulinResistant && (
                  <g>
                     <motion.g>
                        <rect width="8" height="8" rx="2" fill="#fde047" />
                        <animateMotion path="M330,380 L380,400" dur={getDuration(1)} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur={getDuration(1)} repeatCount="indefinite" />
                     </motion.g>
                  </g>
                )}

                {/* 3. Krebs Outputs: NADH (To Complex I) */}
                {/* Increased flow for NAD+ Precursors */}
                <g>
                    {[0, isSpecificActive('nad-precursors') ? 1.5 : 1000].map(delay => (
                      <motion.g key={delay}>
                         <use href="#mol-nadh" width="20" height="10" />
                         <animateMotion path="M460,480 C500,450 300,450 200,400" dur={getDuration(3)} begin={`${delay}s`} repeatCount="indefinite" />
                         <animate attributeName="opacity" values="1;1;0" dur={getDuration(3)} begin={`${delay}s`} repeatCount="indefinite" />
                      </motion.g>
                    ))}
                    
                    {/* NAD+ Flood Effect */}
                    {isSpecificActive('nad-precursors') && [1,2,3,4].map(i => (
                       <motion.g key={`flood-${i}`}>
                         <use href="#mol-nadh" width="20" height="10" />
                         <animateMotion path={`M${400 + i*20},500 L200,400`} dur="2s" begin={`${i*0.5}s`} repeatCount="indefinite" />
                         <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                       </motion.g>
                    ))}
                </g>

                {/* 4. Krebs Outputs: FADH2 (To Complex II) */}
                <g>
                   <motion.g>
                      <use href="#mol-fadh2" width="20" height="10" />
                      <animateMotion path="M380,560 C400,520 300,400 300,360" dur={getDuration(4)} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;1;0" dur={getDuration(4)} repeatCount="indefinite" />
                   </motion.g>
                </g>

                {/* 5. Krebs Waste: CO2 */}
                <g>
                   <motion.g>
                      <use href="#mol-co2" width="16" height="10" />
                      <animateMotion path="M460,480 L550,450" dur={getDuration(2)} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0" dur={getDuration(2)} repeatCount="indefinite" />
                   </motion.g>
                </g>

                {/* 6. Electron Flow (ETC) - Clearly Visible Path */}
                {/* Guide Track */}
                <path d="M200,340 L240,340 L300,320 L365,325 L470,340 L540,270 L655,340" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="2 2" opacity="0.2" />
                
                {/* Normal Path Particles */}
                {!isSpecificActive('metformin') && !isSpecificActive('methylene-blue') && (
                  <>
                    <path id="electronTrack" d="M200,340 L240,340 L300,320 L365,325 L470,340 L540,270 L655,340" fill="none" stroke="none" />
                    {/* High speed electrons */}
                    {[0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2, 3.6].map(i => (
                        <motion.g key={`e-${i}`}>
                            <use href="#mol-electron" width="8" height="8" x="-4" y="-4" />
                            <animateMotion href="#electronTrack" dur={getDuration(2)} begin={`${i}s`} repeatCount="indefinite" />
                        </motion.g>
                    ))}
                    {/* Label traveling with first particle */}
                    <motion.g>
                       <text fill="#fef08a" fontSize="10" fontWeight="bold" dy="-5">e-</text>
                       <animateMotion href="#electronTrack" dur={getDuration(2)} repeatCount="indefinite" />
                    </motion.g>
                  </>
                )}
                
                {/* OXIDATIVE STRESS LEAK */}
                {isOxidativeStress && (
                  <g>
                    {[1, 2, 3, 4].map(i => (
                      <motion.g key={`ros-leak-${i}`}>
                        <use href="#mol-ros" width="10" height="10" />
                         {/* Leak from Complex I (200,340) and III (470,340) */}
                        <animateMotion 
                           path={`M${i % 2 === 0 ? 200 : 470},340 l${Math.random()*100 - 50},${Math.random()*100 + 20}`} 
                           dur="1s" begin={`${i*0.3}s`} repeatCount="indefinite" 
                        />
                        <animate attributeName="opacity" values="1;0" dur="1s" begin={`${i*0.3}s`} repeatCount="indefinite" />
                      </motion.g>
                    ))}
                     <text x="400" y="420" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">ELECTRON LEAK (ROS)</text>
                  </g>
                )}

                {/* Methylene Blue Bypass Path */}
                {isSpecificActive('methylene-blue') && (
                  <g>
                    {/* Visualizing the bypass line */}
                    <path d="M220,380 C300,450 500,450 655,340" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#blue-arrowhead)" opacity="0.6" />
                    <text x="440" y="460" fill="#60a5fa" fontSize="12" fontWeight="bold">Methylene Blue Bypass</text>
                    {[0, 0.2, 0.4, 0.6, 0.8, 1].map(i => (
                        <motion.g key={`mb-e-${i}`}>
                             <use href="#mol-electron" width="8" height="8" x="-4" y="-4" />
                            <animateMotion path="M220,380 C300,450 500,450 655,340" dur="1.5s" begin={`${i}s`} repeatCount="indefinite" />
                        </motion.g>
                    ))}
                  </g>
                )}

                {/* 7. Proton Pumping (H+) - Distinct Particles */}
                {/* Complex I (inhibited by Metformin) */}
                {!isSpecificActive('metformin') && (
                  <g>
                    <path id="h1-path" d="M180,360 L180,180" fill="none" />
                    {[0, 0.5, 1].map(i => (
                      <motion.g key={`h1-${i}`}>
                         <use href="#mol-proton" width="10" height="10" x="-5" y="-5" />
                         <animateMotion href="#h1-path" dur={getDuration(1.5)} begin={`${i}s`} repeatCount="indefinite" />
                         <animate attributeName="opacity" values="1;0.5;0" dur={getDuration(1.5)} begin={`${i}s`} repeatCount="indefinite" />
                      </motion.g>
                    ))}
                    <motion.text fontSize="10" fill="#06b6d4" fontWeight="bold">
                        H+
                        <animateMotion href="#h1-path" dur={getDuration(1.5)} repeatCount="indefinite" />
                    </motion.text>
                  </g>
                )}
                 {/* Complex III */}
                 <g>
                   <path id="h3-path" d="M470,360 L470,180" fill="none" />
                    {[0, 0.5, 1].map(i => (
                      <motion.g key={`h3-${i}`}>
                         <use href="#mol-proton" width="10" height="10" x="-5" y="-5" />
                         <animateMotion href="#h3-path" dur={getDuration(1.5)} begin={`${i}s`} repeatCount="indefinite" />
                         <animate attributeName="opacity" values="1;0.5;0" dur={getDuration(1.5)} begin={`${i}s`} repeatCount="indefinite" />
                      </motion.g>
                    ))}
                 </g>
                 {/* Complex IV */}
                 <g>
                    <path id="h4-path" d="M655,360 L655,180" fill="none" />
                    {[0, 0.5, 1].map(i => (
                      <motion.g key={`h4-${i}`}>
                         <use href="#mol-proton" width="10" height="10" x="-5" y="-5" />
                         <animateMotion href="#h4-path" dur={getDuration(1.5)} begin={`${i}s`} repeatCount="indefinite" />
                         <animate attributeName="opacity" values="1;0.5;0" dur={getDuration(1.5)} begin={`${i}s`} repeatCount="indefinite" />
                      </motion.g>
                    ))}
                 </g>

                {/* 8. ATP Synthase Flow */}
                {/* H+ Entering from IMS */}
                <g>
                   <path id="h-atp-path" d="M825,200 L825,300 L825,350" />
                   {[0, 0.3, 0.6].map(i => (
                      <motion.g key={`h-atp-${i}`}>
                         <use href="#mol-proton" width="10" height="10" x="-5" y="-5" />
                         <animateMotion href="#h-atp-path" dur={getDuration(1)} begin={`${i}s`} repeatCount="indefinite" />
                         <animate attributeName="opacity" values="0;1;0" dur={getDuration(1)} begin={`${i}s`} repeatCount="indefinite" />
                      </motion.g>
                   ))}
                </g>

                {/* Inputs: ADP + Pi */}
                <motion.g>
                    <use href="#mol-adp" width="14" height="10" />
                    <animateMotion path="M750,450 L810,420" dur={getDuration(1.5)} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;0" dur={getDuration(1.5)} repeatCount="indefinite" />
                </motion.g>
                <motion.g>
                    <use href="#mol-pi" width="8" height="8" />
                    <animateMotion path="M880,450 L830,420" dur={getDuration(1.5)} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;0" dur={getDuration(1.5)} repeatCount="indefinite" />
                </motion.g>

                {/* Output: ATP Generation */}
                <motion.g>
                   <use href="#mol-atp" x="-8" y="-8" width="16" height="16" />
                   {/* Modified path for Creatine: ATP goes to CK */}
                   <animateMotion 
                      path={isSpecificActive('creatine') ? "M825,420 L840,210" : "M825,420 L825,500"} 
                      dur={getDuration(1.5)} begin="0.75s" repeatCount="indefinite" 
                   />
                   <animate attributeName="opacity" values="1;1;0" dur={getDuration(1.5)} begin="0.75s" repeatCount="indefinite" />
                   <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur={getDuration(1.5)} repeatCount="indefinite" />
                </motion.g>

                {/* Creatine Shuttle Output */}
                {isSpecificActive('creatine') && (
                  <motion.g>
                     <use href="#mol-pcr" x="-8" y="-8" width="16" height="16" />
                     <animateMotion path="M840,210 L840,140" dur="1s" begin="1.5s" repeatCount="indefinite" />
                     <animate attributeName="opacity" values="1;0" dur="1s" begin="1.5s" repeatCount="indefinite" />
                  </motion.g>
                )}

                {/* ROS & Melatonin Interaction */}
                {isSpecificActive('melatonin') && (
                  <g>
                     {/* ROS appearing */}
                     {[1, 2, 3].map(i => (
                       <motion.g key={`ros-${i}`}>
                         <use href="#mol-ros" width="10" height="10" />
                         <animateMotion path={`M${600+i*50},${400+i*20} l10,10`} dur="2s" repeatCount="indefinite" />
                         <animate attributeName="opacity" values="1;0" dur="0.5s" repeatCount="indefinite" />
                       </motion.g>
                     ))}
                     {/* Melatonin neutralizing */}
                     {[1, 2, 3].map(i => (
                       <motion.circle key={`mel-${i}`} r="3" fill="#818cf8">
                          <animateMotion path={`M700,500 L${600+i*50},${400+i*20}`} dur="0.5s" repeatCount="indefinite" />
                       </motion.circle>
                     ))}
                     <text x="700" y="450" fill="#818cf8" fontSize="12" fontWeight="bold">ANTIOXIDANT SHIELD</text>
                  </g>
                )}
            </>
        )}

        {/* Other Static Elements */}
        {/* mtDNA */}
        <g transform="translate(690, 500)" onClick={() => onSelect('melatonin')} className="cursor-pointer hover:opacity-100 opacity-80">
           <path d="M-30,0 Q-15,-20 0,0 T30,0 T60,0" fill="none" stroke={isSpecificActive('melatonin') ? '#818cf8' : '#fcd34d'} strokeWidth="3" />
           <text x="15" y="35" textAnchor="middle" fill="#fcd34d" fontWeight="bold">mtDNA</text>
        </g>
        
        {/* CK - Creatine Kinase */}
        <g transform="translate(840, 210)" onClick={() => onSelect('creatine')} className="cursor-pointer">
            <rect x="-20" y="-15" width="40" height="30" rx="5" fill={isSpecificActive('creatine') ? '#a855f7' : '#34d399'} stroke="white" strokeWidth={isSpecificActive('creatine') ? 2 : 1} />
            <text x="0" y="5" textAnchor="middle" fill={isSpecificActive('creatine') ? 'white' : '#064e3b'} fontSize="12" fontWeight="bold">CK</text>
        </g>

        {/* LEGEND */}
        <g transform="translate(20, 520)">
            <rect width="300" height="75" rx="8" fill="rgba(15, 23, 42, 0.95)" stroke="#334155" />
            <text x="10" y="20" fill="#94a3b8" fontSize="12" fontWeight="bold" letterSpacing="1">MOLECULAR LEGEND</text>
            
            {/* Col 1 */}
            <g transform="translate(15, 35)">
               <use href="#mol-electron" width="8" height="8" y="-4"/>
               <text x="12" y="4" fill="#cbd5e1" fontSize="10">Electron (e-)</text>
            </g>
            <g transform="translate(15, 50)">
               <use href="#mol-proton" width="10" height="10" y="-5"/>
               <text x="12" y="4" fill="#cbd5e1" fontSize="10">Proton (H+)</text>
            </g>
            
            {/* Col 2 */}
            <g transform="translate(100, 35)">
               <use href="#mol-nadh" width="16" height="8" y="-4"/>
               <text x="20" y="4" fill="#cbd5e1" fontSize="10">NADH</text>
            </g>
            <g transform="translate(100, 50)">
               <use href="#mol-fadh2" width="16" height="8" y="-4"/>
               <text x="20" y="4" fill="#cbd5e1" fontSize="10">FADH2</text>
            </g>

             {/* Col 3 */}
            <g transform="translate(180, 35)">
               <use href="#mol-atp" width="10" height="10" y="-5"/>
               <text x="15" y="4" fill="#cbd5e1" fontSize="10">ATP</text>
            </g>
            <g transform="translate(180, 50)">
               <use href="#mol-peptide-mots" width="15" height="8" y="-4"/>
               <text x="20" y="4" fill="#cbd5e1" fontSize="10">Peptide</text>
            </g>
        </g>

      </svg>
    </div>
  );
};