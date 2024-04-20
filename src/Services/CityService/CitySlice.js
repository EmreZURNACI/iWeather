import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    filteredCities: null,
    cityData: null
}
export const FilteredCitiesSlice = createSlice({
    name: "FilteredCities",
    initialState,
    reducers: {
        setFilteredCities: (state, actions) => {
            state.filteredCities = actions.payload
        },
        setCityData: (state, actions) => {
            state.cityData = actions.payload
        }
    }
})
export const { setFilteredCities, setCityData } = FilteredCitiesSlice.actions;
export default FilteredCitiesSlice.reducer