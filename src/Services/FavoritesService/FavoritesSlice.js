import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    favorites: []
}
export const FavoritesSlice = createSlice({
    name: "FavoritesSlice",
    initialState,
    reducers: {
        addFavorites: (state, actions) => {
            state.favorites = [...state.favorites, actions.payload]
        },
        removeFavorites: (state, actions) => {
            let temp = [];
            temp = Array.from(state.favorites).filter((favorite) => {
                return favorite[8] !== actions.payload
            })
            state.favorites = temp;
        }
    }
})
export const { addFavorites, removeFavorites } = FavoritesSlice.actions;
export default FavoritesSlice.reducer;