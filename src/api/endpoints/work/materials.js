/**
 * Data object for creating a new material.
 *
 * @typedef {object} MaterialData
 * @property {string} name - The name of the material.
 * @property {number} density - The density of the material.
 * @property {number} hardness - The hardness of the material.
 */


import { handleRequest } from "../../data";

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
