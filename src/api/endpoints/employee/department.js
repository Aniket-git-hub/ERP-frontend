import { handleRequest } from "../../data"

// department
export const addDepartment = async (data) => handleRequest(`/employee/department/`, data, 'POST')
export const getDepartment = async (departmentId) => handleRequest(`/employee/department/${departmentId}`, {}, 'GET')
export const getAllDepartment = async () => handleRequest(`/employee/department/`, {}, 'GET')
export const updateDepartment = async (data, departmentId) => handleRequest(`/employee/department/${departmentId}`, data, 'PUT')
export const deleteDepartment = async (departmentId) => handleRequest(`/employee/department/${departmentId}`, {}, 'DELETE')
