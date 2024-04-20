import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MdHome, MdOutlineCollectionsBookmark } from 'react-icons/md';
import { setWheater, setMaxMinOfDays } from '../Services/WheaterService/WheaterSlice'
import { setCity } from '../Services/LocationsService/LocationSlice';
import { TrToEn, handleChange, handleClick } from '../Services/Functions';
import { notifyErr, notifySuccess } from '../Services/Notifications'
import { setCityData } from '../Services/CityService/CitySlice';
import { Cities } from '../Services/CityService/CityService'
import { setLoading } from '../Services/AnimationSlice'
import Background from '../Services/ImageService/Images/Background.png'
import FilteredCityList from '../Components/FilteredCityList'
import Form from '../Components/Form';
import Logo from '../Components/Logo';
import WelcomeMessage from '../Components/WelcomeMessage';
function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const city = useSelector((state) => state.LocationSlice.city)
    const cityData = useSelector((state) => state.FilteredCitiesSlice.cityData)
    const favorites = useSelector((state) => state.FavoritesSlice.favorites)
    const getLocation = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios({
                method: "GET",
                url: `https://api.api-ninjas.com/v1/city?name=${TrToEn(city)}`,
                headers: { 'X-Api-Key': `13ZIQibCTd8neMFahcdDby4F2lnhKI0308z4xkf9` },
            })
            getWheater(res.data[0].latitude, res.data[0].longitude)
        } catch (error) {
            notifyErr("Böyle bi konum bulunmamaktadır.")
            dispatch(setLoading(false))
        }
    }
    const getWheater = (lat, long) => {
        try {
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=77950835ec1fafe9375b85d500c4dd9d`)
                .then((res) => {
                    dispatch(setWheater(res.data.list))
                    dispatch(setMaxMinOfDays(res.data.list))
                })
            notifySuccess("Konum bulundu,getiriliyor.")
            setTimeout(() => {
                dispatch(setLoading(false));
                navigate("/details")
            }, 2000);

        } catch (error) {
            notifyErr("Bu konumun hava durumu bulunamadı")
            dispatch(setLoading(false))
        }
    }
    const nowLocation = () => {
        dispatch(setLoading(true));
        navigator.geolocation.getCurrentPosition(async (position) => {
            const res = await axios({
                method: "GET",
                url: 'https://api.api-ninjas.com/v1/reversegeocoding?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude,
                headers: { 'X-Api-Key': `13ZIQibCTd8neMFahcdDby4F2lnhKI0308z4xkf9` },
            })
            dispatch(setCity(res.data[0].name))
            getWheater(position.coords.latitude, position.coords.longitude)
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await Cities();
            dispatch(setCityData(data));
        };
        fetchData();
    }, [dispatch]);
    return (
        <div className='h-screen flex items-center justify-center'>
            <ToastContainer />
            <div className='relative'>
                <img src={Background} alt="Background" />
                <div className='absolute top-8 left-24 opacity-80 '>
                    <Logo />
                    <div className='mt-2 flex items-center justify-center gap-x-2'>
                        <button onClick={() => navigate("/")}><MdHome className='text-3xl text-product' /></button>
                        <button onClick={() => handleClick(favorites, navigate)}><MdOutlineCollectionsBookmark className='text-3xl text-product' /></button>
                    </div>
                </div>
                <div className='absolute top-[calc(272px)] left-8 flex flex-col gap-y-8 w-[calc(311px)]'>
                    <WelcomeMessage />
                    <Form getLocation={getLocation} nowLocation={nowLocation} handleChange={(e) => handleChange(e, dispatch, cityData)} />
                    <FilteredCityList getLocation={getLocation} />
                </div>
            </div>
        </div>
    )
}

export default Main