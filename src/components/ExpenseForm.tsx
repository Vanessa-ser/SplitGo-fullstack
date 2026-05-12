import { useState } from 'react';
import type { Expense } from '../types';

interface Props {
  onAddExpense: (expense: Expense) => void;
  participantes: string[]; 
}

export const ExpenseForm = ({ onAddExpense, participantes }: Props) => {
  const [description, setDescription] = useState('');
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category'] | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
// Validación completa
    if (!description || !amount || !category || !payer) {
      alert("Por favor, rellena todos los campos");
      return;
    }
  
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      payer,           
      amount: Number(amount),
      category: category as Expense['category'], 
      date: new Date().toLocaleDateString()
    };
  
    onAddExpense(newExpense);
  
// Limpieza de estados
    setDescription('');
    setPayer('');      
    setAmount('');
    setCategory(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-white/50 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        
{/* Categoria */}
        <select
          title="Categoría"
          className={`p-4 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-olive-200 outline-none bg-stone-50 transition-all text-sm
            ${category === '' ? 'text-slate-400' : 'text-stone-800 font-bold'}`}
          value={category}
          onChange={(e) => setCategory(e.target.value as Expense['category'])}
        >
          <option value="" disabled hidden>¿Categoría?</option>
          <option value="Transporte">Transporte</option>
          <option value="Comida">Comida</option>
          <option value="Alojamiento">Alojamiento</option>
          <option value="Otros">Otros</option>
        </select>

{/* Integrante que paga */}
        <select
          title="Pagador"
          className={`p-4 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-olive-200 outline-none bg-stone-50 transition-all text-sm
            ${payer === '' ? 'text-slate-400' : 'text-stone-800 font-bold'}`}
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        >
          <option value="" disabled hidden>¿Quién pagó?</option>
          {participantes.length > 0 ? (
            participantes.map(p => (
              <option key={p} value={p}>{p}</option>
            ))
          ) : (
            <option disabled>Añade personas abajo primero</option>
          )}
        </select>

{/* Descripción */}
        <input
          type="text"
          placeholder="¿En qué gastaste?"
          className="p-4 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-olive-200 outline-none bg-stone-50 transition-all text-sm text-stone-800 font-bold placeholder:font-normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
{/* Importe */}
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            placeholder="Importe"
            className="w-full p-4 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-olive-200 outline-none bg-stone-50 transition-all text-sm text-stone-800 font-bold placeholder:font-normal"
            value={amount}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, '');
              setAmount(val);
            }}
          />
          <span className="absolute right-4 top-4 text-slate-300 font-black">€</span>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-gray-600 text-white p-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-stone-700 active:scale-[0.98] transition-all shadow-lg shadow-stone-200"
      >
        Añadir Gasto
      </button>
    </form>
  );
};