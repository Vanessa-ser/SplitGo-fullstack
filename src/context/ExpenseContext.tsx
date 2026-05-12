import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Expense } from '../types';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  totalSpent: number;
  lugarViaje: string;
  setLugarViaje: (val: string) => void;
  presupuesto: number;
  setPresupuesto: (val: number) => void;
  participantes: string[];
  setParticipantes: React.Dispatch<React.SetStateAction<string[]>>;
  balances: Record<string, number>;
  deudasDetalladas: { de: string; a: string; cuanto: number }[];
  loading: boolean; // Útil para el punto 12 (estado de carga)
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// URL de tu servidor Express
const API_URL = 'http://localhost:3001/api/expenses';

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de configuración (siguen en LocalStorage por simplicidad del ejercicio)
  const [lugarViaje, setLugarViaje] = useState(() => localStorage.getItem('splitgo_nombre') || 'Nombre del Viaje');
  const [presupuesto, setPresupuesto] = useState(() => Number(localStorage.getItem('splitgo_presupuesto')) || 1000);
  const [participantes, setParticipantes] = useState<string[]>(() => {
    const g = localStorage.getItem('splitgo_participantes');
    return g ? JSON.parse(g) : ['Juan', 'María'];
  });

  // Llamadas a la API (BACKEND) 

  // Cargar gastos al iniciar 
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error cargando gastos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  //  Añadir gasto 
  const addExpense = async (expense: Expense) => {
    try {
      const response = await fetch('http://localhost:3001/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense) 
      });
      
      if (response.ok) {
        const savedExpense = await response.json();
        
        setExpenses(prev => [...prev, savedExpense]);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };
  // Borrar gasto
  const deleteExpense = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

 
  useEffect(() => { localStorage.setItem('splitgo_nombre', lugarViaje); }, [lugarViaje]);
  useEffect(() => { localStorage.setItem('splitgo_presupuesto', presupuesto.toString()); }, [presupuesto]);
  useEffect(() => { localStorage.setItem('splitgo_participantes', JSON.stringify(participantes)); }, [participantes]);

  // --- CÁLCULOS ---
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const balances = (() => {
    const b: Record<string, number> = {};
    participantes.forEach(p => b[p] = 0);
    expenses.forEach(e => {
      const cuota = e.amount / (participantes.length || 1);
      participantes.forEach(p => {
        if (p === e.payer) b[p] += (e.amount - cuota);
        else b[p] -= cuota;
      });
    });
    return b;
  })();

  const deudasDetalladas = (() => {
    const deudores = Object.entries(balances).filter(([_, m]) => m < -0.01).map(([n, m]) => ({ n, m: Math.abs(m) }));
    const acreedores = Object.entries(balances).filter(([_, m]) => m > 0.01).map(([n, m]) => ({ n, m }));
    const trans: { de: string; a: string; cuanto: number }[] = [];
    let i = 0, j = 0;
    while (i < deudores.length && j < acreedores.length) {
      const pago = Math.min(deudores[i].m, acreedores[j].m);
      trans.push({ de: deudores[i].n, a: acreedores[j].n, cuanto: pago });
      deudores[i].m -= pago; acreedores[j].m -= pago;
      if (deudores[i].m < 0.01) i++; if (acreedores[j].m < 0.01) j++;
    }
    return trans;
  })();

  return (
    <ExpenseContext.Provider value={{ 
      expenses, addExpense, deleteExpense, totalSpent, 
      lugarViaje, setLugarViaje, presupuesto, setPresupuesto, 
      participantes, setParticipantes, balances, deudasDetalladas,
      loading
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenseContext must be used within ExpenseProvider");
  return context;
};