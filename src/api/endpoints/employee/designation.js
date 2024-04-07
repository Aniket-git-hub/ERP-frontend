import { handleRequest } from "../../data"

// designation
export const addDesignation = async (data) => handleRequest(`/employee/designation`, data, 'POST')
export const getDesignation = async (designationId) => handleRequest(`/employee/designation/${designationId}`, {}, 'GET')
export const getAllDesignation = async () => handleRequest(`/employee/designation`, {}, 'GET')
export const getAllDesignationByDepartment = async () => handleRequest(`/employee/designation?grouped=true`, {}, 'GET')
export const updateDesignation = async (data, designationId) => handleRequest(`/employee/designation/${designationId}`, data, 'PUT')
export const deleteDesignation = async (designationId) => handleRequest(`/employee/designation/${designationId}`, {}, 'DELETE')
