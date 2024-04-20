import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    city: ""
}
export const LocationSlice = createSlice({
    name: "LocationSlice",
    initialState,
    reducers: {
        setCity: (state, actions) => {
            state.city = actions.payload
        }
    }
})
export const { setCity } = LocationSlice.actions
export default LocationSlice.reducer