import { Configuration, EndPoints, StorageToken } from "./types/config.types";

const BASED_URL : string = process.env.BASED_URL ?? "https://flask-app-h2bx.onrender.com"
const endPoints: EndPoints = {
  healthCareEndPoint       : '/health-care'  , // -- test server endPoint
  loginEndPoint            : '/login'        , // -- log in user endPoint
  registerEndPoint         : '/register'     , // -- register user endPoint
  bestMoveEndPoint         : '/ai/best_move' , // -- get best move for computer endPoint
  bestMoveHeuristicEndPoint: '/ai/heuristic' , // -- get best move heuristic function endPoint
};

function getEndPoints(): Configuration {
  const configWithBaseUrl: Configuration = {};
  for (const endpoint in endPoints) {
    configWithBaseUrl[endpoint] = BASED_URL + endPoints[endpoint as keyof EndPoints];
  }
  return configWithBaseUrl;
}

const tokenType: string = 'Bearer';

const storageToken : StorageToken = {
  storageTokenKeyName        : 'accessToken' ,
  storageRefreshTokenKeyName : 'refreshToken',
  storageFoodTruck           : 'foodTruck'   ,
};

const apiConfig: Configuration = {
  ...getEndPoints(),
  ...storageToken,
  tokenType,
};

export default apiConfig;
