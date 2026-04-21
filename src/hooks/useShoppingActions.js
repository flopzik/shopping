import { useShopping } from "./useShopping";
import {
  validateItemName,
  isDuplicateItem,
  createShoppingItem,
} from "../services/shoppingService";
import {
  confirmClearAll,
  confirmClearBought,
} from "../services/dialogService";

export function useShoppingActions() {
  const { state, dispatch } = useShopping();

  const setItemName = (value) => {
    dispatch({ type: "SET_ITEM_NAME", payload: value });
  };

  const setCategory = (value) => {
    dispatch({ type: "SET_CATEGORY", payload: value });
  };

  const setCategoryFilter = (value) => {
    dispatch({ type: "SET_CATEGORY_FILTER", payload: value });
  };

  const setStatusFilter = (value) => {
    dispatch({ type: "SET_STATUS_FILTER", payload: value });
  };

  const setSearch = (value) => {
    dispatch({ type: "SET_SEARCH", payload: value });
  };

  const setSortBy = (value) => {
    dispatch({ type: "SET_SORT_BY", payload: value });
  };

  const setError = (value) => {
    dispatch({ type: "SET_ERROR", payload: value });
  };

  const addItem = () => {
    const errorMessage = validateItemName(state.form.itemName);

    if (errorMessage) {
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return;
    }

    if (
      isDuplicateItem(state.items, state.form.itemName, state.form.category)
    ) {
      dispatch({
        type: "SET_ERROR",
        payload: "Такий товар уже є в цій категорії",
      });
      return;
    }

    const newItem = createShoppingItem(
      state.form.itemName,
      state.form.category
    );

    dispatch({ type: "ADD_ITEM", payload: newItem });
  };

  const toggleBought = (id) => {
    dispatch({ type: "TOGGLE_ITEM", payload: id });
  };

  const deleteItem = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  const clearAllItems = () => {
    if (confirmClearAll()) {
      dispatch({ type: "CLEAR_ALL" });
    }
  };

  const clearBoughtItems = () => {
    if (confirmClearBought()) {
      dispatch({ type: "CLEAR_BOUGHT" });
    }
  };

  return {
    setItemName,
    setCategory,
    setCategoryFilter,
    setStatusFilter,
    setSearch,
    setSortBy,
    setError,
    addItem,
    toggleBought,
    deleteItem,
    clearAllItems,
    clearBoughtItems,
  };
}