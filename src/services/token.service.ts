const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_info';
 
 
const setCookie = (name: string, value: string, days: number = 1): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
 
  const secure = import.meta.env.VITE_COOKIE_SECURE === 'true' ? '; Secure' : '';
  const domain = import.meta.env.VITE_COOKIE_DOMAIN
    ? `; Domain=${import.meta.env.VITE_COOKIE_DOMAIN}`
    : '';
 
  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `expires=${expires.toUTCString()}`,
    'path=/',
    'SameSite=Strict',
    domain,
    secure,
  ].join('; ');
};
 
const getCookie = (name: string): string | null => {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
};
 
const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
};
 
 
export const setAccessToken = (token: string): void => {
  setCookie(ACCESS_TOKEN_KEY, token, 1 / 96); 
};
 
export const getAccessToken = (): string | null => {
  return getCookie(ACCESS_TOKEN_KEY);
};
 
export const removeAccessToken = (): void => {
  deleteCookie(ACCESS_TOKEN_KEY);
};
 
 
export const setRefreshToken = (token: string, rememberMe = false): void => {
  const days = rememberMe ? 7 : 1;
  setCookie(REFRESH_TOKEN_KEY, token, days);
};
 
export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN_KEY);
};
 
export const removeRefreshToken = (): void => {
  deleteCookie(REFRESH_TOKEN_KEY);
};
 
 
export const setUserInfo = (user: Record<string, unknown>): void => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};
 
export const getUserInfo = <T = Record<string, unknown>>(): T | null => {
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};
 
export const removeUserInfo = (): void => {
  sessionStorage.removeItem(USER_KEY);
};
 
 
interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}
 
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
};
 
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload) return true;
  return Date.now() >= (payload.exp - 30) * 1000;
};
 
export const getTokenRole = (token: string): string | null => {
  const payload = decodeToken(token);
  return payload?.role ?? null;
};
 
 
export const clearAllTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
  removeUserInfo();
};
 
const TokenService = {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  decodeToken,
  isTokenExpired,
  getTokenRole,
  clearAllTokens,
};
 
export default TokenService;