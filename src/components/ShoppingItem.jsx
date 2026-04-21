import { useShoppingActions } from "../hooks/useShoppingActions";

function ShoppingItem({ item }) {
  const { toggleBought, deleteItem } = useShoppingActions();

  return (
    <li className={item.bought ? "list-item bought" : "list-item"}>
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
  );
}

export default ShoppingItem;