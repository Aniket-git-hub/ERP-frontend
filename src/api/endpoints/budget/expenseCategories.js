import { handleRequest } from "../../data"

// expense category methods 
export const getExpenseCategories = async () => handleRequest('/expense-category', {}, 'GET')
export const createExpenseCategory = async (data) => handleRequest('/expense-category', data, 'POST')
export const updateExpenseCategory = async (data, expenseCategoryId) => handleRequest(`/expense-category/${expenseCategoryId}`, data, 'PUT')
export const deleteExpenseCategory = async (expenseCategoryId) => handleRequest(`/expense-category/${expenseCategoryId}`, {}, 'DELETE')

