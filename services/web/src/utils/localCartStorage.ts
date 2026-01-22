// stores and retrieves cart items from local storage
const localStorageKey = "marketeer_cart_items";

export const getLocalCartItems = (): number[] => {
  const items = localStorage.getItem(localStorageKey);
  return items ? JSON.parse(items) : [];
};

export const setLocalCartItems = (items: number[]): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(items));
};