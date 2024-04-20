import React from 'react'
import { useSelector } from 'react-redux';
import { Spinner, Crosshair } from "@phosphor-icons/react";
function Form({ getLocation, nowLocation, handleChange }) {
    const loading = useSelector((state) => state.AnimationSlice.loading)
    const city = useSelector((state) => state.LocationSlice.city)
    return (
        <div>
            <form onSubmit={(e) => getLocation(e)} autoComplete='off'>
                <div className='relative'>
                    <input
                        type="text"
                        className='outline-none caret-product rounded-lg  px-5 bg-input-bg font-normal text-base w-full h-14 text-white'
                        placeholder='Search location'
                        name='city'
                        onChange={(e) => handleChange(e)}
                        value={city} />
                    {
                        !loading &&
                        <button type='button' onClick={() => nowLocation()} className='absolute z-20 top-3 right-5' title='Get My Location'>
                            <Crosshair size={32} className={"text-product"} />
                        </button>
                    }
                    {
                        loading && <Spinner size={32} className={"text-product absolute top-3 right-5 animate-spin"} />
                    }
                </div>
                <button type="submit" className='disabled'></button>
            </form>
        </div>
    )
}

export default Form