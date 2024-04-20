import { configureStore } from "@reduxjs/toolkit";
import LocationSlice from './LocationsService/LocationSlice'
import WheaterSlice from './WheaterService/WheaterSlice'
import ImagesSlice from './ImageService/ImagesSlice'
import FilteredCitiesSlice from './CityService/CitySlice'
import FavoritesSlice from './FavoritesService/FavoritesSlice'
import AnimationSlice from './AnimationSlice'
export const Store = configureStore({
    reducer: {
        LocationSlice: LocationSlice,
        WheaterSlice: WheaterSlice,
        ImagesSlice: ImagesSlice,
        AnimationSlice: AnimationSlice,
        FilteredCitiesSlice: FilteredCitiesSlice,
        FavoritesSlice: FavoritesSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    }
})