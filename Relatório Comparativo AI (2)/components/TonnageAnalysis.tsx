import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { TrendingUp } from 'lucide-react';

const TonnageAnalysis: React.FC = () => {
  const data = [
    { name: 'Metal Duro', total: 1300000, color: '#4A916F' },
    { name: 'HSS', total: 260160, color: '#e2e8f0' }, // Lighter color for HSS comparison
  ];

  // Helper to format large numbers
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-bold text-gray-700">{label}</p>
          <p className="text-avb text-sm font-semibold">Tonelagem: {formatNumber(payload[0].value)} t</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="bg-avb text-white text-sm font-bold px-2 py-1 rounded">03</span>
          Análise Comparativa de Tonelagem
        </h2>
        <p className="text-gray-600">
          O Metal Duro suporta uma tonelagem significativamente maior devido à sua resistência ao desgaste.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 80, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#374151', fontSize: 14, fontWeight: 600 }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={60}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#4A916F' : '#cbd5e1'} />
                ))}
                <LabelList 
                  dataKey="total" 
                  position="right" 
                  formatter={(val: number) => `${formatNumber(val)} t`} 
                  fill="#4A916F" 
                  fontWeight="bold"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-1 space-y-4">
            <div className="p-6 bg-slate-50 rounded-xl border border-gray-100">
                <h4 className="text-gray-500 text-sm font-semibold mb-1 uppercase">Capacidade Total - Metal Duro</h4>
                <p className="text-4xl font-extrabold text-avb">1.3M <span className="text-lg text-gray-500">toneladas</span></p>
                <div className="mt-2 text-xs text-gray-500">
                  4 canais x 325.000 t
                </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-gray-100 opacity-75">
                <h4 className="text-gray-500 text-sm font-semibold mb-1 uppercase">Capacidade Total - HSS</h4>
                <p className="text-2xl font-bold text-gray-500">260k <span className="text-lg text-gray-400">toneladas</span></p>
                <div className="mt-2 text-xs text-gray-400">
                  8 canais x 32.520 t
                </div>
            </div>

            <div className="p-5 bg-green-50/50 rounded-xl border border-green-100">
                <h4 className="text-gray-500 text-sm font-semibold mb-3 uppercase flex items-center gap-2">
                    <TrendingUp size={16} className="text-avb" /> Média Mensal Realizada
                </h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-bold text-gray-700">Metal Duro</span>
                            <span className="font-bold text-avb">41.289 t</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-avb h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                    <div>
                         <div className="flex justify-between text-sm mb-1">
                            <span className="font-bold text-gray-500">HSS</span>
                            <span className="font-bold text-gray-500">29.537 t</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${(29537/41289)*100}%` }}></div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-right">
                        +39% de produtividade
                    </p>
                </div>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-600 italic">
                    "O Metal Duro é mais vantajoso, pois suporta maior tonelagem e tem melhor resistência ao desgaste."
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TonnageAnalysis;