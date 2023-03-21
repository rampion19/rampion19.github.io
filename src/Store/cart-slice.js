import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },

    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existiningItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existiningItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            } else {
                existiningItem.quantity++
                existiningItem.totalPrice = existiningItem.totalPrice + newItem.price
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existiningItem = state.items.find(item => item.id === id);

            state.totalQuantity--;
            if (existiningItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);

            } else {
                existiningItem.quantity--;
                existiningItem.totalPrice = existiningItem.totalPrice - existiningItem.price
            }
        }
    }
})

export default cartSlice;
export const cartActions = cartSlice.actions;