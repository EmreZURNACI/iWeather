import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdFavorite } from "react-icons/md";
import { IsFavorite, handleAddClick, handleRemoveClick } from '../Services/Functions';
function AddFavorites() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.FavoritesSlice.favorites)
    const todayWheater = useSelector((state) => state.WheaterSlice.todayWheater)
    const city = useSelector((state) => state.LocationSlice.city)
    const wheaters = useSelector((state) => state.WheaterSlice.wheater);
    return (
        <div className='absolute top-5 end-5 z-20'>
            {
                IsFavorite(favorites, city) &&
                <button type='button' onClick={() => handleRemoveClick(dispatch, city)}>
                    <MdFavorite className='text-3xl text-red-600' />
                </button>
            }
            {
                !IsFavorite(favorites, city) &&
                <button type='button' onClick={() => handleAddClick(dispatch, favorites, todayWheater, city, wheaters)}>
                    <MdFavorite className='text-3xl text-white' />
                </button>
            }
        </div>
    )
}

export default AddFavorites