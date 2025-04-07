import Header from "./components/Header";
import MealList from "./components/MealList";
import { MealContextProvider } from "./MealContext";
import CartModal from "./components/CartModal";
import { useRef } from "react";
import CheckoutModal from "./components/CheckoutModal";
import OrderSuccessModal from "./components/OrderSuccessModal";

function App() {
  const cartModalRef = useRef();
  const checkoutModalRef = useRef();
  const orderSuccessModalRef = useRef();

  function handleCartModal() {
    cartModalRef.current.showModal();
  }

  function handleCloseCartModal() {
    cartModalRef.current.close();
  }

  function handleCheckoutModal() {
    handleCloseCartModal();
    checkoutModalRef.current.showModal();
  }

  function handleCloseCheckoutModal() {
    checkoutModalRef.current.close();
  }

  function handleOrderSuccessModal() {
    orderSuccessModalRef.current.showModal();
  }

  function handleCloseOrderSuccessModal() {
    orderSuccessModalRef.current.close();
  }

  return (
    <>
      <MealContextProvider>
        <Header handleCartModal={handleCartModal} />
        <CheckoutModal
          ref={checkoutModalRef}
          closeModal={handleCloseCheckoutModal}
          openSuccessModal={handleOrderSuccessModal}
        />
        <OrderSuccessModal
          ref={orderSuccessModalRef}
          closeSuccessModal={handleCloseOrderSuccessModal}
        />
        <CartModal
          ref={cartModalRef}
          closeModal={handleCloseCartModal}
          handleCheckoutModal={handleCheckoutModal}
        />
        <MealList />
      </MealContextProvider>
    </>
  );
}

export default App;
