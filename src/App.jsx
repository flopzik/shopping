import { useEffect, useMemo, useState } from "react";
import "./App.css";

const categories = ["Продукти", "Побут", "Одяг", "Техніка", "Інше"];

function App() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Продукти");
  const [categoryFilter, setCategoryFilter] = useState("Усі");
  const [statusFilter, setStatusFilter] = useState("Усі");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [error, setError] = useState("");

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
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

  return (
    <div className="page">
      <div className="container">
        <h1>Список покупок</h1>
        <p className="subtitle">
          Додавання, пошук, фільтрація та збереження списку покупок
        </p>

        <div className="card">
          <h2>Додати товар</h2>

          <div className="form">
            <input
              type="text"
              placeholder="Введіть назву товару"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <button onClick={addItem}>Додати</button>
          </div>

          {error && <p className="error">{error}</p>}
        </div>

        <div className="stats">
          <div className="stat-box">
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Усього</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{boughtCount}</span>
            <span className="stat-label">Куплено</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{notBoughtCount}</span>
            <span className="stat-label">Не куплено</span>
          </div>
        </div>

        <div className="card">
          <h2>Фільтри та пошук</h2>

          <div className="filters-grid">
            <div className="field">
              <label>Пошук</label>
              <input
                type="text"
                placeholder="Пошук за назвою"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Категорія</label>
              <select
                value={categoryFilter}
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>Усі</option>
                <option>Куплені</option>
                <option>Не куплені</option>
              </select>
            </div>

            <div className="field">
              <label>Сортування</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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

        <div className="card">
          <h2>Список товарів</h2>

          {visibleItems.length === 0 ? (
            <p className="empty">Нічого не знайдено</p>
          ) : (
            <ul className="list">
              {visibleItems.map((item) => (
                <li key={item.id} className={item.bought ? "list-item bought" : "list-item"}>
                  <div className="item-info">
                    <div className="item-top">
                      <span className="item-name">{item.name}</span>
                      <span className="badge">{item.category}</span>
                    </div>
                    <div className="item-date">Додано: {item.createdAt}</div>
                  </div>

                  <div className="item-buttons">
                    <button onClick={() => toggleBought(item.id)}>
                      {item.bought ? "Повернути" : "Куплено"}
                    </button>
                    <button className="danger-btn" onClick={() => deleteItem(item.id)}>
                      Видалити
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;