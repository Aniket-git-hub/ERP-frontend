import { handleRequest } from "../../data"

// employee methods
export const addEmployee = async (data) =>
  handleRequest(`/employee`, data, "POST")
export const getEmployees = async () => handleRequest(`/employee`, {}, "GET")
export const getEmployeeOptions = async () =>
  handleRequest(`/employee/options`, {}, "GET")
export const updateEmployee = async (data, employeeId) =>
  handleRequest(`/employee/${employeeId}`, data, "PUT")
export const deleteEmployee = async (employeeId) =>
  handleRequest(`/employee/${employeeId}`, {}, "DELETE")
