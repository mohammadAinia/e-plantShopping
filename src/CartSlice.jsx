// CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to the cart
    addItem: (state, action) => {
      const itemExists = state.cartItems.find(item => item.name === action.payload.name);
      if (itemExists) {
        // Item exists, increase the quantity
        itemExists.quantity += 1;
      } else {
        // Item does not exist, add with quantity set to 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    
    
    // Remove item from the cart
    removeItem: (state, action) => {
      const index = state.cartItems.findIndex(item => item.name === action.payload.name);
      if (index !== -1) {
          state.cartItems.splice(index, 1); // Remove the item from the cart
      }
  },
    
    // Update quantity of an item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.cartItems.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    }
  }
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectTotalQuantity = (state) => {
  console.log("Cart Items:", state.cart.cartItems); // Log cart items
  return state.cart.cartItems.reduce((total, item) => {
    console.log("Item quantity:", item.quantity); // Log each item's quantity
    return total + item.quantity;
  }, 0);
};
// Export reducer to be used in store.js
export default cartSlice.reducer;
