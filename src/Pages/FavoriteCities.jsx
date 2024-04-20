import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdFavorite } from "react-icons/md";
import { removeFavorites } from '../Services/FavoritesService/FavoritesSlice'
import { decideImages, date } from '../Services/Functions'
import DayDetails from '../Components/DayDetails'
import WeekTemps from '../Components/WeekTemps'
function FavoriteCities() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.FavoritesSlice.favorites)
    const bgImages = useSelector((state) => state.ImagesSlice.backgrounds)
    const iconImages = useSelector((state) => state.ImagesSlice.icons)
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    if (Array.from(favorites).length <= 0) {
        navigate("/")
    }
    const handleClick = (city) => {
        dispatch(removeFavorites(city));
        setCurrentCityIndex(prev => prev - 1)
    }
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='h-[calc(830px)] w-[calc(375px)] flex flex-col gap-y-2 pt-2 pe-2 pb-5 pl-2 bg-gray-900'>
                <ul>
                    {
                        Array.from(favorites).length > 0 &&
                        favorites.map((favorite, index) => (
                            <li key={index} style={{ display: index === currentCityIndex ? 'block' : 'none' }}>
                                <div className='h-[calc(328px)] w-full rounded-xl p-3 bg-gray-800'>
                                    <div className='relative'>
                                        <div className='absolute top-5 end-5 z-20'>
                                            <button type='button' onClick={() => handleClick(favorite[8])}>
                                                <MdFavorite className='text-3xl text-red-600' />
                                            </button>
                                        </div>
                                        <img src={Array.from(decideImages(favorite, bgImages, iconImages)).length !== 0 ? decideImages(favorite, bgImages, iconImages)[0][0] : undefined} alt='' className='rounded-xl w-full h-[calc(304px)]' loading='lazy' />
                                        <div className='absolute top-5 left-5'>
                                            <p className='font-bold text-base text-gray-100'>{favorite[8] && String(favorite[8]).toUpperCase()}</p>
                                            <p className='font-normal text-sm text-gray-100'>{date()}</p>
                                        </div>
                                        <div className='absolute bottom-0 right-0 w-40 h-40'>
                                            <img src={Array.from(decideImages(favorite, bgImages, iconImages)).length !== 0 ? decideImages(favorite, bgImages, iconImages)[0][1] : undefined} alt='' loading='lazy' />
                                        </div>
                                        <div className='absolute top-[calc(172px)] left-4 flex flex-col gap-y-2 p-1'>
                                            <p className='text-white font-extrabold text-5xl'>{`${favorite[2]}`}</p>
                                            <div>
                                                <p className='text-white font-bold text-base'>
                                                    {`${favorite[1]}`} / {`${favorite[0]}`}
                                                </p>
                                                <p className='text-white font-normal text-sm'>{favorite[7]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-[calc(292px)] w-full rounded-xl pt-1 px-4 bg-gray-800 relative'>
                                    <DayDetails todayWheater={favorite} />
                                </div>
                                <div className='h-[calc(176px)] w-full rounded-xl pt-1 px-4 bg-gray-800'>
                                    <WeekTemps wheaters={favorite[9]} />
                                </div>
                            </li>
                        ))
                    }
                    <ul className='flex justify-center gap-x-2  w-full'>
                        {
                            favorites.map((favorite, index) => (
                                <li key={index}>
                                    <button type='button' onClick={() => setCurrentCityIndex(index)}>
                                        {
                                            index === currentCityIndex === true
                                                ? <div className="bg-product rounded-full h-3 w-3" ></div>
                                                : <div className="bg-white rounded-full h-3 w-3" ></div>

                                        }
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default FavoriteCities;