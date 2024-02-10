/**
 * Typescript module for API configuration.
 * @module config
 */

import { Configuration, EndPoints, StorageToken } from "./types/config.types";

/**
 * Base URL for the API endpoints.
 * Defaults to a specified URL or a backup URL if not provided in the environment variables.
 */
const BASED_URL: string = process.env.BASED_URL ?? "https://flask-app-h2bx.onrender.com";

/**
 * Object containing various API endpoints.
 */
const endPoints: EndPoints = {
  healthCareEndPoint: '/health-care'        , // Test server endPoint for health care
  loginEndPoint: '/login'                   , // EndPoint for logging in users
  registerEndPoint: '/register'             , // EndPoint for registering users
  bestMoveEndPoint: '/ai/best_move'         , // EndPoint for getting the best move for the computer
  bestMoveHeuristicEndPoint: '/ai/heuristic', // EndPoint for getting the best move heuristic function
};

/**
 * Retrieves the full configuration with the base URL appended to each endpoint.
 * @returns {Configuration} - Configuration object containing all endpoints with their respective base URLs.
 */
function getEndPoints(): Configuration {
  const configWithBaseUrl: Configuration = {};
  for (const endpoint in endPoints) {
    configWithBaseUrl[endpoint] = BASED_URL + endPoints[endpoint as keyof EndPoints];
  }
  return configWithBaseUrl;
}

/**
 * Type of token to be used for authentication.
 */
const tokenType: string = 'Bearer';

/**
 * Object containing keys for storage tokens.
 */
const storageToken: StorageToken = {
  storageTokenKeyName       : 'accessToken' , // Key name for access token in storage
  storageRefreshTokenKeyName: 'refreshToken', // Key name for refresh token in storage
};

/**
 * Configuration object containing all API endpoints, token types, and storage token keys.
 */
const apiConfig: Configuration = {
  ...getEndPoints(), // Merges endpoints with their base URLs
  ...storageToken  , // Merges storage token keys
  tokenType        , // Token type for authentication
};

export default apiConfig;
