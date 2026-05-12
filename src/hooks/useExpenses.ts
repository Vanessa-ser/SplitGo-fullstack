import { useState, useEffect } from 'react';
import type { Expense } from '../types';

export const useExpenses = () => {
  // Estado para almacenar la lista de gastos
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('viaje_gastos');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar automáticamente en LocalStorage cuando cambien los gastos
  useEffect(() => {
    localStorage.setItem('viaje_gastos', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return { expenses, addExpense, deleteExpense, totalSpent };
};