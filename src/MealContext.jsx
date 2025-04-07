import { createContext, useReducer } from "react";
import MEAL_DATA from "../backend/data/available-meals.json";
import { v4 as uuidv4 } from "uuid";

export const MealContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (existingItemIndex === -1) {
        return [
          ...state,
          { productId: uuidv4(), ...action.payload, quantity: 1 },
        ];
      } else {
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    }
    case "REMOVE_FROM_CART": {
      const existingItemIndex = state.findIndex((item) => {
        return item.productId === action.payload.productId;
      });
      if (existingItemIndex !== -1) {
        if (state[existingItemIndex].quantity === 1) {
          return state.filter(
            (item) => item.productId !== action.payload.productId
          );
        } else {
          return state.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
      }
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export function MealContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, []);

  const numItemsInCart = state.length;

  const totalCartAmount = state.reduce((acc, curr) => {
    return acc + curr.quantity * +curr.price;
  }, 0);

  return (
    <MealContext.Provider
      value={{
        mealData: MEAL_DATA,
        state,
        dispatch,
        numItemsInCart,
        totalCartAmount,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}
export default MealContext;
