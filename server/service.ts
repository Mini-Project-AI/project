import axios, { AxiosResponse } from 'axios';
import jwtDefaultConfig from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApiResponse } from './types/response.type';

/**
 * Service class for managing JWT authentication.
 */
export default class JwtService {
  /**
   * Configuration for JWT service.
   */
  jwtConfig = { ...jwtDefaultConfig };
  /**
   * Flag to indicate if there is already a request fetching access token.
   */
  isAlreadyFetchingAccessToken = false;
  /**
   * Override configuration for JWT service.
   */
  jwtOverrideConfig: any;

  /**
   * Constructor for JwtService class.
   * @param jwtOverrideConfig Override configuration for JWT service.
   */
  constructor(jwtOverrideConfig: any) {
    this.jwtConfig = { ...this.jwtConfig };
    this.jwtOverrideConfig = jwtOverrideConfig;

    axios.interceptors.request.use(
      config => {
        const accessToken = this.getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        config.headers['Cache-Control'] = 'no-cache';
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      async function (response) {
        return response as unknown as AxiosResponse<ApiResponse>;
      },
      async function (error) {
        return error as unknown as AxiosResponse<ApiResponse>;
      }
    );
  }

  /**
   * Get access token from local storage.
   * @returns Access token if available, otherwise null.
   */
  getAccessToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
    } else {
      return this.getAccessTokenAsync();
    }
  }

  /**
   * Asynchronously get access token from AsyncStorage.
   * @returns Access token if available, otherwise null.
   */
  async getAccessTokenAsync() {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const parsedToken = JSON.parse(accessToken);
        return parsedToken;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  }

  /**
   * Set access token in local storage or AsyncStorage.
   * @param token Access token to be set.
   */
  async setAccessToken(token: string) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.jwtConfig.storageTokenKeyName, token);
      } else {
        await AsyncStorage.setItem(this.jwtConfig.storageTokenKeyName, JSON.stringify(token));
      }
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  }

  /**
   * Remove access token from local storage or AsyncStorage.
   */
  async removeAccessToken() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
      } else {
        await AsyncStorage.removeItem(this.jwtConfig.storageTokenKeyName);
      }
    } catch (error) {
      console.error('Error removing access token:', error);
    }
  }

  /**
 * Makes a request to the health care endpoint to test the health of the service.
 * @returns A Promise that resolves to the ApiResponse data from the health care endpoint.
 */
async testHealthCare(): Promise<ApiResponse> {
  return (await axios.get(this.jwtConfig.healthCareEndPoint)).data;
}

/**
 * Logs in a user with the provided email and password.
 * @param email The email of the user.
 * @param password The password of the user.
 * @returns A Promise that resolves to the ApiResponse data from the login request.
 */
async loginUser(email: string, password: string): Promise<ApiResponse> {
  return (await axios.post(this.jwtConfig.loginEndPoint, { email, password })).data;
}

/**
 * Registers a new user with the provided details.
 * @param email The email of the user.
 * @param password The password of the user.
 * @param first_name The first name of the user.
 * @param last_name The last name of the user.
 * @param age The age of the user.
 * @returns A Promise that resolves to the ApiResponse data from the registration request.
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
 * Gets the best move for the given board state using the specified algorithm and time constraints.
 * @param board The current board state.
 * @param algorithm A boolean indicating whether to use a specific algorithm.
 * @param time A boolean indicating whether to consider time constraints.
 * @returns A Promise that resolves to the ApiResponse data containing the best move.
 */
async getBestMove(board: number[], algorithm: boolean, time: boolean): Promise<ApiResponse> {
  return (
    await axios.post(this.jwtConfig.bestMoveEndPoint, {
      board,
      algorithm,
      time
    })
  ).data;
}

/**
 * Gets the best move heuristic for the given board state using the specified algorithm and time constraints.
 * @param board The current board state.
 * @param algorithm A boolean indicating whether to use a specific algorithm.
 * @param time A boolean indicating whether to consider time constraints.
 * @returns A Promise that resolves to the ApiResponse data containing the best move heuristic.
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
