import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../models/ICard";
import { fetchCards } from "./ActionCreators";


interface CardStore {
    cards: ICard[],
    isLoading: boolean,
    error: string | undefined,
    totalPrice: number,
}

const initialState: CardStore = {
    cards: [],
    isLoading: true,
    error: '',
    totalPrice: 0,
}

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        deleteItemCart(state, action: PayloadAction<number>) {
            const index = state.cards.findIndex(
                (item) => item.id === action.payload
            )

            if (index !== -1) {
                const card = state.cards[index];
                state.totalPrice -= card.price * card.totalItemsToBuy;
                state.cards.splice(index, 1);
            }
        },

        updateTotalPrice(state, action: PayloadAction<number>) {
            state.totalPrice += action.payload;
        },

        updateTotelItem(state, action: PayloadAction<{id: number, totalItemsToBuy: number}>) {
            const card = state.cards.find(
                (item) => item.id === action.payload.id
            );
            if (card) {
                state.totalPrice += (action.payload.totalItemsToBuy - card.totalItemsToBuy) * card.price;
                card.totalItemsToBuy = action.payload.totalItemsToBuy;
            }
        }
    },
    extraReducers: (bilder) => {
        bilder.addCase(fetchCards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.cards = action.payload;
            state.cards.map((card) => {
                card.totalItemsToBuy = 1;
                card.price = Math.round(card.price);
            })
            state.totalPrice = state.cards.reduce((res, i) => {return res + i.price}, 0)
        });
        bilder.addCase(fetchCards.pending, (state) => {
            state.isLoading = true;
        });
        bilder.addCase(fetchCards.rejected, (state, action) => {
            state.isLoading = false;
            if (typeof action.payload == 'string') {
                state.error = action.payload;
            } else {
                state.error = action.error.message;
            }
        });
    }
})

export default cardSlice.reducer
