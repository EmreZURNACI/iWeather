import React from 'react'

function WelcomeMessage() {
    return (
        <div>
            <p className='text-center text-white font-bold text-lg'>Welcome to <span className='text-product'>TypeWeather</span></p>
            <p className='text-center text-gray-200 font-normal text-sm'>Choose a location to see the weather forecast</p>
        </div>
    )
}

export default WelcomeMessage