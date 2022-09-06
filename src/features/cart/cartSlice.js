import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { openModal } from '../modal/modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
	cartItems: [],
	amount: 4,
	total: 0,
	isLoading: true,
};

// export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
// 	return fetch(url)
// 		.then(res => res.json())
// 		.catch(err => console.log(err));
// });

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
	try {
		// console.log(name);
		// console.log(thunkAPI.getState());
		// thunkAPI.dispatch(openModal());

		const res = await axios.get(url);
		return res.data;
	} catch (error) {
		return thunkAPI.rejectWithValue('something went wrong');
	}
});

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart(state) {
			state.cartItems = [];
		},
		removeItem(state, action) {
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter(item => item.id !== itemId);
		},
		toggle(state, { payload }) {
			const { id: itemId, action } = payload;
			const cartItem = state.cartItems.find(item => item.id === itemId);

			if (action === 'inc') {
				cartItem.amount++;
			} else {
				if (cartItem.amount > 0) cartItem.amount--;
			}
		},
		calcTotal(state) {
			let total = 0;
			let amount = 0;

			state.cartItems.forEach(item => {
				total += item.amount * item.price;
				amount += item.amount;
			});

			state.total = total.toFixed(2);
			state.amount = amount;
		},
	},
	extraReducers: {
		[getCartItems.pending]: state => {
			state.isLoading = true;
		},
		[getCartItems.fulfilled]: (state, action) => {
			console.log(action);
			state.isLoading = false;
			state.cartItems = action.payload;
		},
		[getCartItems.rejected]: (state, action) => {
			console.log(action);
			state.isLoading = false;
		},
	},
});

export const { clearCart, removeItem, toggle, calcTotal } = cartSlice.actions;

export default cartSlice.reducer;
