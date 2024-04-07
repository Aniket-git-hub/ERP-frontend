import { handleRequest } from "../../data.js"

// budget methods 
export const getBudgets = async () => handleRequest('/budget', {}, 'GET')
export const createBudgets = async (data) => handleRequest('/budget', data, 'POST')
export const updateBudgets = async (data, budgetId) => handleRequest(`/budget/${budgetId}`, data, 'PUT')
export const deleteBudgets = async (budgetId) => handleRequest(`/budget/${budgetId}`, {}, 'DELETE')
