import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BarChart3, TrendingUp, Clock, DollarSign, PieChart, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Hero from './components/Hero';
import DataSummary from './components/DataSummary';
import WearAnalysis from './components/WearAnalysis';
import TonnageAnalysis from './components/TonnageAnalysis';
import DowntimeAnalysis from './components/DowntimeAnalysis';
import FiveYearProjection from './components/FiveYearProjection';
import RadarSummary from './components/RadarSummary';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize to auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        // Default to open on desktop
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      if (isMobile) setIsSidebarOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Início', icon: <LayoutDashboard size={20} /> },
    { id: 'summary', label: 'Resumo de Dados', icon: <BarChart3 size={20} /> },
    { id: 'wear', label: 'Análise de Desgaste', icon: <TrendingUp size={20} /> },
    { id: 'tonnage', label: 'Capacidade & Tonelagem', icon: <PieChart size={20} /> },
    { id: 'downtime', label: 'Paradas & Tempo', icon: <Clock size={20} /> },
    { id: 'projection', label: 'Projeção 5 Anos', icon: <DollarSign size={20} /> },
    { id: 'conclusion', label: 'Análise Final', icon: <PieChart size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-x-hidden">
      
      {/* Sidebar Overlay for Mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-2xl border-r border-gray-100 transition-all duration-300 ease-in-out flex flex-col
          ${isSidebarOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
        `}
      >
        <div className="h-48 border-b border-gray-100 flex flex-col items-center justify-center relative bg-gray-50/50 p-6 overflow-hidden">
          {/* Close button for mobile */}
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-avb transition-colors z-20"
            >
              <X size={24} />
            </button>
          )}

          {/* Logo Image */}
          <div className="w-full h-full flex items-center justify-center">
             <img 
               src="https://tkrtkzudwptjycqvksrc.supabase.co/storage/v1/object/public/logo%20upzy/Imagem%201100x500.png" 
               alt="Logotipo" 
               className="w-full h-full object-contain scale-110" 
             />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap group ${
                activeSection === item.id
                  ? 'bg-avb text-white shadow-md shadow-green-200 translate-x-1'
                  : 'text-gray-600 hover:bg-green-50 hover:text-avb hover:pl-5'
              }`}
            >
              <span className={`transition-transform duration-300 ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-center text-gray-400 font-medium leading-relaxed">
             Relatório Técnico<br/>
             <span className="text-avb font-bold">Oficina de Cilindros</span>
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className={`flex-1 min-w-0 transition-all duration-300 ease-in-out flex flex-col min-h-screen ${
          isSidebarOpen && !isMobile ? 'ml-72' : 'ml-0'
        }`}
      >
        {/* Toggle Button (Sticky Top for Mobile) */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 p-4 flex items-center gap-4 lg:hidden shadow-sm">
           <button 
            className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:text-avb active:scale-95 transition-transform"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-700 flex items-center gap-2">
             <span className="w-3 h-3 rounded-full bg-avb"></span>
             Relatório AVB
          </span>
        </div>

        {/* Desktop Toggle Button (Floating) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`hidden lg:flex fixed top-8 z-40 items-center justify-center w-8 h-12 bg-white text-avb shadow-md border-y border-r border-gray-200 rounded-r-lg hover:bg-gray-50 hover:w-10 transition-all duration-300 ${
             isSidebarOpen ? 'left-[288px]' : 'left-0'
          }`}
          title={isSidebarOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Content Container - Uses full width with responsive padding */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-12 lg:space-y-16">
          
          <section id="hero" className="scroll-mt-8">
            <Hero />
          </section>

          <section id="summary" className="scroll-mt-8">
            <DataSummary />
          </section>

          <section id="wear" className="scroll-mt-8">
            <WearAnalysis />
          </section>

          <section id="tonnage" className="scroll-mt-8">
            <TonnageAnalysis />
          </section>

          <section id="downtime" className="scroll-mt-8">
            <DowntimeAnalysis />
          </section>

          <section id="projection" className="scroll-mt-8">
            <FiveYearProjection />
          </section>

          <section id="conclusion" className="scroll-mt-8 pb-16">
            <RadarSummary />
          </section>

        </div>
        
        <footer className="bg-white border-t py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                {/* Mini Logo Footer */}
                <div className="w-6 h-6 bg-avb rounded-full overflow-hidden relative flex items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-full h-full p-1 fill-white">
                      <path d="M20 80 C 20 80, 25 30, 80 20 C 60 20, 50 40, 45 55 C 40 70, 25 80, 20 80 Z" />
                   </svg>
                </div>
                <span className="font-bold text-gray-700">AVB</span>
            </div>
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Aço Verde do Brasil. Todos os direitos reservados.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;