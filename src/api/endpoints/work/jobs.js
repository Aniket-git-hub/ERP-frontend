import { handleRequest } from "../../data";

export const getJobs = async ({ page, limit, filters }) => {
    let endpoint = `/job?page=${page}&limit=${limit}`;

    if (filters) {
        Object.keys(filters).forEach((key) => {
            endpoint += `&${key}=${encodeURIComponent(filters[key])}`;
        });
    }

    return handleRequest(endpoint, {}, 'GET');
};
export const getJobsByIds = async (jobIds) => handleRequest(`/job/ids?jobIds=${jobIds?.join(',')}`, {}, 'GET')
export const deleteJob = async (jobId) => handleRequest(`/job/${jobId}`, {}, 'DELETE')
export const updateJob = async (jobId, data) => handleRequest(`/job/${jobId}`, data, 'PUT')
export const addJob = async (data) => handleRequest('/job/', data, 'POST')
export const getAggregateJobData = async (type, year, month) => handleRequest(`/job/aggregate?type=${type}&month=${month}&year=${year}`, {}, 'GET')
