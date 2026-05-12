export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: 'Transporte' | 'Comida' | 'Alojamiento' | 'Otros';
    date: string;
    payer: string;
  }
  
  export interface Trip {
    id: string;
    destination: string;
    budget: number;
    expenses: Expense[];
  }