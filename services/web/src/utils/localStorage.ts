// stores and retrieves cart items from local storage
const localStorageKey = "marketeer_cart_items";

export const getLocalCartItems = (): string[] => {
  const items = localStorage.getItem(localStorageKey);
  return items ? JSON.parse(items) : [];
};

export const setLocalCartItems = (items: string[]): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(items));
};


export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const getUser = (): any | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: any): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem('user');
};

export const clearAuth = (): void => {
  removeToken();
  removeUser();
};