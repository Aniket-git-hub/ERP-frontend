import { handleRequest } from "../../data"

// advances 
export const createAdvance = async (employeeId, data) => handleRequest(`advance/${employeeId}`, data, 'POST')
export const getAdvances = async () => handleRequest(`advance/`, {}, 'GET')
