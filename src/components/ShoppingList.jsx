import { useShopping } from "../hooks/useShopping";
import ShoppingItem from "./ShoppingItem";

function ShoppingList() {
  const { visibleItems } = useShopping();

  return (
    <div className="card">
      <h2>Список товарів</h2>

      {visibleItems.length === 0 ? (
        <p className="empty">Нічого не знайдено</p>
      ) : (
        <ul className="list">
          {visibleItems.map((item) => (
            <ShoppingItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;