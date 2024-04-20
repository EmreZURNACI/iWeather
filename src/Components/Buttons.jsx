import React from 'react'
import { SkipBack, SkipForward } from "@phosphor-icons/react";
function Buttons({ setGrafik, grafik }) {
    return (
        <div className='absolute z-20 w-full top-[calc(46.5%)] left-0'>
            {
                grafik &&
                <div className='flex justify-start items-center '>
                    <SkipBack size={28} className='text-gray-400 cursor-pointer' onClick={() => setGrafik(false)} />
                </div>
            }
            {
                !grafik &&
                <div className='flex justify-end items-center'>
                    <SkipForward size={28} className='text-gray-400 cursor-pointer' onClick={() => setGrafik(true)} />
                </div>
            }
        </div>
    )
}

export default Buttons