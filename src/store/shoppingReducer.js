export function shoppingReducer(state, action) {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };

    case "SET_ITEM_NAME":
      return {
        ...state,
        form: {
          ...state.form,
          itemName: action.payload,
        },
        error: "",
      };

    case "SET_CATEGORY":
      return {
        ...state,
        form: {
          ...state.form,
          category: action.payload,
        },
      };

    case "SET_CATEGORY_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          categoryFilter: action.payload,
        },
      };

    case "SET_STATUS_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          statusFilter: action.payload,
        },
      };

    case "SET_SEARCH":
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload,
        },
      };

    case "SET_SORT_BY":
      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: action.payload,
        },
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "ADD_ITEM":
      return {
        ...state,
        items: [action.payload, ...state.items],
        form: {
          ...state.form,
          itemName: "",
          category: "Продукти",
        },
        error: "",
      };

    case "TOGGLE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, bought: !item.bought } : item
        ),
      };

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_ALL":
      return {
        ...state,
        items: [],
      };

    case "CLEAR_BOUGHT":
      return {
        ...state,
        items: state.items.filter((item) => !item.bought),
      };

    default:
      return state;
  }
}