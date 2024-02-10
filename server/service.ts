// ========================== Web service controller for API ========================== //

//--- import creator HTTP request
import axios, { AxiosResponse } from 'axios';
//--- import based constance variables for APi handler
import jwtDefaultConfig from './config';

/**
 * @see [handleApiError](./types/response.type.ts)
 * @see [handleApiResponse](./types/authPayload.ts)
 * @description scale the responses types return as uniform ones
 */
import { ApiResponse } from './types/response.type';

/**
 * JWT Service class for handling JWT authentication and API requests.
 */
export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false; //--- getting token access finished status

  // ** For Refreshing Token
  jwtOverrideConfig: any;

  /**
   * Constructs a new JwtService instance.
   * @param {Object} jwtOverrideConfig - Custom JWT configuration to override default settings.
   */
  constructor(jwtOverrideConfig: any) {
    this.jwtConfig = { ...this.jwtConfig }; //--- getting based info
    this.jwtOverrideConfig = jwtOverrideConfig;

    //================= Request Interceptor === configuration request before sending HTTP request to the server
    /**
     * @see [axios_interceptors] (https://axios-http.com/docs/interceptors)
     */
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = this.getAccessToken()
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        config.headers['Cache-Control'] = 'no-cache';
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      async function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response as unknown as AxiosResponse<ApiResponse>;
      },
      async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        return error as unknown as AxiosResponse<ApiResponse>;
      },
    );
  }

    /**
   * Method to retrieve the access token from local storage.
   */
    getAccessToken() {
      return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
    }

  // ============== web services methods list ============== //

  /**
 * Web service for testing the server's health status.
 * @name testHealthCare
 * @returns Promise<ApiResponse>
   */
  async testHealthCare(): Promise<ApiResponse> {
    return (await axios.get(this.jwtConfig.healthCareEndPoint)).data
  }

  /**
 * Web service for user login.
 * @name loginUser
 * @param email - User's email
 * @param password - User's password
 * @returns Promise<ApiResponse>
 */
async loginUser(email: string, password: string): Promise<ApiResponse> {
  return (await axios.post(this.jwtConfig.loginEndPoint, { email, password })).data;
}

/**
 * Web service for user registration.
 * @name registerUser
 * @param email - User's email
 * @param password - User's password
 * @param first_name - User's first name
 * @param last_name - User's last name
 * @param age - User's age
 * @returns Promise<ApiResponse>
 */
async registerUser(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  age: number
): Promise<ApiResponse> {
  return (
    await axios.post(this.jwtConfig.registerEndPoint, {
      email,
      password,
      first_name,
      last_name,
      age
    })
  ).data;
}

/**
 * Web service for obtaining the best move in an AI scenario.
 * @name getBestMove
 * @param board - Current state of the board
 * @param algorithm - Flag indicating the algorithm to be used
 * @param time - Flag indicating whether time should be considered
 * @returns Promise<ApiResponse>
 */
async getBestMove(
  board: number[],
  algorithm: boolean,
  time: boolean
): Promise<ApiResponse> {
  return (
    await axios.post(this.jwtConfig.bestMoveEndPoint, {
      board,
      algorithm,
      time
    })
  ).data;
}

/**
 * Web service for obtaining the best move in an AI scenario.
 * @name getBestMoveHeuristic
 * @param board - Current state of the board
 * @param algorithm - Flag indicating the algorithm to be used
 * @param time - Flag indicating whether time should be considered
 * @returns Promise<ApiResponse>
 */
async getBestMoveHeuristic(
  board: number[],
  algorithm: boolean,
  time: boolean
): Promise<ApiResponse> {
  return (
    await axios.post(this.jwtConfig.bestMoveHeuristicEndPoint, {
      board,
      algorithm,
      time
    })
  ).data;
}

}
