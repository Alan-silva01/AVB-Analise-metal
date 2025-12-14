import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { TrendingUp } from 'lucide-react';

const WearAnalysis: React.FC = () => {
  // Generate combined data
  // Metal Duro: starts 380, -4mm per cycle, until ~315
  // HSS: starts 380, -8mm per cycle, until ~315
  const data = [];
  for (let i = 0; i <= 16; i++) {
    const metalVal = 380 - (i * 4);
    const hssVal = 380 - (i * 8);

    data.push({
      cycle: i,
      metal: metalVal >= 315 ? metalVal : null,
      hss: hssVal >= 315 ? hssVal : null,
    });
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg z-50">
          <p className="font-bold text-gray-700 mb-2">Ciclo {label}</p>
          {payload.map((entry: any, index: number) => (
             entry.value && (
              <div key={index} className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}}></span>
                <span className="text-sm text-gray-600">
                  {entry.name === 'metal' ? 'Metal Duro' : 'HSS'}: <span className="font-bold">{entry.value} mm</span>
                </span>
              </div>
             )
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <TrendingUp className="text-avb" />
            Desgaste ao Longo da Vida Útil
          </h2>
          <p className="text-gray-600">
            Comparativo de redução de diâmetro por ciclo de usinagem
          </p>
        </div>
        <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
           <span className="text-sm font-semibold text-avb-dark">Insight: Metal duro oferece o dobro de usinagens</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mb-6">
        <div className="flex items-center gap-2">
           <div className="flex items-center">
             <div className="w-2 h-2 rounded-full bg-slate-400"></div>
             <div className="w-6 h-0.5 bg-slate-400 border-t border-dashed border-slate-400"></div>
             <div className="w-2 h-2 rounded-full bg-slate-400"></div>
           </div>
           <span className="text-sm font-semibold text-gray-500">Aço Rápido (HSS)</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center">
             <div className="w-2 h-2 rounded-full bg-avb"></div>
             <div className="w-8 h-1 bg-avb"></div>
             <div className="w-2 h-2 rounded-full bg-avb"></div>
           </div>
           <span className="text-sm font-bold text-avb">Metal Duro (G13)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="cycle" 
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              tick={{fill: '#94a3b8', fontSize: 12}}
            >
              <Label value="Ciclos de Usinagem" position="insideBottom" offset={-10} fill="#64748b" fontSize={12} />
            </XAxis>

            <YAxis 
              domain={[310, 390]} 
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              tick={{fill: '#94a3b8', fontSize: 12}}
            >
               <Label value="Diâmetro (mm)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#64748b" fontSize={12} />
            </YAxis>

            <Tooltip content={<CustomTooltip />} />

            {/* Reference Line 315mm */}
            <ReferenceLine y={315} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'center', value: 'Diâmetro Mínimo (315mm)', fill: '#ef4444', fontSize: 12, opacity: 0.8 }} />

            {/* HSS Line - Dashed Grey */}
            <Line 
              type="monotone" 
              dataKey="hss" 
              name="hss"
              stroke="#94a3b8" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#94a3b8', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
              connectNulls={false}
            />

            {/* Metal Duro Line - Solid Green */}
            <Line 
              type="monotone" 
              dataKey="metal" 
              name="metal"
              stroke="#4A916F" 
              strokeWidth={3} 
              dot={{ fill: '#4A916F', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
              connectNulls={false}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center text-sm text-gray-500 text-center">
         <p>
           <span className="font-bold text-gray-700">Aço Rápido:</span> Perde 8mm por passe, atingindo o limite em apenas 8 ciclos.
         </p>
         <span className="hidden md:inline text-gray-300">|</span>
         <p>
            <span className="font-bold text-avb">Metal Duro:</span> Perde apenas 4mm por passe, alcançando 16 ciclos produtivos.
         </p>
      </div>
    </div>
  );
};

export default WearAnalysis;