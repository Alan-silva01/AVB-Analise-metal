import React from 'react';
import { TrendingDown, RefreshCcw, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const FiveYearProjection: React.FC = () => {
  const costData = [
    { name: 'HSS (5 unid.)', valor: 180096, display: 'R$ 180k', full: 'R$ 180.096' },
    { name: 'Metal Duro (1 unid.)', valor: 275182, display: 'R$ 275k', full: 'R$ 275.182' },
  ];

  const replacementData = [
    { name: 'Metal Duro', trocas: 30, color: '#4A916F' },
    { name: 'HSS', trocas: 76, color: '#94a3b8' },
  ];
  
  const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  }

  const CustomTooltipCost = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-bold text-gray-700">{label}</p>
          <p className="text-avb text-sm font-semibold">Valor: {formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipReplacement = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-bold text-gray-700">{label}</p>
          <p className="text-gray-600 text-sm">Quantidade de Trocas: <span className="font-bold">{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="bg-avb text-white text-sm font-bold px-2 py-1 rounded">03c</span>
          Resumo da Comparação (5 Anos)
        </h2>
        <p className="text-gray-600">
          Projeção de custos, trocas e vida útil em um horizonte de 60 meses.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Cost Comparison */}
        <div className="bg-slate-50 rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="text-avb" size={24} />
            <h3 className="text-lg font-bold text-gray-800">Investimento Total (5 Anos)</h3>
          </div>
          
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData} layout="vertical" margin={{ left: 20, right: 50 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={110} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip content={<CustomTooltipCost />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="valor" barSize={40} radius={[0, 4, 4, 0]}>
                   <Cell fill="#94a3b8" />
                   <Cell fill="#4A916F" />
                   <LabelList dataKey="full" position="right" fill="#334155" fontSize={12} fontWeight="bold" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-gray-200 text-sm text-gray-600">
             Apesar do custo total maior, o Metal Duro reduz trocas, paradas e tempo ocioso, o que compensa o investimento ao longo do período analisado.
          </div>
        </div>

        {/* Replacement Frequency */}
        <div className="bg-slate-50 rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <RefreshCcw className="text-avb" size={24} />
            <h3 className="text-lg font-bold text-gray-800">Frequência de Trocas (Menor é melhor)</h3>
          </div>
          
          <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={replacementData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip content={<CustomTooltipReplacement />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="trocas" barSize={40} radius={[0, 4, 4, 0]}>
                   <Cell fill="#4A916F" /> {/* Metal Duro (Better) */}
                   <Cell fill="#ef4444" /> {/* HSS (Worse - red for alert) */}
                   <LabelList dataKey="trocas" position="right" fill="#334155" fontSize={12} fontWeight="bold" formatter={(val:number) => `${val}x`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-gray-200 text-sm text-gray-600">
             O Metal Duro permite uma <span className="font-bold text-avb">redução significativa de trocas</span> (60% menos intervenções), aumentando drasticamente a estabilidade da linha.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
             <Calendar className="text-avb mb-2" />
             <span className="text-sm text-gray-600 uppercase font-semibold">Vida Útil Total</span>
             <span className="text-2xl font-bold text-avb mt-1">64 Meses</span>
             <span className="text-xs text-gray-500">Metal Duro (1 conjunto)</span>
          </div>
          <div className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center opacity-70">
             <Calendar className="text-gray-400 mb-2" />
             <span className="text-sm text-gray-500 uppercase font-semibold">Vida Útil Total</span>
             <span className="text-2xl font-bold text-gray-600 mt-1">13 Meses</span>
             <span className="text-xs text-gray-400">HSS (Por conjunto)</span>
          </div>
           <div className="border border-avb bg-avb text-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-lg">
             <TrendingDown className="text-white mb-2" />
             <span className="text-sm text-green-100 uppercase font-semibold">Redução de Paradas</span>
             <span className="text-2xl font-bold mt-1">82%</span>
             <span className="text-xs text-green-100">Menos tempo ocioso</span>
          </div>
      </div>
    </div>
  );
};

export default FiveYearProjection;