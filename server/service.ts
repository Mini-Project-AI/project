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
   * web service for login as```login as Food trucker```
   * @name ```loginFoodTrucker```
   * @param {loginFoodTruckerPayloadT} payload
   */
  async testWebService(): Promise<ApiResponse> {
    return (await axios.get(this.jwtConfig.test)).data
  }

}
