import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const DowntimeAnalysis: React.FC = () => {
  const data = [
    { name: 'Aço Rápido (HSS)', horas: 11, fill: '#94a3b8' },
    { name: 'Metal Duro', horas: 2, fill: '#4A916F' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-bold text-gray-700">{label}</p>
          <p className="text-gray-600 text-sm">Tempo parado: <span className="font-bold text-gray-800">{payload[0].value} horas</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="bg-avb text-white text-sm font-bold px-2 py-1 rounded">03b</span>
          Comparação de Horas Paradas por Mês
        </h2>
        <p className="text-gray-600">
          Redução significativa no tempo de inatividade do laminador.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-2/3 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="horas" radius={[8, 8, 0, 0]} maxBarSize={100}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList dataKey="horas" position="top" fill="#374151" fontWeight="bold" formatter={(val: number) => `${val}h`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="relative p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">HSS</div>
                <h4 className="text-red-800 font-semibold mb-1">Impacto Negativo</h4>
                <p className="text-sm text-red-700">
                    O cilindro HSS gera <strong>11 horas</strong> de interrupção por mês.
                </p>
            </div>
            
            <div className="relative p-6 bg-green-50 rounded-xl border border-green-100">
                <div className="absolute -top-3 -right-3 bg-avb text-white text-xs font-bold px-3 py-1 rounded-full">Metal Duro</div>
                <h4 className="text-avb-dark font-semibold mb-1">Impacto Positivo</h4>
                <p className="text-sm text-avb-dark">
                    O Metal Duro reduz as paradas para apenas <strong>2 horas</strong> mensais.
                </p>
            </div>

            <div className="text-center">
                 <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Ganho de Disponibilidade</p>
                 <p className="text-3xl font-extrabold text-avb">+9 Horas/mês</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DowntimeAnalysis;