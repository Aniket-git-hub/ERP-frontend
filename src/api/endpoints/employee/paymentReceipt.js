import { handleRequest } from "../../data"

// payment receipts methods 
export const createPaymentReceipt = async (data, employeeId) => handleRequest(`payment-receipt/${employeeId}`, data, 'POST')
export const getPaymentReceipts = async (employeeId) => handleRequest(`payment-receipt/${employeeId}`, {}, 'GET')
