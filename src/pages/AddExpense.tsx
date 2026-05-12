import { useNavigate, Link } from 'react-router-dom';
import { useExpenseContext } from '../context/ExpenseContext';
import { ExpenseForm } from '../components/ExpenseForm';

const AddExpensePage = () => {
  const { addExpense, participantes } = useExpenseContext();
  const navigate = useNavigate(); 

  const handleAddAndGoBack = (newExpense: any) => {
    addExpense(newExpense);
    navigate('/'); 
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10">
      <Link to="/" className="text-white/70 text-xs font-black uppercase tracking-widest mb-8 block hover:text-white transition-colors">
        ← Cancelar y volver
      </Link>

      <h1 className="text-3xl font-black text-white italic tracking-tighter mb-8">Nuevo Gasto</h1>

      <div className="shadow-2xl">
        <ExpenseForm onAddExpense={handleAddAndGoBack} participantes={participantes} />
      </div>

      <p className="text-center text-white/40 text-[10px] uppercase font-black tracking-widest mt-8">
        Asegúrate de que todos los campos sean correctos
      </p>
    </div>
  );
};

export default AddExpensePage;