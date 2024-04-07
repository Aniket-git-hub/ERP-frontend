import { handleRequest } from "../../data";


export const getTransactions = async () => handleRequest('/transaction', {}, 'GET')
