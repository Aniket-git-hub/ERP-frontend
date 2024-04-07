import { handleRequest } from "../../data";

// Invoice methods
export const getInvoices = async ({ page, limit, filters }) => {
    let endpoint = `/invoice?page=${page}&limit=${limit}`;

    if (filters) {
        Object.keys(filters).forEach((key) => {
            endpoint += `&${key}=${encodeURIComponent(filters[key])}`;
        });
    }

    return handleRequest(endpoint, {}, 'GET');
};
export const getInvoiceById = async (id) => handleRequest(`/invoice/${id}`, {}, 'GET')
export const createInvoice = async (data) => handleRequest('/invoice', data, 'POST')
export const getInvoicePDF = async (invoiceId) => handleRequest(`/invoice/generatePdf/${invoiceId}`, { responseType: 'blob' }, 'GET')
export const getAggregateInvoiceData = async (type, year, month) => handleRequest(`/invoice/aggregate?type=${type}&month=${month}&year=${year}`, {}, 'GET')
