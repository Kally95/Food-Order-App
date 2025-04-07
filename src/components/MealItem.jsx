import { useContext } from "react";
import MealContext from "../MealContext";

export default function MealItem({ img, name, price, description }) {
  const { dispatch } = useContext(MealContext);

  function handleAddToCart() {
    dispatch({ type: "ADD_TO_CART", payload: { name, price } });
  }

  return (
    <div className="meal-item">
      <article>
        <img src={`../../backend/public/${img}`} alt={`Picture of ${name}`} />
        <h3>{name}</h3>
        <p className="meal-item-price">{`$${price}`}</p>
        <p className="meal-item-description">{description}</p>
        <div className="meal-item-actions">
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}
