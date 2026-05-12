import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';           // Sin llaves si usaste export default
import AddExpense from './pages/AddExpense'; // Asegúrate de que el nombre del archivo coincida
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ExpenseProvider> 
      <Router>
        <div className="min-h-screen bg-olive-400 font-sans selection:bg-olive-200">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* OJO: Aquí usa "/nuevo" o "/nuevo-gasto", pero que coincida con tus Links */}
            <Route path="/nuevo" element={<AddExpense />} /> 
            <Route path="/ajustes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ExpenseProvider>
  );
 }

export default App;