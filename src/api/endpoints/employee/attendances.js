import { handleRequest } from "../../data";

// attendance methods 
export const addAttendance = async (employeeId, data) => handleRequest(`/attendance/${employeeId}`, data, 'POST')
export const getAggregateAttendance = async (employeeId, type, month, year) => handleRequest(`/attendance/aggregate/${employeeId}/?type=${type}&year=${year}&month=${month}`, {}, 'GET')
export const getEmployeesAttendance = async (employeeId, date) => handleRequest(`/attendance/${employeeId}?date=${date}`, {}, 'GET')
