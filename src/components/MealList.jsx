import { useContext } from "react";
import { MealContext } from "../MealContext";
import MealItem from "./MealItem";

export default function MealList() {
  const { mealData } = useContext(MealContext);
  return (
    <ul id="meals">
      {mealData.map((meal) => {
        return (
          <MealItem
            key={meal.id}
            img={meal.image}
            name={meal.name}
            price={meal.price}
            description={meal.description}
          />
        );
      })}
    </ul>
  );
}
