import { handleRequest } from "../../data"

export const getOperations = async () => handleRequest(`/job/operations`, {}, 'GET')
export const addOperations = async (data) => handleRequest(`/job/operations`, data, 'POST')
export const deleteOperation = async (id) => handleRequest(`/job/operations/${id}`, {}, 'PUT')

