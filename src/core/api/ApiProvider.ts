import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Either} from 'tsmonad';
import {RemoteException} from '../error';

export interface ApiProvider {
  /**
   * @method setToken
   *
   * @description set token to reuse for other request later
   * @param token : the token to identify user
   */
  setToken(token: string): void;

  /**
   * @summary perform @POST request with config
   * @param url
   * @param data
   *
   * @returns Either Axios response with generic data: T or @RemoteException if failed
   */
  post<T>(
    url: string,
    data: any,
  ): Promise<Either<RemoteException, AxiosResponse<T>>>;

  /**
   * @summary perform @GET request with config
   * @param url
   *
   * @returns Either Axios response with generic data: T or @RemoteException if failed
   */
  get<T>(url: string): Promise<Either<RemoteException, AxiosResponse<T>>>;

  /**
   * @summary perform @PUT request with config
   * @param url
   * @param data
   *
   * @returns Either Axios response with generic data: T or @RemoteException if failed
   */
  put<T>(
    url: string,
    data: any,
  ): Promise<Either<RemoteException, AxiosResponse<T>>>;

  /**
   * @summary perform @DELETE request with config
   * @param url
   *
   * @returns Either Axios response with generic data: T or @RemoteException if failed
   */
  delete<T>(url: string): Promise<Either<RemoteException, AxiosResponse<T>>>;
}

export class BearerAuthorizationApiProvider implements ApiProvider {
  private readonly axiosInstance: AxiosInstance;

  private token?: string;

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  setToken(token: string): void {
    this.token = token;
    this.axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
  }

  async post<T>(
    url: string,
    data: any,
  ): Promise<Either<RemoteException, AxiosResponse<T>>> {
    return this.axiosInstance.post(url, data);
  }
  get<T>(url: string): Promise<Either<RemoteException, AxiosResponse<T>>> {
    return this.axiosInstance.get(url);
  }
  put<T>(
    url: string,
    data: any,
  ): Promise<Either<RemoteException, AxiosResponse<T>>> {
    return this.axiosInstance.put(url, data);
  }
  delete<T>(url: string): Promise<Either<RemoteException, AxiosResponse<T>>> {
    return this.axiosInstance.delete(url);
  }
}
