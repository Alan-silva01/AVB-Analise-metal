import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const DataSummary: React.FC = () => {
  const data = [
    { label: "Diâmetro máximo", metal: "380 mm", hss: "380 mm", highlight: false },
    { label: "Diâmetro mínimo", metal: "315 mm", hss: "315 mm", highlight: false },
    { label: "Redução por usinagem", metal: "4 mm", hss: "8 mm", highlight: true, advantage: "metal" },
    { label: "Frequência de saída", metal: "a cada 60 dias", hss: "a cada 24 dias", highlight: true, advantage: "metal" },
    { label: "Total de usinagens possíveis", metal: "16,25 / anel", hss: "8,13 / cilindro", highlight: true, advantage: "metal" },
    { label: "Vida útil total", metal: "2 anos e 8 meses", hss: "8 meses", highlight: true, advantage: "metal" },
    { label: "Quantidade de canal", metal: "4", hss: "8", highlight: false },
    { label: "Paradas por mês", metal: "2 h", hss: "16 h", highlight: true, advantage: "metal" },
    { label: "Média mensal de produção", metal: "41.289 t", hss: "29.537 t", highlight: true, advantage: "metal" },
    { label: "Valor unitário", metal: "R$ 137.591,20", hss: "R$ 18.009,60", highlight: false },
    { label: "Custo por dia", metal: "R$ 141,11", hss: "R$ 36,94", highlight: false },
    { label: "Tonelagem máxima do canal", metal: "20.000 t", hss: "4.000 t", highlight: true, advantage: "metal" },
    { label: "Vida útil total (titular + reserva)", metal: "5 anos e 4 meses", hss: "1 ano e 1 mês", highlight: true, advantage: "metal" },
    { label: "Valor total (titular + reserva)", metal: "R$ 275.182,40", hss: "R$ 36.019,20", highlight: false },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="bg-avb text-white text-sm font-bold px-2 py-1 rounded">01</span>
          Resumo dos Dados (Gaiola 13)
        </h2>
        <p className="text-gray-600">
          Comparativo direto de parâmetros técnicos e econômicos.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-avb">
              <th className="py-4 px-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider w-1/3">Parâmetro</th>
              <th className="py-4 px-4 text-left text-sm font-bold text-avb uppercase tracking-wider bg-green-50 w-1/3 rounded-t-lg">
                Metal Duro
              </th>
              <th className="py-4 px-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider w-1/3">
                Aço Rápido (HSS)
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <td className="py-3 px-4 text-sm font-medium text-gray-700">{row.label}</td>
                
                <td className={`py-3 px-4 text-sm font-semibold border-l border-green-100 ${row.highlight && row.advantage === 'metal' ? 'text-avb' : 'text-gray-700'}`}>
                   <div className="flex items-center gap-2">
                     {row.highlight && row.advantage === 'metal' && <CheckCircle2 size={16} className="text-avb shrink-0" />}
                     {row.metal}
                   </div>
                </td>
                
                <td className={`py-3 px-4 text-sm border-l border-gray-100 ${row.highlight && row.advantage === 'hss' ? 'text-avb font-semibold' : 'text-gray-500'}`}>
                  {row.hss}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
        <p className="text-avb-dark text-sm">
          <strong>Observação:</strong> Embora o investimento inicial do Metal Duro seja superior, sua vida útil e capacidade de produção oferecem vantagens técnicas significativas.
        </p>
      </div>
    </div>
  );
};

export default DataSummary;