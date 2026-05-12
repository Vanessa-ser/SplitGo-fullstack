import { Link } from 'react-router-dom';
import { useExpenseContext } from '../context/ExpenseContext';
import { useState } from 'react';

const Home = () => {
  const { 
    lugarViaje, 
    totalSpent, 
    presupuesto, 
    balances, 
    deudasDetalladas, 
    expenses, 
    deleteExpense,
    loading 
  } = useExpenseContext();

  const [showDeudas, setShowDeudas] = useState(false);

  // Lógica de colores y progreso
  const porcentaje = Math.min((totalSpent / (presupuesto || 1)) * 100, 100);
  const colorBarra = porcentaje > 80 ? 'bg-red-400' : porcentaje > 60 ? 'bg-orange-300' : 'bg-olive-500';

  // Agrupar gastos por categoría para la lista
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const cat = expense.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(expense);
    return acc;
  }, {} as Record<string, typeof expenses>);

  const categoriesWithExpenses = Object.keys(groupedExpenses);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white font-black animate-pulse uppercase tracking-[0.3em]">Cargando SplitGo!...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10">
      
{/* Header */}
      <header className="bg-white p-6 rounded-[2.5rem] shadow-sm mb-8 border border-white/50">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-700 tracking-tighter italic leading-tight">
              SplitGo<span className="text-olive-500 not-italic">!</span>
            </h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase ml-1 mb-3">Gastos bajo control</p>
            <h2 className="text-lg font-black text-olive-500 tracking-tight italic ml-1">
              {lugarViaje}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Gastado</p>
            <p className="text-4xl font-black tracking-tighter text-olive-500">{totalSpent.toFixed(2)}€</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-[14px] font-black text-slate-500 uppercase tracking-tighter">
            <span>Presupuesto</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded-lg text-gray-600">{presupuesto}€</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
            <div className={`h-full rounded-full transition-all duration-700 ${colorBarra}`} style={{ width: `${porcentaje}%` }}></div>
          </div>
        </div>
      </header>

{/* Reparto de saldos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {Object.entries(balances).map(([persona, saldo]) => (
          <div key={persona} className="bg-white p-4 rounded-3xl shadow-sm border border-white/50 text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{persona}</p>
            <p className={`text-xl font-black tracking-tighter ${saldo >= 0 ? 'text-gray-700' : 'text-red-400'}`}>
              {saldo > 0 ? '+' : ''}{saldo.toFixed(1)}€
            </p>
          </div>
        ))}
      </div>

      {/* SALDAR CUENTAS (DESPLEGABLE) */}
      {deudasDetalladas.length > 0 && (
        <div className="bg-olive-400 rounded-[2.5rem] mb-8 border border-dashed border-stone-200 overflow-hidden shadow-lg">
          <button 
            onClick={() => setShowDeudas(!showDeudas)}
            className="group w-full p-6 flex justify-between items-center outline-none transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <h2 className="text-[12px] font-black text-stone-100 uppercase group-hover:text-white transition-colors duration-300">Saldar Cuentas</h2>
            </div>
            <span className="text-stone-200 text-[10px] font-black tracking-widest group-hover:text-white transition-colors duration-300">
              {showDeudas ? 'CERRAR ↑' : 'VER PAGOS ↓'}
            </span>
          </button>
          {showDeudas && (
            <div className="px-6 pb-6 space-y-2">
              {deudasDetalladas.map((d, i) => (
                <div key={i} className="flex justify-between items-center bg-white/20 p-4 rounded-2xl border border-white/10">
                  <span className="text-xs font-bold text-white">
                    <span className="opacity-80 font-medium">{d.de}</span> ⮕ {d.a}
                  </span>
                  <span className="text-white font-black">{d.cuanto.toFixed(2)}€</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

{/* Lista de movimientos */}
      <div className="space-y-8 mb-20">
        <h2 className="text-xl font-black text-white tracking-tighter uppercase px-4">Movimientos</h2>
        {expenses.length === 0 ? (
          <div className="bg-olive-500/20 border-2 border-dashed border-white/30 rounded-[3rem] py-16 text-center">
            <p className="text-white/60 font-black text-xs uppercase tracking-widest italic">Sin gastos todavía</p>
          </div>
        ) : (
          categoriesWithExpenses.map(category => (
            <div key={category} className="space-y-3">
              <h3 className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em] ml-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-white/30"></span> {category}
              </h3>
              <div className="grid gap-2">
                {groupedExpenses[category].map(expense => (
                  <div key={expense.id} className="group bg-white/90 p-4 rounded-3xl flex justify-between items-center shadow-sm hover:bg-white transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-xl w-11 h-11 flex items-center bg-stone-50 rounded-2xl justify-center">
                        {expense.category === 'Comida' ? '🍴' : expense.category === 'Transporte' ? '🚗' : expense.category === 'Alojamiento' ? '🏠' : '📦'}
                      </div>
                      <div>
                        <p className="font-black text-gray-600 leading-tight">{expense.description}</p>
                        <p className="text-[9px] text-slate-400 font-black uppercase">{expense.payer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-black text-gray-600 text-xl tracking-tighter">{expense.amount}€</p>
                      <button onClick={() => deleteExpense(expense.id)} className="text-red-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

{/* Navegación inferior */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center gap-4 px-4 pointer-events-none">
        <Link to="/ajustes" className="pointer-events-auto bg-stone-500  backdrop-blur-md text-white px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/30 transition-all">
          ⚙️ Configuración de gastos
        </Link>
        <Link to="/nuevo" className="pointer-events-auto bg-olive-500 text-white px-10 py-4 rounded-full font-black uppercase text-xs shadow-2xl hover:bg-black hover:scale-105 transition-all">
          + Añadir Gasto
        </Link>
      </div>
      
    </div>
  );
};

export default Home;