const express = require('express');
const router = express.Router();
const db = require('../db');

// Add new transaction
router.post('/', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`, 
        [type, category, amount, date, description], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Get all transactions
router.get('/', (req, res) => {
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ transactions: rows });
        }
    });
});

// Get transaction by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: "Transaction not found" });
        }
    });
});

// Update transaction by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;
    db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
        [type, category, amount, date, description, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes > 0) {
            res.json({ message: "Transaction updated" });
        } else {
            res.status(404).json({ error: "Transaction not found" });
        }
    });
});

// Delete transaction by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM transactions WHERE id = ?`, [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes > 0) {
            res.json({ message: "Transaction deleted" });
        } else {
            res.status(404).json({ error: "Transaction not found" });
        }
    });
});

// Get summary of transactions (total income, total expenses, balance)
router.get('/summary', (req, res) => {
    db.all(`SELECT type, SUM(amount) as total FROM transactions GROUP BY type`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            let income = 0, expenses = 0;
            rows.forEach(row => {
                if (row.type === 'income') {
                    income = row.total;
                } else if (row.type === 'expense') {
                    expenses = row.total;
                }
            });
            res.json({
                totalIncome: income,
                totalExpenses: expenses,
                balance: income - expenses
            });
        }
    });
});

module.exports = router;