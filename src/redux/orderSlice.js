import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitOrder, getOrders } from "../services/apiData";


export const placeOrder = createAsyncThunk(
	"order/placeOrder",
	async ({ tenantName, items }, { rejectWithValue }) => {
		try {
			const response = await submitOrder(tenantName, items);

			
			const orderData = response.order || {};

			return {
				...orderData,
				
				eta: orderData.eta || "5",
				orderId: orderData.id || `#${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
			};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);


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
		orderHistory: [], 
		loading: false,
		error: null,
		eta: null,
		orderId: null,
	},
	reducers: {
		
		saveReceipt: (state, action) => {
			const orderDetails = action.payload;
			state.orderHistory.push(orderDetails);
		},
	},
	extraReducers: (builder) => {
		builder
			
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
