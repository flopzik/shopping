export const categories = ["Продукти", "Побут", "Одяг", "Техніка", "Інше"];

export function validateItemName(name) {
  const trimmedName = name.trim();

  if (trimmedName === "") {
    return "Введіть назву товару";
  }

  return "";
}

export function isDuplicateItem(items, name, category) {
  return items.some(
    (item) =>
      item.name.toLowerCase() === name.trim().toLowerCase() &&
      item.category === category
  );
}

export function createShoppingItem(name, category) {
  return {
    id: Date.now(),
    name: name.trim(),
    category,
    bought: false,
    createdAt: new Date().toLocaleString("uk-UA"),
  };
}