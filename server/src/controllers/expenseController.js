let expenses = [];

// Obtener todos los gastos 
export const getExpenses = (req, res) => {
    res.status(200).json(expenses);
};

// Crear un gasto 
export const createExpense = (req, res) => {
    const { description, amount, payer, category } = req.body;

    if (!description || !amount) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const newExpense = {
        id: Date.now().toString(), 
        description,
        amount: Number(amount),
        payer: payer || 'Anónimo',
        category: category || 'Varios'
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
};

// Borrar un gasto 
export const deleteExpense = (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter(e => e.id !== id);
    res.status(200).json({ message: "Gasto eliminado" });
};