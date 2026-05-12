import express from 'express';
import cors from 'cors';
import expenseRoutes from './src/routes/expenseRoutes.js';

const app = express();
const PORT = 3001; 

app.use(cors());
app.use(express.json()); 

// Rutas
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor SplitGo! corriendo en http://localhost:${PORT}`);
});