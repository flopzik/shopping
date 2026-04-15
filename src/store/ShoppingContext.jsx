import { createContext, useEffect, useMemo, useState } from "react";
import { getItemsFromStorage, saveItemsToStorage } from "../services/api";

export const ShoppingContext = createContext();

const categories = ["Продукти", "Побут", "Одяг", "Техніка", "Інше"];

export function ShoppingProvider({ children }) {
  const [items, setItems] = useState(getItemsFromStorage);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Продукти");
  const [categoryFilter, setCategoryFilter] = useState("Усі");
  const [statusFilter, setStatusFilter] = useState("Усі");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [error, setError] = useState("");

  useEffect(() => {
    saveItemsToStorage(items);
  }, [items]);

  const addItem = () => {
    const trimmedName = itemName.trim();

    if (trimmedName === "") {
      setError("Введіть назву товару");
      return;
    }

    const alreadyExists = items.some(
      (item) =>
        item.name.toLowerCase() === trimmedName.toLowerCase() &&
        item.category === category
    );

    if (alreadyExists) {
      setError("Такий товар уже є в цій категорії");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: trimmedName,
      category,
      bought: false,
      createdAt: new Date().toLocaleString("uk-UA"),
    };

    setItems([newItem, ...items]);
    setItemName("");
    setCategory("Продукти");
    setError("");
  };

  const toggleBought = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearAllItems = () => {
    const confirmed = window.confirm("Очистити весь список?");
    if (confirmed) {
      setItems([]);
    }
  };

  const clearBoughtItems = () => {
    const confirmed = window.confirm("Видалити всі куплені товари?");
    if (confirmed) {
      setItems(items.filter((item) => !item.bought));
    }
  };

  const visibleItems = useMemo(() => {
    let filtered = [...items];

    if (categoryFilter !== "Усі") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    if (statusFilter === "Куплені") {
      filtered = filtered.filter((item) => item.bought);
    } else if (statusFilter === "Не куплені") {
      filtered = filtered.filter((item) => !item.bought);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name, "uk"));
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name, "uk"));
    } else if (sortBy === "category") {
      filtered.sort((a, b) => a.category.localeCompare(b.category, "uk"));
    }

    return filtered;
  }, [items, categoryFilter, statusFilter, search, sortBy]);

  const totalCount = items.length;
  const boughtCount = items.filter((item) => item.bought).length;
  const notBoughtCount = totalCount - boughtCount;

  const value = {
    categories,
    items,
    itemName,
    setItemName,
    category,
    setCategory,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    sortBy,
    setSortBy,
    error,
    setError,
    addItem,
    toggleBought,
    deleteItem,
    clearAllItems,
    clearBoughtItems,
    visibleItems,
    totalCount,
    boughtCount,
    notBoughtCount,
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
}