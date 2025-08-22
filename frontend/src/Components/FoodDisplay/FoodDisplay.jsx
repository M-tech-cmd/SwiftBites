import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, isLoading } = useContext(StoreContext);
  
  console.log("FoodDisplay rendering");
  console.log("Category:", category);
  console.log("Food list:", food_list);
  console.log("Is Loading:", isLoading);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list && food_list.length > 0 ? (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={item._id || index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null;
          }).filter(Boolean) // Remove null values from map
        ) : (
          <p className="no-food">No food available</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;