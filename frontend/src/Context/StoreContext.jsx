import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://swiftbites-backend-hklo.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Add function to fetch cart data
    const fetchCartData = async () => {
        try {
            if (token) {
                const response = await axios.get(`${url}/api/cart/`, { // Changed from /api/cart to /api/cart/
                    headers: { token }
                });
                console.log("Cart data from server:", response.data);
                if (response.data && response.data.cartData) {
                    setCartItems(response.data.cartData);
                }
            }
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        }
    };

    const addToCart = async (itemId) => {
        try {
            if (token) {
                const response = await axios.post(`${url}/api/cart/add`, 
                    { itemId }, 
                    { headers: { token } }
                );
                console.log("Add to cart response:", response.data);
                if (response.data.success && response.data.cartData) {
                    setCartItems(response.data.cartData);
                } else {
                    await fetchCartData(); // Fallback to fetch cart if no cartData in response
                }
            } else {
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: (prev[itemId] || 0) + 1
                }));
            }
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };
    const removeFromCart = async (itemId) => {
        try {
            if (token) {
                await axios.post(`${url}/api/cart/remove`, { itemId }, {
                    headers: { token }
                });
                // Fetch updated cart data after removing item
                await fetchCartData();
            } else {
                // Local cart management when not logged in
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
                }));
            }
        } catch (error) {
            console.error("Failed to remove from cart:", error);
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

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            console.log("Food data:", response.data);
            if (response.data && response.data.data) {
                setFoodList(response.data.data);
            } else if (response.data) {
                setFoodList(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
    };

    // Effect for initial data load
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
            setIsLoading(false);
        };
        loadData();
    }, []);

    // Effect to fetch cart data when token changes
    useEffect(() => {
        if (token) {
            fetchCartData();
        } else {
            setCartItems({}); // Clear cart when logged out
        }
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        isLoading
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
