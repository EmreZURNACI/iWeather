import { createSlice } from "@reduxjs/toolkit";
import BgClearDay from './Images/iWeatherBg/Weather=Clear,Moment=Day.png'
import BgClearNight from './Images/iWeatherBg/Weather=Clear,Moment=Night.png'
import BgCloudyDay from './Images/iWeatherBg/Weather=Cloudy,Moment=Day.png'
import BgCloudyNight from './Images/iWeatherBg/Weather=Cloudy,Moment=Night.png'
import BgFewCloudsDay from './Images/iWeatherBg/Weather=FewClouds,Moment=Day.png'
import BgFewCloudsNight from './Images/iWeatherBg/Weather=FewClouds,Moment=Night.png'
import BgRainDay from './Images/iWeatherBg/Weather=Rain,Moment=Day.png'
import BgRainNight from './Images/iWeatherBg/Weather=Rain,Moment=Night.png'
import BgStormDay from './Images/iWeatherBg/Weather=Storm,Moment=Day.png'
import BgStormNight from './Images/iWeatherBg/Weather=Storm,Moment=Night.png'

import IconClearDay from './Images/iWeather/Weather=Clear,Moment=Day.png'
import IconClearNight from './Images/iWeather/Weather=Clear,Moment=Night.png'
import IconCloudyDay from './Images/iWeather/Weather=Cloudy,Moment=Day.png'
import IconCloudyNight from './Images/iWeather/Weather=Cloudy,Moment=Night.png'
import IconFewCloudsDay from './Images/iWeather/Weather=FewClouds,Moment=Day.png'
import IconFewCloudsNight from './Images/iWeather/Weather=FewClouds,Moment=Night.png'
import IconRainDay from './Images/iWeather/Weather=Rain,Moment=Day.png'
import IconRainNight from './Images/iWeather/Weather=Rain,Moment=Night.png'
import IconStormDay from './Images/iWeather/Weather=Storm,Moment=Day.png'
import IconStormNight from './Images/iWeather/Weather=Storm,Moment=Night.png'
export const initialState = {
    icons: [IconClearDay, IconClearNight, IconCloudyDay, IconCloudyNight, IconFewCloudsDay, IconFewCloudsNight, IconRainDay, IconRainNight, IconStormDay, IconStormNight],
    backgrounds: [BgClearDay, BgClearNight, BgCloudyDay, BgCloudyNight, BgFewCloudsDay, BgFewCloudsNight, BgRainDay, BgRainNight, BgStormDay, BgStormNight]
}
export const ImagesSlice = createSlice({
    name: "ImagesSlice",
    initialState,
    reducers: {
    }
})
export default ImagesSlice.reducer