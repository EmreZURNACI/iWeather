import React from 'react'
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
function Grafik() {
    const temps = useSelector((state) => state.WheaterSlice.temps)
    return (
        <>
            <p className='text-gray-200 font-bold capitalize text-center'>Üçer saatlik dilimlerle 1 günlük hissedilen sıcaklıklar </p>
            <LineChart width={320} height={250} data={temps} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" tick={null} />
                <YAxis domain={[0, 40]} tickCount={10} />
                <Tooltip />
            </LineChart>
        </>
    )
}

export default Grafik