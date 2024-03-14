import instance from "../config/axios.config";
/**
 * Data object for creating a new material.
 *
 * @typedef {object} MaterialData
 * @property {string} name - The name of the material.
 * @property {number} density - The density of the material.
 * @property {number} hardness - The hardness of the material.
 */
/**
 * Data object for creating a new scrap sell.
 *
 * @typedef {object} ScrapSellData
 * @property {string} materialId - The ID of the material being sold.
 * @property {number} quantity - The quantity of the material being sold.
 * @property {number} unitPrice - The unit price of the material being sold.
 */
/**
 * Handles HTTP requests using Axios.
 *
 * @param {string} endpoint - The API endpoint.
 * @param {object} data - The data to be sent with the request.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
const handleRequest = async (endpoint, data, method) => {
    try {
        let response;
        const token = `Bearer ${localStorage.getItem('accessToken')}`
        const config = {
            headers: {
                Authorization: token,
            },
        };
        if (data.responseType) {
            config.responseType = data.responseType
        }
        switch (method) {
            case "GET":
                response = await instance.get(endpoint, config);
                break;
            case "POST":
                response = await instance.post(endpoint, data, config);
                break;
            case "PUT":
                response = await instance.put(endpoint, data, config);
                break;
            case "DELETE":
                response = await instance.delete(endpoint, config);
                break;
            default:
                throw new Error("Invalid method");
        }
        if (response.status === 200 || response.status === 201) {
            return response;
        }
    } catch (error) {
        throw error
    }
}

/**
 * Fetches materials from the server.
 *
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getMaterials = async () => handleRequest('/material/', {}, 'GET');

/**
 * Adds a new material.
 *
 * @param {MaterialData} data - The data for creating the material.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const addMaterial = async (data) => handleRequest('/material', data, 'POST');

/**
 * Updates a material.
 *
 * @param {string} materialId - The ID of the material to be updated.
 * @param {MaterialData} data - The updated data for the material.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const updateMaterial = async (materialId, data) => handleRequest(`/material/${materialId}`, data, 'PUT');

/**
 * Deletes a material.
 *
 * @param {string} materialId - The ID of the material to be deleted.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const deleteMaterial = async (materialId) => handleRequest(`/material/${materialId}`, {}, 'DELETE');

// Client methods
export const getClients = async () => handleRequest('/client/', {}, 'GET')
export const addClient = async (data) => handleRequest('/client', data, 'POST')
export const updateClient = async (clientId, data) => handleRequest(`/client/${clientId}`, data, 'PUT')
export const deleteClient = async (clientId) => handleRequest(`/client/${clientId}`, {}, 'DELETE')

// Jobs methods
export const getJobs = async ({ page, limit, filters }) => {
    let endpoint = `/job?page=${page}&limit=${limit}`;

    if (filters) {
        Object.keys(filters).forEach((key) => {
            endpoint += `&${key}=${encodeURIComponent(filters[key])}`;
        });
    }

    return handleRequest(endpoint, {}, 'GET');
};
export const getJobsByIds = async (jobIds) => handleRequest(`/job/ids?jobIds=${jobIds.join(',')}`, {}, 'GET')
export const deleteJob = async (jobId) => handleRequest(`/job/${jobId}`, {}, 'DELETE')
export const updateJob = async (jobId, data) => handleRequest(`/job/${jobId}`, data, 'PUT')
export const addJob = async (data) => handleRequest('/job/', data, 'POST')
export const getAggregateJobData = async (type, year, month) => handleRequest(`/job/aggregate?type=${type}&month=${month}&year=${year}`, {}, 'GET')

// Invoice methods
export const getInvoices = async (data) => handleRequest('/invoice', {}, 'GET')
export const createInvoice = async (data) => handleRequest('/invoice', data, 'POST')
export const getInvoicePDF = async (invoiceId) => handleRequest(`/invoice/generatePdf/${invoiceId}`, { responseType: 'blob' }, 'GET')
export const getAggregateInvoiceData = async (type, year, month) => handleRequest(`/invoice/aggregate?type=${type}&month=${month}&year=${year}`, {}, 'GET')

// employee methods 
export const addEmployee = async (data) => handleRequest(`/employee`, data, 'POST')
export const getEmployees = async () => handleRequest(`/employee`, {}, 'GET')
export const updateEmployee = async (data, employeeId) => handleRequest(`/employee/${employeeId}`, data, 'PUT')
export const deleteEmployee = async (employeeId) => handleRequest(`/employee/${employeeId}`, {}, 'DELETE')

// employee methods 
export const addEmployeeAttendance = async (data) => handleRequest(`/employee`, data, 'POST')
export const getEmployeesAttendance = async (employeeId, date) => handleRequest(`/attendance/${employeeId}?date=${date}`, {}, 'GET')
export const updateEmployeeAttendance = async (data, employeeId) => handleRequest(`/employee/${employeeId}`, data, 'PUT')
export const deleteEmployeeAttendance = async (employeeId) => handleRequest(`/employee/${employeeId}`, {}, 'DELETE')
export const getAggregateAttendance = async (employeeId, type, month, year) => handleRequest(`/attendance/aggregate/${employeeId}/?type=${type}&year=${year}&month=${month}`, {}, 'GET')

// payment receipts methods 
export const createPaymentReceipt = async (data, employeeId) => handleRequest(`payment-receipt/${employeeId}`, data, 'POST')
export const getPaymentReceipts = async (employeeId) => handleRequest(`payment-receipt/${employeeId}`, {}, 'GET')

// expense methods 
export const getExpenses = async () => handleRequest('/expense', {}, 'GET')
export const createExpense = async (data) => handleRequest('/expense', data, 'POST')
export const updateExpense = async (data, expenseId) => handleRequest(`/expense/${expenseId}`, data, 'PUT')
export const deleteExpense = async (expenseId) => handleRequest(`/expense/${expenseId}`, {}, 'DELETE')

// budget methods 
export const getBudgets = async () => handleRequest('/budget', {}, 'GET')
export const createBudgets = async (data) => handleRequest('/budget', data, 'POST')
export const updateBudgets = async (data, budgetId) => handleRequest(`/budget/${budgetId}`, data, 'PUT')
export const deleteBudgets = async (budgetId) => handleRequest(`/budget/${budgetId}`, {}, 'DELETE')

// transaction methods 
export const getTransactions = async () => handleRequest('/transaction', {}, 'GET')

// expense category methods 
export const getExpenseCategories = async () => handleRequest('/expense-category', {}, 'GET')
export const createExpenseCategory = async (data) => handleRequest('/expense-category', data, 'POST')
export const updateExpenseCategory = async (data, expenseCategoryId) => handleRequest(`/expense-category/${expenseCategoryId}`, data, 'PUT')
export const deleteExpenseCategory = async (expenseCategoryId) => handleRequest(`/expense-category/${expenseCategoryId}`, {}, 'DELETE')


/**
 * Fetches scrap sells from the server.
 *
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getScrapSell = async () => handleRequest(`/scrap-sell`, {}, 'GET');

/**
 * Adds a new scrap sell.
 *
 * @param {ScrapSellData} data - The data for creating the scrap sell.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const addScrapSell = async (data) => handleRequest('/scrap-sell', data, 'POST');

/**
 * Updates a scrap sell.
 *
 * @param {string} scrapSellId - The ID of the scrap sell to be updated.
 * @param {ScrapSellData} data - The updated data for the scrap sell.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const updateScrapSell = async (scrapSellId, data) =>
    handleRequest(`/scrap-sell/${scrapSellId}`, data, 'PUT');

/**
 * Deletes a scrap sell.
 *
 * @param {string} scrapSellId - The ID of the scrap sell to be deleted.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const deleteScrapSell = async (scrapSellId) =>
    handleRequest(`/scrap-sell/${scrapSellId}`, {}, 'DELETE');

