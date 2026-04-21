import { useShopping } from "../hooks/useShopping";
import { useShoppingActions } from "../hooks/useShoppingActions";

function AddItemForm() {
  const { state, categories } = useShopping();
  const { setItemName, setCategory, addItem, setError } = useShoppingActions();

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
          value={state.form.itemName}
          onChange={(e) => {
            setItemName(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
        />

        <select
          value={state.form.category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button onClick={addItem}>Додати</button>
      </div>

      {state.error && <p className="error">{state.error}</p>}
    </div>
  );
}

export default AddItemForm;