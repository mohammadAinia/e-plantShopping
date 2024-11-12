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
      const newItem = action.payload;
      // Check if the item is already in the cart
      const existingItem = state.cartItems.find(item => item.name === newItem.name);
      if (existingItem) {
        // If item exists, update its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If item does not exist, add it to the cart
        state.cartItems.push(newItem);
      }
    },
    
    // Remove item from the cart
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.cartItems = state.cartItems.filter(item => item.name !== itemName);
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

// Export reducer to be used in store.js
export default cartSlice.reducer;
