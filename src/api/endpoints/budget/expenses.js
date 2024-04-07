import { handleRequest } from "../../data"

// expense methods 
export const getExpenses = async () => handleRequest('/expense', {}, 'GET')
export const createExpense = async (data) => handleRequest('/expense', data, 'POST')
export const updateExpense = async (data, expenseId) => handleRequest(`/expense/${expenseId}`, data, 'PUT')
export const deleteExpense = async (expenseId) => handleRequest(`/expense/${expenseId}`, {}, 'DELETE')
