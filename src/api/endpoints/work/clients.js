import { handleRequest } from "../../data"

/**
 * Fetches clients from the server.
 *
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getClients = async () => handleRequest("/client/", {}, "GET")

/**
 * Adds a new client.
 *
 * @param {object} data - The data for creating the client.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const addClient = async (data) => handleRequest("/client", data, "POST")

/**
 * Updates a client.
 *
 * @param {string} clientId - The ID of the client to be updated.
 * @param {object} data - The updated data for the client.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const updateClient = async (clientId, data) =>
  handleRequest(`/client/${clientId}`, data, "PUT")

/**
 * Deletes a client.
 *
 * @param {string} clientId - The ID of the client to be deleted.
 * @returns {Promise} - A Promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const deleteClient = async (clientId) =>
  handleRequest(`/client/${clientId}`, {}, "DELETE")
