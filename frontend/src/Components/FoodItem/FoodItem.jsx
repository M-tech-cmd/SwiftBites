import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Add console logs for debugging
  const handleAddClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log("Adding item to cart:", id);
    addToCart(id);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log("Removing item from cart:", id);
    removeFromCart(id);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={handleAddClick} // Make sure onClick is properly set
            src={assets.add_icon_white}
            alt=""
            style={{ cursor: 'pointer' }} // Add cursor pointer to indicate clickable
          />
        ) : (
          <div className="food-item-counter">
            <img 
              onClick={handleRemoveClick}
              src={assets.remove_icon_red} 
              alt=""
              style={{ cursor: 'pointer' }}
            />
            <p>{cartItems[id]}</p>
            <img 
              onClick={handleAddClick}
              src={assets.add_icon_green} 
              alt=""
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;