const STORAGE_KEY = "shoppingItems";

export const getItemsFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveItemsToStorage = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};