import { useShopping } from "../hooks/useShopping";
import { useShoppingActions } from "../hooks/useShoppingActions";

function Filters() {
  const { state, categories } = useShopping();
  const {
    setSearch,
    setCategoryFilter,
    setStatusFilter,
    setSortBy,
    clearBoughtItems,
    clearAllItems,
  } = useShoppingActions();

  return (
    <div className="card">
      <h2>Фільтри та пошук</h2>

      <div className="filters-grid">
        <div className="field">
          <label>Пошук</label>
          <input
            type="text"
            placeholder="Пошук за назвою"
            value={state.filters.search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Категорія</label>
          <select
            value={state.filters.categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>Усі</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Статус</label>
          <select
            value={state.filters.statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Усі</option>
            <option>Куплені</option>
            <option>Не куплені</option>
          </select>
        </div>

        <div className="field">
          <label>Сортування</label>
          <select
            value={state.filters.sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Спочатку нові</option>
            <option value="name-asc">Назва А-Я</option>
            <option value="name-desc">Назва Я-А</option>
            <option value="category">За категорією</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <button className="secondary-btn" onClick={clearBoughtItems}>
          Видалити куплені
        </button>
        <button className="danger-btn" onClick={clearAllItems}>
          Очистити все
        </button>
      </div>
    </div>
  );
}

export default Filters;