import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { date, decideImages } from '../Services/Functions'
import WeekTemps from '../Components/WeekTemps'
import DayDetails from '../Components/DayDetails'
import Grafik from '../Components/Grafik';
import Buttons from '../Components/Buttons'
import AddFavorites from '../Components/AddFavorites'
import { ToastContainer } from 'react-toastify'
function Details() {
  const [grafik, setGrafik] = useState(false);
  const city = useSelector((state) => state.LocationSlice.city)
  const todayWheater = useSelector((state) => state.WheaterSlice.todayWheater)
  const bgImages = useSelector((state) => state.ImagesSlice.backgrounds)
  const iconImages = useSelector((state) => state.ImagesSlice.icons)
  const wheaters = useSelector((state) => state.WheaterSlice.wheater);
  return (
    <div className='h-screen flex items-center justify-center'>
      <ToastContainer />
      <div className='h-[calc(820px)] w-[calc(375px)] flex flex-col gap-y-2 pt-2 pe-2 pb-5 pl-2 bg-gray-900'>
        <div className='h-[calc(328px)] w-full rounded-xl p-3 bg-gray-800'>
          <div className='relative'>
            <img src={Array.from(decideImages(todayWheater, bgImages, iconImages)).length !== 0 ? decideImages(todayWheater, bgImages, iconImages)[0][0] : undefined} alt='' className='rounded-xl w-full h-[calc(304px)]' loading='lazy' />
            <div className='absolute top-5 left-5'>
              <p className='font-bold text-base text-gray-100'>{city && String(city).toUpperCase()}</p>
              <p className='font-normal text-sm text-gray-100'>{date()}</p>
            </div>
            <AddFavorites />
            <div className='absolute bottom-0 right-0 w-40 h-40'>
              <img src={Array.from(decideImages(todayWheater, bgImages, iconImages)).length !== 0 ? decideImages(todayWheater, bgImages, iconImages)[0][1] : undefined} alt='' loading='lazy' />
            </div>
            <div className='absolute top-[calc(172px)] left-4 flex flex-col gap-y-2 p-1'>
              <p className='text-white font-extrabold text-5xl'>{`${todayWheater[2]}`}</p>
              <div>
                <p className='text-white font-bold text-base'>
                  {`${todayWheater[1]}`} / {`${todayWheater[0]}`}
                </p>
                <p className='text-white font-normal text-sm'>{todayWheater[7]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='h-[calc(292px)] w-full rounded-xl pt-1 px-4 bg-gray-800 relative'>
          {
            !grafik && <DayDetails todayWheater={todayWheater} />
          }
          {
            grafik && <Grafik />
          }
          <Buttons setGrafik={setGrafik} grafik={grafik} />
        </div>
        <div className='h-[calc(176px)] w-full rounded-xl pt-1 px-4 bg-gray-800'>
          <WeekTemps wheaters={wheaters} />
        </div>
      </div>
    </div>
  )
}

export default Details