/**
 * Typescript module for API response.
 * @module response.type
 */

/**
 * Interface defining the structure of an API response.
 */
export interface ApiResponse {
  statusCode: number ; // HTTP status code of the response
  status    : boolean; // Boolean indicating the status of the response (e.g., success or failure)
  data?     : any    ; // Optional data payload of the response
  message   : string ; // Message associated with the response
}