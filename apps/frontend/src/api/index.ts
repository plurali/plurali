import axios, { AxiosResponse } from 'axios';
import { clearFlashes, flash, FlashType } from '../store';
import type { Status, StatusMapType, SuccessData } from '@app/v1/dto/Status';
import { $topbar } from '../utils/topbar';
import { $api, ApiResponse } from '@plurali/api-client';

const prodApiUrl = 'https://api.plurali.icu';

const pubdevApiUrl = "https://pubdev.plurali.icu/api";

const apiUrls = {
  // "http://localhost:8000": (window.location.href.includes('.local') || window.location.href.startsWith("http://localhost:5173")),
  // [pubdevApiUrl]: window.location.href.startsWith("https://pubdev.plurali.icu"),
  // "https://dev.plurali.icu/api": window.location.href.startsWith("https://dev.plurali.icu"),
  [prodApiUrl]: window.location.href.startsWith("https://plurali.icu"),
}

const getApiUrl = () => {
  for (const apiUrl in apiUrls) {
    const matches = apiUrls[apiUrl as keyof typeof apiUrls];
    if (matches) {
      return apiUrl;
    }
  }

  return prodApiUrl;
}

const baseURL = getApiUrl();

// Set the same base URL for @plurali/api-client
$api.baseUrl = baseURL;

export const isPubDev = baseURL === pubdevApiUrl;

export const $axios = axios.create({
  baseURL,
});

export const setAuth = (auth: string | null) => {
  if (auth) {
    localStorage.setItem('_plurali_auth', auth);
  } else {
    localStorage.removeItem("_plurali_auth");
  }
  $api.updateAuth(auth);
  $axios.defaults.headers.common.Authorization = `Bearer ${auth}`;
};

const auth = localStorage.getItem('_plurali_auth');
if (auth) {
  setAuth(auth);
}

export const formatError = (e: any) => {
  const unknownErrorMessage = 'Unknown error has occurred. Please try again.';

  const error = e?.response?.data?.error ?? e?.message ?? unknownErrorMessage;

  if (typeof error === "object") {
    return error.message ?? error.type ?? unknownErrorMessage;
  }

  return error;
}

export const wrapRequest = async <T extends object = SuccessData>(
  fn: () => Promise<AxiosResponse<Status<T>> | ApiResponse<T>> | null
): Promise<T | false> => {
  clearFlashes();

  const promise = fn();
  if (!promise) return false;

  try {
    const res = await $topbar.promised(promise);

    // support @plurali/api-client as well as standard axios response
    const data = 'success' in res ? res : res.data;

    // hackaround for 200 errors (should not happen)
    if (!data.success) throw new Error($api.handleException({ response: { data } }).error.message);

    if ('warning' in data.data) {
      flash(String(data.data.warning), FlashType.Warning, false, true);
    }

    return data.data;
  } catch (e) {
    flash($api.handleException(e).error.message, FlashType.Danger, true);
    return false;
  }
};

// copied so it's values can be used
export const StatusMap = {
  InvalidRequest: 'Invalid request',
  InvalidPluralKey: 'Invalid plural key',
  NotAuthenticated: 'Not authenticated',
  PluralKeyNotSpecified: 'Plural key not specified',
  InvalidCredentials: 'Invalid credentials',
  UsernameAlreadyUsed: 'Username is already used',
  InvalidOverride: 'Invalid Override Plural ID',
  ResourceNotFound: 'Resource not found',
  Unauthorized: 'Unauthorized',
  UnsupportedFile: 'Unsupported or invalid file given',
  FileProcessingFailed: 'Failed to process the given file',
  MultipartEndpoint: 'This endpoint is only accepting requests in the multipart form',
  CacheDemand:
    'Due to unexpected higher demand, we were not able to clear cached content, so your changes may not be visible immediately.',
} as StatusMapType;
