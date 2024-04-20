import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    loading: false
}
export const AnimatonSlice = createSlice({
    name: "Animation",
    initialState,
    reducers: {
        setLoading: (state, actions) => {
            state.loading = actions.payload;
        }
    }
})
export const { setLoading } = AnimatonSlice.actions;
export default AnimatonSlice.reducer;