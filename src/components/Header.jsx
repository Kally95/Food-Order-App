import { useContext } from "react";
import logo from "../assets/logo.jpg";
import MealContext from "../MealContext";

export default function Header({ handleCartModal }) {
  const { numItemsInCart } = useContext(MealContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} />
        <h1 id="title">REACTFOOD</h1>
      </div>
      <button
        className="text-button"
        onClick={handleCartModal}
      >{`Cart (${numItemsInCart})`}</button>
    </header>
  );
}
