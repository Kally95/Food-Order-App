import { useContext } from "react";
import MealContext from "../MealContext";

export default function CartItem({ productId, itemName, itemPrice, quantity }) {
  const { dispatch } = useContext(MealContext);

  return (
    <li className="cart-item">
      <div className="cart-item-details">
        <p>
          {itemName} - {quantity} x <span>{`$${itemPrice}`}</span>
        </p>
      </div>
      <div className="cart-item-actions">
        <button
          onClick={() =>
            dispatch({ type: "REMOVE_FROM_CART", payload: { productId } })
          }
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() =>
            dispatch({ type: "ADD_TO_CART", payload: { productId } })
          }
        >
          +
        </button>
      </div>
    </li>
  );
}
