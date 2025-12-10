
import React from 'react';
import { Treatment } from '../types';
import { X, Zap, Shield, Activity, Pill, Battery, Clock, AlertTriangle, FileText, Stethoscope, Skull, Target } from 'lucide-react';

interface Props {
  treatment: Treatment | null;
  onClose: () => void;
}

export const InfoPanel: React.FC<Props> = ({ treatment, onClose }) => {
  if (!treatment) return null;

  const isPathology = treatment.category === 'Pathology';

  const getIcon = () => {
    if (isPathology) return <Skull className="w-6 h-6 text-red-500" />;
    if (treatment.name.includes('Light')) return <Zap className="w-6 h-6 text-yellow-400" />;
    if (treatment.name.includes('Antioxidant') || treatment.mechanism.includes('antioxidant')) return <Shield className="w-6 h-6 text-green-400" />;
    if (treatment.name.includes('Exercise')) return <Activity className="w-6 h-6 text-blue-400" />;
    if (treatment.id === 'creatine') return <Battery className="w-6 h-6 text-purple-400" />;
    return <Pill className="w-6 h-6 text-red-400" />;
  };

  const headerColor = isPathology ? 'bg-red-900/20 border-red-900/50' : 'bg-slate-800/50 border-slate-700';

  return (
    <div className={`absolute bottom-0 left-0 right-0 md:static md:w-[450px] bg-slate-800/95 backdrop-blur-lg border-t md:border-l border-slate-700 flex flex-col shadow-2xl transition-all z-20 h-[60vh] md:h-auto overflow-hidden`}>
      
      {/* Header */}
      <div className={`p-6 border-b shrink-0 flex justify-between items-start ${headerColor}`}>
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg shadow-inner ${isPathology ? 'bg-red-950' : 'bg-slate-700'}`}>
                {getIcon()}
            </div>
            <div>
              <h2 className={`text-xl font-bold leading-tight ${isPathology ? 'text-red-100' : 'text-white'}`}>{treatment.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    isPathology 
                    ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                    : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                }`}>
                  {treatment.category.toUpperCase()}
                </span>
                {isPathology && (
                   <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                     {treatment.location}
                   </span>
                )}
              </div>
            </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        
        <div className="flex flex-col gap-2">
            {/* Clinical Status Badge */}
            <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <Stethoscope size={16} className={isPathology ? "text-red-400" : "text-emerald-400"} />
            <div>
                <p className="text-xs text-slate-500 uppercase font-bold">
                {isPathology ? "Prevalence / Scope" : "Clinical Status"}
                </p>
                <p className={`text-sm font-medium ${isPathology ? "text-red-300" : "text-emerald-300"}`}>
                {treatment.clinicalStatus}
                </p>
            </div>
            </div>

            {/* Indications Section - New */}
            <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <Target size={16} className={isPathology ? "text-red-400" : "text-indigo-400"} />
                <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                    {isPathology ? "Primary Indications / Conditions" : "Primary Indications / Use Cases"}
                    </p>
                    <p className="text-sm font-medium text-slate-200">
                    {treatment.indications}
                    </p>
                </div>
            </div>
        </div>

        {/* Mechanism Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-300">
            <FileText size={16} className="text-blue-400"/>
            <h3 className="text-xs uppercase tracking-wider font-bold">
               {isPathology ? "Pathological Mechanism" : "Mechanism & Effect"}
            </h3>
          </div>
          <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 space-y-3">
             <div>
               <span className="text-xs text-slate-500 uppercase block mb-1">Site of Action</span>
               <p className="text-slate-200 text-sm font-medium">{treatment.specificSite}</p>
             </div>
             <div className="h-px bg-slate-700/50" />
             <p className="text-slate-300 text-sm leading-relaxed">{treatment.mechanism}</p>
             <p className={`${isPathology ? "text-red-200" : "text-blue-200"} text-sm leading-relaxed mt-2 font-medium`}>
               {treatment.effect}
             </p>
          </div>
        </div>

        {/* Protocol / Risk Factors Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock size={16} className="text-amber-400"/>
            <h3 className="text-xs uppercase tracking-wider font-bold">
              {isPathology ? "Key Risk Factors" : "Typical Protocol"}
            </h3>
          </div>
          <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50">
            <p className="text-slate-300 text-sm leading-relaxed">{treatment.protocol}</p>
          </div>
        </div>

        {/* Safety / Consequences Section */}
        <div className="space-y-2 pb-4">
          <div className="flex items-center gap-2 text-slate-300">
            <AlertTriangle size={16} className="text-red-400"/>
            <h3 className="text-xs uppercase tracking-wider font-bold">
              {isPathology ? "Downstream Consequences" : "Safety Profile"}
            </h3>
          </div>
          <div className="bg-red-900/10 p-4 rounded-xl border border-red-900/20">
            <p className="text-red-200/80 text-sm leading-relaxed">{treatment.safetyProfile}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
