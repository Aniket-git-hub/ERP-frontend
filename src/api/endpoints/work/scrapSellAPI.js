/**
 * Data object for creating a new scrap sell.
 *
 * @typedef {object} ScrapSellData
 * @property {string} materialId - The ID of the material being sold.
 * @property {number} quantity - The quantity of the material being sold.
 * @property {number} unitPrice - The unit price of the material being sold.
 */
import { handleRequest } from "../../data";


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

