import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true" || false);
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedAdmin = localStorage.getItem("admin");
      if (storedToken && storedAdmin) {
        setToken(storedToken);
        setAdmin(true);
        // You could also verify the token with the backend here if needed
      }
    };
    checkAuth();
  }, []);

  // Your existing fetchFoodList function
  const fetchFoodList = async () => {
    try {
      console.log("Fetching food list from:", url + "/api/food/list");
      const response = await axios.get(url + "/api/food/list");
      console.log("Food list response:", response.data);
      
      if (response.data.success && response.data.data) {
        setFoodList(response.data.data);
        console.log("Food list set:", response.data.data);
      } else {
        console.error("Invalid response format:", response.data);
        setFoodList([]); // Set empty array if no data
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setFoodList([]); // Set empty array on error
    }
  };

  // Add authentication check function
  const checkAuthenticated = () => {
    return token && admin;
  };

  // Add protected request helper
  const makeAuthenticatedRequest = async (config) => {
    if (!token) {
      throw new Error('No authentication token');
    }
    return axios({
      ...config,
      headers: {
        ...config.headers,
        token: token
      }
    });
  };

  // Your existing cart functions
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Your existing useEffects
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
    }
    loadData();
  }, []);

  useEffect(() => {
    console.log("Food list updated, length:", food_list.length);
    console.log("Food list items:", food_list);
  }, [food_list]);

  const contextValue = {
    // Your existing context values
    token,
    setToken,
    admin,
    setAdmin,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    fetchFoodList,
    // Add new authentication-related values
    checkAuthenticated,
    makeAuthenticatedRequest
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;