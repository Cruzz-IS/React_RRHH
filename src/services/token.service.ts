const ACCESS_TOKEN_KEY  = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY          = 'user_info';
 
 
const setCookie = (name: string, value: string, days: number): void => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure  = import.meta.env.VITE_COOKIE_SECURE === 'true' ? '; Secure' : '';
  const domain  = import.meta.env.VITE_COOKIE_DOMAIN
    ? `; Domain=${import.meta.env.VITE_COOKIE_DOMAIN}` : '';
  document.cookie =
    `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict${domain}${secure}`;
};
 
const getCookie = (name: string): string | null => {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
};
 
const deleteCookie = (name: string): void => {
  document.cookie =
    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
};
 
 
const setAccessToken = (token: string): void =>
  setCookie(ACCESS_TOKEN_KEY, token, 1 / 96); // 15 min
 
const getAccessToken = (): string | null =>
  getCookie(ACCESS_TOKEN_KEY);
 
const removeAccessToken = (): void =>
  deleteCookie(ACCESS_TOKEN_KEY);
 
const setRefreshToken = (token: string, rememberMe = false): void =>
  setCookie(REFRESH_TOKEN_KEY, token, rememberMe ? 7 : 1);
 
const getRefreshToken = (): string | null =>
  getCookie(REFRESH_TOKEN_KEY);
 
const removeRefreshToken = (): void =>
  deleteCookie(REFRESH_TOKEN_KEY);
 
 
const setUserInfo = (user: object): void =>
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
 
const getUserInfo = <T = unknown>(): T | null => {
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as T; }
  catch { return null; }
};
 
const removeUserInfo = (): void =>
  sessionStorage.removeItem(USER_KEY);
 
 
interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
  [key: string]: unknown;
}
 
const decodeToken = (token: string): JwtPayload | null => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json   = decodeURIComponent(
      atob(base64).split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')
    );
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};
 
const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload) return true;
  return Date.now() >= (payload.exp - 30) * 1000;
};
 
 
const clearAllTokens = (): void => {
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
  clearAllTokens,
};
 
export default TokenService;