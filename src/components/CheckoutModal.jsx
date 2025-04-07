import { useContext, useActionState, useState, forwardRef } from "react";
import MealContext from "../MealContext";

function CheckoutModal({ closeModal, openSuccessModal }, ref) {
  const {
    totalCartAmount,
    state: cartItems,
    dispatch,
  } = useContext(MealContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    street: "",
    postal: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [checkoutState, checkoutFormAction, isPending] = useActionState(
    handleCheckoutForm,
    {}
  );

  async function handleCheckoutForm(currentState, formDataObj) {
    const errors = validateFormData(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return currentState;
    }

    setFormErrors({});
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            items: [...cartItems],
            customer: {
              email: formData.email,
              name: formData.fullName,
              street: formData.street,
              "postal-code": formData.postal,
              city: formData.city,
            },
          },
        }),
      });
      const responseData = await response.json();
      dispatch({ type: "CLEAR_CART" });
      closeModal();
      openSuccessModal();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }

  function validateFormData({ fullName, email, street, postal, city }) {
    const errors = {};

    if (!fullName || fullName.trim() === "") {
      errors.fullName = "Full Name is required.";
    }
    if (!email || email.trim() === "") {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address.";
      }
    }
    if (!street || street.trim() === "") {
      errors.street = "Street is required.";
    }
    if (!postal || postal.trim() === "") {
      errors.postal = "Postal code is required.";
    }
    if (!city || city.trim() === "") {
      errors.city = "City is required.";
    }
    return errors;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <dialog ref={ref} className="cart modal">
      <h2>Checkout</h2>
      <p>Total Amount: {`$${totalCartAmount}`}</p>
      <form id="checkoutForm" action={checkoutFormAction} className="control">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          maxLength={15}
          value={formData.fullName}
          onChange={handleChange}
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />

        <div className="control-row">
          <div className="control">
            <label htmlFor="postal">Postal Code</label>
            <input
              id="postal"
              type="text"
              name="postal"
              value={formData.postal}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <div className="errors">
        {Object.keys(formErrors).length > 0 && (
          <ul>
            {Object.values(formErrors).map((error, idx) => (
              <li key={idx} className="error">
                - {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="modal-actions">
        <button className="text-button" onClick={closeModal}>
          Close
        </button>
        <button
          type="submit"
          form="checkoutForm"
          className="button"
          disabled={isPending}
        >
          Submit Order
        </button>
      </div>
    </dialog>
  );
}

export default forwardRef(CheckoutModal);
