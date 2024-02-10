interface EndPoints {
  test: string;
  // Add other endpoints as needed
}

interface Configuration {
  [key: string]: string;
}

interface StorageToken {
  storageTokenKeyName: string;
  storageRefreshTokenKeyName: string;
  storageFoodTruck: string;
}
const BASED_URL : string = process.env.BASED_URL ?? "https://flask-app-h2bx.onrender.com"
const endPoints: EndPoints = {
  // -- auth endPoints
  test: '/health-care', // -- log in based url
};

function getEndPoints(): Configuration {
  const configWithBaseUrl: Configuration = {};
  for (const endpoint in endPoints) {
    configWithBaseUrl[endpoint] = BASED_URL + endPoints[endpoint as keyof EndPoints];
  }
  return configWithBaseUrl;
}

const tokenType: string = 'Bearer';

const storageToken: StorageToken = {
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
  storageFoodTruck: 'foodTruck',
};

const apiConfig: Configuration = {
  ...getEndPoints(),
  tokenType,
  ...storageToken,
};

export default apiConfig;
