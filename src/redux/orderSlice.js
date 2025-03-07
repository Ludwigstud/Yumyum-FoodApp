import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitOrder, getOrders} from "../services/apiData";

// Thunk to submit an order
export const placeOrder = createAsyncThunk(
	"order/placeOrder",
	async (orderData, { rejectWithValue }) => {
		try {
			const response = await submitOrder(orderData);
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

// Thunk to check order status
export const checkOrderStatus = createAsyncThunk(
	"order/checkStatus",
	async (orderId, { rejectWithValue }) => {
		try {
			const response = await getOrders(orderId);
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

const orderSlice = createSlice({
	name: "order",
	initialState: {
		currentOrder: null,
		orderHistory: [], // Store past orders for receipts
		loading: false,
		error: null,
		eta: null,
		orderId: null,
	},
	reducers: {
		// Store the receipt data after order is complete
		saveReceipt: (state, action) => {
			const orderDetails = action.payload;
			state.orderHistory.push(orderDetails);
		},
	},
	extraReducers: (builder) => {
		builder
			// Place order cases
			.addCase(placeOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(placeOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.currentOrder = action.payload;
				state.eta = action.payload.eta;
				state.orderId = action.payload.orderId;
			})
			.addCase(placeOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Check order status cases
			.addCase(checkOrderStatus.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(checkOrderStatus.fulfilled, (state, action) => {
				state.loading = false;
				state.currentOrder = {
					...state.currentOrder,
					status: action.payload.status,
				};
			})
			.addCase(checkOrderStatus.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { saveReceipt } = orderSlice.actions;
export default orderSlice.reducer;
