import { useContext } from "react";
import MealContext from "../MealContext";
import CartItem from "./CartItem";

export default function CartModal({ ref, closeModal, handleCheckoutModal }) {
  const { state, totalCartAmount, numItemsInCart } = useContext(MealContext);
  {
    console.log(numItemsInCart);
  }
  return (
    <dialog className="cart modal" ref={ref}>
      <h2>Your Cart</h2>
      {numItemsInCart ? (
        <ul>
          {state.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.productId}
                productId={cartItem.productId}
                itemName={cartItem.name}
                itemPrice={cartItem.price}
                quantity={cartItem.quantity}
              />
            );
          })}
        </ul>
      ) : (
        <p>Empty Cart</p>
      )}
      <div className="cart-total">
        <span>{`Total Amount: $${totalCartAmount}`}</span>
      </div>
      <div className="modal-actions">
        <button className="text-button" onClick={closeModal}>
          Close
        </button>
        <button
          className="button"
          onClick={handleCheckoutModal}
          disabled={numItemsInCart <= 0}
        >
          Go to Checkout
        </button>
      </div>
    </dialog>
  );
}
