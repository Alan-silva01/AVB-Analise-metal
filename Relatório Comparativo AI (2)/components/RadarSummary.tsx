import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CheckCircle2, XCircle, TrendingUp, DollarSign, Clock } from 'lucide-react';

const RadarSummary: React.FC = () => {
  // Normalized data (0-100 scale) 
  // 100 represents the "Ideal" or "Best Performance" in that category.
  const data = [
    {
      subject: 'Vida Útil',
      A: 100, // Metal Duro (Best)
      B: 20,  // HSS (Worst)
      fullMark: 100,
      labelA: '64 meses',
      labelB: '13 meses'
    },
    {
      subject: 'Disponibilidade', // (Less downtime)
      A: 95, // Metal Duro (2h downtime)
      B: 20, // HSS (11h downtime)
      fullMark: 100,
      labelA: 'Alta',
      labelB: 'Baixa'
    },
    {
      subject: 'Capacidade (t)',
      A: 100, // Metal Duro (1.3M)
      B: 20,  // HSS (260k)
      fullMark: 100,
      labelA: '1.3M t',
      labelB: '260k t'
    },
    {
      subject: 'Ciclos Usinagem',
      A: 80, // Metal Duro (16)
      B: 40, // HSS (8)
      fullMark: 100,
      labelA: '16x',
      labelB: '8x'
    },
    {
      subject: 'Baixo Custo Inicial', // HSS Wins here technically on immediate purchase price
      A: 40, // Metal Duro (Expensive)
      B: 100, // HSS (Cheap)
      fullMark: 100,
      labelA: 'Invest. Alto',
      labelB: 'Invest. Baixo'
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-xl rounded-lg z-50">
          <p className="font-bold text-gray-800 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
             <div key={index} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}}></span>
                <span className={entry.name === 'Metal Duro' ? 'font-bold text-gray-700' : 'text-gray-500'}>
                    {entry.name}: {entry.name === 'Metal Duro' ? data.find(d => d.subject === label)?.labelA : data.find(d => d.subject === label)?.labelB}
                </span>
             </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Radar Chart Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-avb p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Comparativo Visual Consolidado
          </h2>
          <p className="text-green-50 opacity-90">
            Representação gráfica dos indicadores de desempenho e custo para auxílio na tomada de decisão.
          </p>
        </div>

        <div className="p-4 md:p-8 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="h-[350px] w-full md:w-2/3 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 12, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                <Tooltip content={<CustomTooltip />} />
                <Radar
                  name="Metal Duro"
                  dataKey="A"
                  stroke="#4A916F"
                  strokeWidth={3}
                  fill="#4A916F"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Aço Rápido (HSS)"
                  dataKey="B"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="#94a3b8"
                  fillOpacity={0.1}
                />
                <Legend iconType="circle" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full md:w-1/3 space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-bold text-avb text-lg mb-1">Metal Duro</h4>
                  <p className="text-sm text-gray-700">Destaca-se nos indicadores técnicos: maior vida útil, disponibilidade e capacidade produtiva.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-gray-500 text-lg mb-1">Aço Rápido (HSS)</h4>
                  <p className="text-sm text-gray-600">Apresenta vantagem no custo de aquisição inicial e impacto financeiro imediato reduzido.</p>
              </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
           Detalhamento dos Cenários
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: Cost */}
            <div>
                <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <DollarSign className="text-gray-400" />
                    Cenário Financeiro.
                </h3>
                <div className="bg-slate-50 p-5 rounded-xl border border-gray-200 space-y-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        Em termos de investimento direto para cobertura de um período de 5 anos, o <strong>HSS</strong> apresenta o menor custo de aquisição.
                    </p>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <DollarSign className="text-gray-500 shrink-0" size={20} />
                        <div>
                             <p className="text-xs text-gray-500 font-bold uppercase">Investimento em 5 Anos</p>
                             <div className="flex justify-between w-full gap-4 text-sm mt-1">
                                <span>HSS: <span className="font-bold text-gray-700">R$ 180.096</span></span>
                                <span>MD: <span className="font-bold text-gray-700">R$ 275.182</span></span>
                             </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                        Diferença de R$ 95.086,40 a favor do HSS no fluxo de caixa.
                    </p>
                </div>
            </div>

            {/* Right Column: Operational */}
            <div>
                <h3 className="text-lg font-bold text-avb mb-4 flex items-center gap-2">
                    <Clock className="text-avb" />
                    Cenário Operacional.
                </h3>
                <div className="bg-green-50 p-5 rounded-xl border border-green-100 space-y-4">
                    <p className="text-gray-800 text-sm leading-relaxed">
                        Em termos de eficiência produtiva e confiabilidade, o <strong>Metal Duro</strong> apresenta indicadores superiores.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 size={16} className="text-avb mt-1 shrink-0" />
                            <span><strong>Disponibilidade:</strong> Projeção de +540 horas de produção em 5 anos devido à redução de paradas.</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 size={16} className="text-avb mt-1 shrink-0" />
                            <span><strong>Volume:</strong> Capacidade de processar até 1.3 milhão de toneladas (5x mais que o HSS).</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Análise Final</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
                O Aço Rápido (HSS) exige um investimento menor, com custo cerca de 35% mais baixo ao longo de 5 anos, sendo uma opção mais econômica no curto prazo.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
                O Metal Duro, por outro lado, apresenta desempenho superior na operação. Sua vida útil é aproximadamente 5 vezes maior e a menor necessidade de trocas gera um ganho estimado de 540 horas de máquina disponível no período analisado.
            </p>
            <p className="text-gray-700 leading-relaxed">
                A decisão deve equilibrar o menor custo inicial com a necessidade de maior produtividade, menos paradas e mais estabilidade no processo produtivo.
            </p>
        </div>
      </div>
    </div>
  );
};

export default RadarSummary;