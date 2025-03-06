import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiKey, getMenu } from "../services/apiData";

export const fetchApiKey = createAsyncThunk("menu/fetchApiKey", async () => {
	return await getApiKey();
});

export const fetchMenu = createAsyncThunk("menu/fetchMenuItems", async () => {
	return await getMenu();
});

const menuSlice = createSlice({
	name: "menu",
	initialState: {
		apiKey: null,
		items: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(fetchApiKey.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchApiKey.fulfilled, (state, action) => {
				state.loading = false;
				state.apiKey = action.payload;
			})
			.addCase(fetchApiKey.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			.addCase(fetchMenu.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMenu.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchMenu.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default menuSlice.reducer;
