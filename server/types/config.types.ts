/**
 * Typescript module for API configuration.
 * @module config.types
 */

/**
 * Interface defining various API endpoints.
 */
export interface EndPoints {
  healthCareEndPoint       : string; // Endpoint for health care
  registerEndPoint         : string; // Endpoint for user registration
  loginEndPoint            : string; // Endpoint for user login
  bestMoveEndPoint         : string; // Endpoint for getting the best move
  bestMoveHeuristicEndPoint: string; // Endpoint for getting the best move heuristic function
  // Add other endpoints as needed
}

/**
 * Interface defining the configuration for API endpoints.
 */
export interface Configuration {
  [key: string]: string; // Configuration object with string keys and string values
}

/**
 * Interface defining storage token keys.
 */
export interface StorageToken {
  storageTokenKeyName       : string; // Key name for access token in storage
  storageRefreshTokenKeyName: string; // Key name for refresh token in storage
}
