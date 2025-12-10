import React, { useState } from 'react';
import { treatments } from './data';
import { TreatmentList } from './components/TreatmentList';
import { MitochondriaSVG } from './components/MitochondriaSVG';
import { InfoPanel } from './components/InfoPanel';
import { PlayCircle, PauseCircle } from 'lucide-react';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFlow, setShowFlow] = useState(true);

  const selectedTreatment = selectedId 
    ? treatments.find(t => t.id === selectedId) || null 
    : null;

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-slate-950">
      {/* Left Sidebar: Navigation */}
      <div className="hidden md:block h-full shrink-0">
        <TreatmentList 
          treatments={treatments} 
          selectedId={selectedId} 
          onSelect={handleSelect} 
        />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Top Bar Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
           <button 
             onClick={() => setShowFlow(!showFlow)}
             className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 backdrop-blur hover:bg-slate-700 border border-slate-600 rounded-full text-sm font-medium text-blue-300 transition-colors"
           >
             {showFlow ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
             {showFlow ? "Pause Activity" : "Resume Activity"}
           </button>
        </div>

        {/* Visualization */}
        <div className="flex-1 p-4 md:p-8 relative">
           <MitochondriaSVG 
             selectedTreatment={selectedTreatment} 
             onSelect={handleSelect}
             showFlow={showFlow}
           />
        </div>

        {/* Mobile Navigation (Bottom Sheet style if needed, or just allow click interaction) */}
        {/* We are using InfoPanel which handles mobile display via absolute positioning */}
      </div>

      {/* Right/Bottom Panel: Information */}
      <InfoPanel 
        treatment={selectedTreatment} 
        onClose={() => setSelectedId(null)} 
      />
      
      {/* Mobile List Toggle - simplified for this demo, usually hidden if treatment selected */}
      {!selectedTreatment && (
        <div className="md:hidden absolute bottom-0 w-full h-1/2 bg-slate-900 rounded-t-2xl overflow-hidden border-t border-slate-700 z-30">
           <TreatmentList 
            treatments={treatments} 
            selectedId={selectedId} 
            onSelect={handleSelect} 
          />
        </div>
      )}
    </div>
  );
};

export default App;