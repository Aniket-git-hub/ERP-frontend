import instance from "../config/axios.config";

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

// Material methods 
export const getMaterials = async () => handleRequest('/material/', {}, 'GET')
export const addMaterial = async (data) => handleRequest('/material', data, 'POST')
export const updateMaterial = async (materialId, data) => handleRequest(`/material/${materialId}`, data, 'PUT')
export const deleteMaterial = async (materialId) => handleRequest(`/material/${materialId}`, {}, 'DELETE')

// Client methods
export const getClients = async () => handleRequest('/client/', {}, 'GET')
export const addClient = async (data) => handleRequest('/client', data, 'POST')
export const updateClient = async (clientId, data) => handleRequest(`/client/${clientId}`, data, 'PUT')
export const deleteClient = async (clientId) => handleRequest(`/client/${clientId}`, {}, 'DELETE')

// Jobs methods
export const getJobs = async ({ page, limit, filters }) => {
    // Construct the base URL
    let endpoint = `/job?page=${page}&limit=${limit}`;

    // Check if filters object is provided
    if (filters) {
        // Loop through filters and append to the endpoint
        Object.keys(filters).forEach((key) => {
            endpoint += `&${key}=${encodeURIComponent(filters[key])}`;
        });
    }

    // Make the API request using the constructed endpoint
    return handleRequest(endpoint, {}, 'GET');
};
export const getJobsByIds = async (jobIds) => handleRequest(`/job/ids?jobIds=${jobIds.join(',')}`, {}, 'GET')
export const deleteJob = async (jobId) => handleRequest(`/job/${jobId}`, {}, 'DELETE')
export const updateJob = async (jobId, data) => handleRequest(`/job/${jobId}`, data, 'PUT')
export const addJob = async (data) => handleRequest('/job/', data, 'POST')

// Invoice methods
export const getInvoices = async (data) => handleRequest('/invoice', {}, 'GET')
export const createInvoice = async (data) => handleRequest('/invoice', data, 'POST')
export const getInvoicePDF = async (invoiceId) => handleRequest(`/invoice/generatePdf/${invoiceId}`, { responseType: 'blob' }, 'GET')



//Dashboard methods
export const getDashboardData = async () => handleRequest('/dashboard', {}, 'GET')
//Aggregate method 
export const getAggregateJobData = async (type, year, month) => handleRequest(`/job/aggregate?type=${type}&month=${month}&year=${year}`, {}, 'GET')
export const getAggregateInvoiceData = async (type, year, month) => handleRequest(`/invoice/aggregate?type=${type}&month=${month}&year=${year}`, {}, 'GET')