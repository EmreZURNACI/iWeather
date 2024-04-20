import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatCityNames } from '../Services/Functions';
import { setCity } from '../Services/LocationsService/LocationSlice';
function FilteredCityList({ getLocation }) {
    const dispatch = useDispatch();
    const filteredCities = useSelector((state) => state.FilteredCitiesSlice.filteredCities)
    return (
        <>
            {
                filteredCities !== null &&
                <ul className="popover flex flex-col gap-2 overflow-y-scroll h-72">
                    {
                        Array.from(filteredCities).map((city, index) => (
                            <li key={index} className='rounded-lg bg-gray-500 px-4 py-5 border border-solid border-input-bg'>
                                <p className='font-normal text-base text-start text-white cursor-pointer'
                                    onClick={(e) => {
                                        dispatch(setCity(formatCityNames(city[0])));
                                        getLocation(e)
                                    }}
                                >{formatCityNames(city[0])}  - {city[1]}</p>
                            </li>
                        ))
                    }
                </ul >
            }
        </>
    )
}

export default FilteredCityList