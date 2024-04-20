import React from 'react'
import { useSelector } from 'react-redux'
import { dates, decideImage } from '../Services/Functions'
function Day({wheaters}) {
    const iconImages = useSelector((state) => state.ImagesSlice.icons)
    return (
        <ul className='flex px-3 pt-3'>
            {
                Array.from(wheaters).length !== 0 &&
                Array.from(wheaters[0]).map((day, index) => (
                    <li className='w-[calc(67px)] h-[calc(152px)] flex flex-col gap-y-1 relative' key={index}>
                        <div>
                            <p className='text-gray-200 font-bold text-base text-center'>{dates()[index]}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <img src={Array.from(decideImage(wheaters[1], iconImages)).length !== 0 ? decideImage(wheaters[1], iconImages)[index] : undefined} alt="" className='w-14 h-14' loading='lazy' />
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='font-bold text-base text-gray-100'>{day[0]}</p>
                            <p className='font-bold text-base text-gray-400'>{day[1]}</p>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default Day