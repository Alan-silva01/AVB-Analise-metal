import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-avb"></div>
      
      <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center min-h-[350px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-avb text-xs font-bold uppercase tracking-wider mb-6">
          Oficina de Cilindro
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight mb-6 drop-shadow-sm">
          Relatório Comparativo <br/>
          <span className="text-avb">Cilindro HSS</span> vs <br/>
          <span className="text-avb">Anel de Metal Duro</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 leading-relaxed">
          Análise técnica e econômica detalhada sobre desempenho, vida útil e viabilidade operacional na linha de laminação da Gaiola 13.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-gray-200">
            <span className="w-3 h-3 rounded-full bg-avb"></span>
            <span className="text-sm font-semibold text-gray-700">Dados Técnicos</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-gray-200">
            <span className="w-3 h-3 rounded-full bg-avb"></span>
            <span className="text-sm font-semibold text-gray-700">Análise Econômica</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-gray-200">
            <span className="w-3 h-3 rounded-full bg-avb"></span>
            <span className="text-sm font-semibold text-gray-700">Projeção 5 Anos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;