import AddItemForm from "../components/AddItemForm";
import Stats from "../components/Stats";
import Filters from "../components/Filters";
import ShoppingList from "../components/ShoppingList";

function HomePage() {
  return (
    <div className="page">
      <div className="container">
        <h1>Список покупок</h1>
        <p className="subtitle">
          Додавання, пошук, фільтрація та збереження списку покупок
        </p>

        <AddItemForm />
        <Stats />
        <Filters />
        <ShoppingList />
      </div>
    </div>
  );
}

export default HomePage;