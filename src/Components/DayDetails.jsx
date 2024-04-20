import React from 'react'
import { Wind, CloudRain, Drop, ThermometerSimple, SunDim } from "@phosphor-icons/react";
function DayDetails({todayWheater}) {
    const icons = [<ThermometerSimple size={24} />, <CloudRain size={24} />, <Wind size={24} />, <Drop size={24} />, <SunDim size={24} />]
    const iconsDesc = ["Thermal sensation", "Probability of rain", "Wind speed", "Air humidity", "UV Index"]
    return (
        <ul className='w-full px-4 pt-1'>
            {
                Array.from(icons).map((item, index) => (
                    <li className={"py-4 px-0 flex items-center justify-between " + (index !== icons.length - 1 && "border-b border-gray-700")} key={index}>
                        <div className='flex gap-x-3'>
                            <div className='text-gray-500'>
                                {item}
                            </div>
                            <p className='font-bold text-sm text-gray-200'>
                                {iconsDesc[index]}
                            </p>
                        </div>
                        <div className='font-bold text-base text-gray-100'>
                            {todayWheater && todayWheater[index + 2]}
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default DayDetails