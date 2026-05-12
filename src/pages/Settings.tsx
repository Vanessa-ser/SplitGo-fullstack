import { Link } from 'react-router-dom';
import { useExpenseContext } from '../context/ExpenseContext';
import { useState } from 'react';

const Settings = () => {
  const { participantes, setParticipantes, presupuesto, setPresupuesto, lugarViaje, setLugarViaje } = useExpenseContext();
  const [nuevoParticipante, setNuevoParticipante] = useState('');

  const agregarParticipante = () => {
    if (nuevoParticipante.trim() && !participantes.includes(nuevoParticipante)) {
      setParticipantes([...participantes, nuevoParticipante.trim()]);
      setNuevoParticipante('');
    }
  };

  const eliminarParticipante = (nombre: string) => {
    setParticipantes(participantes.filter(p => p !== nombre));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10">
      <Link to="/" className="text-white/70 text-xs font-black uppercase tracking-widest mb-8 block hover:text-white transition-colors">
        ← Volver al Inicio
      </Link>

      <h1 className="text-3xl font-black text-white italic tracking-tighter mb-8">Configuración de gastos</h1>

{/* Ajuste de nombre y presupuesto */}
      
      <section className="bg-white p-6 rounded-[2.5rem] mb-6 shadow-sm">
  
{/* Nombre del Viaje */}
  <label 
    htmlFor="nombreViaje"
    className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-2"
  >
    Nombre de Referencia
  </label>
  <input
    id="nombreViaje"
    type="text"
    className="w-full p-4 rounded-2xl bg-stone-50 border border-stone-100 outline-none font-bold text-olive-600"
    value={lugarViaje}
    onChange={(e) => setLugarViaje(e.target.value)}
    placeholder="Ej. Berlín 2026 o Marzo 2026"
  />

  <div className="mt-4"> 
{/* Presupuesto  */}
    <label 
      htmlFor="presupuesto"
      className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-2"
    >
      Presupuesto Total (€)
    </label>
    <input
      id="presupuesto"
      type="number"
      className="w-full p-4 rounded-2xl bg-stone-50 border border-stone-100 outline-none font-bold text-olive-600"
      value={presupuesto}
      onChange={(e) => setPresupuesto(Number(e.target.value))}
      placeholder="0.00"
    />
  </div>

</section>


{/* Gestión de Integrantes */}
      <section className="bg-olive-400 p-6 rounded-[2.5rem] border border-dashed border-white/30 shadow-inner">
        <h2 className="text-[14px] font-black text-white uppercase mb-4 ml-2">Integrantes</h2>
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            className="flex-1 p-3 rounded-2xl bg-white border-none outline-none text-sm font-bold"
            placeholder="Añadir nombre..." 
            value={nuevoParticipante}
            onChange={(e) => setNuevoParticipante(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregarParticipante()}
          />
          <button onClick={agregarParticipante} className="bg-gray-800 text-white w-12 rounded-2xl font-black text-xl hover:scale-105 transition-transform">+</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {participantes.map(p => (
            <button key={p} onClick={() => eliminarParticipante(p)} className="group bg-white/20 px-4 py-1.5 rounded-full text-xs font-black text-white flex items-center gap-2 hover:bg-red-400 transition-all">
              {p} <span className="text-[8px] opacity-50">✕</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;