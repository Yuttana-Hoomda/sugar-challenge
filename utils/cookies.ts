import Cookies from 'js-cookie'

export const setCookie = (key: string, value: string, options?: Cookies.CookieAttributes) => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); 
    const expireTime = new Date(midnight.getTime() + 5 * 60 * 1000); 
    Cookies.set(key, value, { expires: expireTime, sameSite: 'strict', ...options})
};

export const getCookie = (key: string) => {
    return Cookies.get(key)
};

export const removeCookies = (key: string) => {
    Cookies.remove(key);
};