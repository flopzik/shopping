import { createContext, useEffect, useMemo, useReducer } from "react";
import { getItemsFromStorage, saveItemsToStorage } from "../services/api";
import { categories } from "../services/shoppingService";
import { shoppingInitialState } from "./shoppingInitialState";
import { shoppingReducer } from "./shoppingReducer";

export const ShoppingContext = createContext();

export function ShoppingProvider({ children }) {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  useEffect(() => {
    const savedItems = getItemsFromStorage();
    dispatch({ type: "SET_ITEMS", payload: savedItems });
  }, []);

  useEffect(() => {
    saveItemsToStorage(state.items);
  }, [state.items]);

  const visibleItems = useMemo(() => {
    let filtered = [...state.items];

    if (state.filters.categoryFilter !== "Усі") {
      filtered = filtered.filter(
        (item) => item.category === state.filters.categoryFilter
      );
    }

    if (state.filters.statusFilter === "Куплені") {
      filtered = filtered.filter((item) => item.bought);
    } else if (state.filters.statusFilter === "Не куплені") {
      filtered = filtered.filter((item) => !item.bought);
    }

    if (state.filters.search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(state.filters.search.toLowerCase())
      );
    }

    if (state.filters.sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name, "uk"));
    } else if (state.filters.sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name, "uk"));
    } else if (state.filters.sortBy === "category") {
      filtered.sort((a, b) => a.category.localeCompare(b.category, "uk"));
    }

    return filtered;
  }, [state.items, state.filters]);

  const totalCount = state.items.length;
  const boughtCount = state.items.filter((item) => item.bought).length;
  const notBoughtCount = totalCount - boughtCount;

  const value = {
    state,
    dispatch,
    categories,
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