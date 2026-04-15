import { useShopping } from "../hooks/useShopping";

function AddItemForm() {
  const {
    categories,
    itemName,
    setItemName,
    category,
    setCategory,
    addItem,
    error,
    setError,
  } = useShopping();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
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
  );
}

export default AddItemForm;