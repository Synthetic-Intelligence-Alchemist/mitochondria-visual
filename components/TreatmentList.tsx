
import React from 'react';
import { Treatment, LocationType } from '../types';
import { ChevronRight, Activity, AlertCircle, ExternalLink } from 'lucide-react';

interface Props {
  treatments: Treatment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const TreatmentList: React.FC<Props> = ({ treatments, selectedId, onSelect }) => {
  
  const pathologies = treatments.filter(t => t.category === 'Pathology');
  const interventions = treatments.filter(t => t.category === 'Intervention');

  // Group Interventions by location
  const groupedInterventions = interventions.reduce((acc, t) => {
    if (!acc[t.location]) acc[t.location] = [];
    acc[t.location].push(t);
    return acc;
  }, {} as Record<LocationType, Treatment[]>);

  return (
    <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
          MitoVis
        </h1>
        
        {/* Pathologies Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 px-2">
            <AlertCircle size={16} className="text-red-500" />
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest">
              Age-Related Pathologies
            </h3>
          </div>
          <div className="space-y-1">
            {pathologies.map((t) => (
              <button
                  key={t.id}
                  onClick={() => onSelect(t.id)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all flex items-center justify-between group ${
                    selectedId === t.id
                      ? 'bg-red-900/50 text-red-100 border border-red-700 shadow-lg'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-red-200'
                  }`}
                >
                  <span>{t.name}</span>
                  {selectedId === t.id && <ChevronRight size={16} className="text-red-400" />}
                </button>
            ))}
          </div>
        </div>

        {/* Interventions Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <Activity size={16} className="text-blue-500" />
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Longevity Interventions
            </h3>
          </div>

          {(Object.keys(groupedInterventions) as LocationType[]).map((loc) => (
            <div key={loc} className="pl-2 border-l border-slate-800 ml-1">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 px-2">
                {loc}
              </h4>
              <div className="space-y-1">
                {groupedInterventions[loc].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                      selectedId === t.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span>{t.name}</span>
                    {selectedId === t.id && <ChevronRight size={16} className="animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Credits */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
         <div className="flex flex-col gap-1">
           <p className="text-sm font-bold text-slate-200">Omar Saleem, MD</p>
           <a 
             href="https://grasshoppermed.substack.com" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors group"
           >
             <span>Grasshopper Medicine on Substack</span>
             <ExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
           </a>
         </div>
      </div>
    </div>
  );
};
