import type { AxiosInstance, AxiosError } from 'axios';
import axios from 'axios';
import { TokenStorage, $tokenStorage } from './TokenStorage';
import { apiUrl } from './env';
import { ApiError, ApiErrorMessage, ApiErrorResponse } from './types';
import { apiError } from './utils';

export class ApiService {
  public readonly client: AxiosInstance;

  constructor(private _baseUrl: string, public readonly token: TokenStorage) {
    this.client = axios.create({
      baseURL: _baseUrl,
    });

    this.updateAuth();
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
    this.client.defaults.baseURL = value;
  }

  public handleException(e: any): ApiErrorResponse {
    const result: ApiErrorResponse = {
      success: false,
      statusCode: e?.response?.data?.status ?? e?.response?.status ?? e?.status ?? -1,
      error: {
        type: e?.response?.data?.error?.type ?? e?.error?.type ?? ApiError.UnknownError,
        message: this.getErrorMessage(e),
      },
      meta: e?.response?.data?.meta ?? e?.meta ?? {},
    };

    console.log("handleException", { input: e, result })

    return result;
  }

  // fuck me, what kind of state was I in to write this shit
  public getErrorMessage(e: any | ApiError | AxiosError | ApiErrorResponse): string {
    // only accept an object or a string
    if (!e || !['object', 'string'].includes(typeof e)) return ApiErrorMessage[ApiError.UnknownError];

    if (typeof e === 'object') {
      // api v1 error compatibility
      if (typeof e?.response?.data?.error === "string") {
        return e.response.data.error;
      }

      // find error message by it's type
      e = apiError(e?.response?.data?.error?.type ?? e?.error?.type ?? e?.type);
    }

    if (e in ApiErrorMessage) {
      return (ApiErrorMessage as any)[e];
    }

    return e;
  }

  public updateAuth(token?: string|null) {
    if (typeof token !== "undefined") {
      this.token.set(token);
    }

    const auth = this.token.get();
    if (auth) {
      this.client.defaults.headers.common.Authorization = `Bearer ${auth}`;
    }
  }
}

export const $api = new ApiService(apiUrl, $tokenStorage);
