export {};
declare global {
  export interface GlobalDataObject {
    [key: string]: number | string | {};
  }
  export interface IError extends Error {
    code: string;
    title: string;
    data?: GlobalDataObject | undefined;
  }
  export interface JwtPayload {
    userID: string;
    type: any;
    iat: number;
    exp: number;
  }
}
