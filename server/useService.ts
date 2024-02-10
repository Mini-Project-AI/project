/**
 * Typescript module for use service.
 * @module useService
 */

// ** Server Service Import
import serverService from './service';

/**
 * Function to initialize the use service.
 * @param jwtOverrideConfig Optional override configuration for the JWT service.
 * @returns An instance of the server services.
 */
export default function webService(jwtOverrideConfig?: any) {
  return new serverService(jwtOverrideConfig);
}
