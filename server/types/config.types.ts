export interface EndPoints {
  healthCareEndPoint        : string;
  registerEndPoint          : string;
  loginEndPoint             : string;
  bestMoveEndPoint          : string;
  bestMoveHeuristicEndPoint : string;
    // Add other endpoints as needed
}
  
export interface Configuration {
  [key: string]: string;
}
  
export interface StorageToken {
  storageTokenKeyName        : string;
  storageRefreshTokenKeyName : string;
  storageFoodTruck           : string;
}