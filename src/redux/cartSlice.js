import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		total: 0,
	},
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ ...newItem, quantity: 1 });
			}
			state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
		},

		removeFromCart: (state, action) => {
			const id = action.payload;
			state.items = state.items.filter((item) => item.id !== id);

			state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
		},

		updateQuantity: (state, action) => {
			const { id, quantity } = action.payload;
			const item = state.items.find((item) => item.id === id);

			if (item) {
				item.quantity = quantity;
			}

			state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
		},
		clearCart: (state) => {
			state.items = [];
			state.total = 0;
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
