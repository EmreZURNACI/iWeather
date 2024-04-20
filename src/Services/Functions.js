import { notifyErr, notifyWarn, notifyInfo } from './Notifications'
import { setFilteredCities } from '../Services/CityService/CitySlice';
import { setCity } from '../Services/LocationsService/LocationSlice';
import { addFavorites, removeFavorites } from '../Services/FavoritesService/FavoritesSlice'
//main
export const TrToEn = (text) => {
    return text
        .replaceAll('Ğ', 'g')
        .replaceAll('Ü', 'u')
        .replaceAll('Ş', 's')
        .replaceAll('I', 'i')
        .replaceAll('İ', 'i')
        .replaceAll('Ö', 'o')
        .replaceAll('Ç', 'c')
        .replaceAll('ğ', 'g')
        .replaceAll('ü', 'u')
        .replaceAll('ş', 's')
        .replaceAll('ı', 'i')
        .replaceAll('ö', 'o')
        .replaceAll('ç', 'c');
};
export const formatCityNames = (city) => {
    return String(TrToEn(String(city))).substring(0, 1).toUpperCase() + String(TrToEn(String(city))).substring(1, String(TrToEn(String(city))).length).toLowerCase()
}
export const dates = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let nextDays = [];
    if (new Date().getDay() + 6 <= days.length) {
        nextDays = days.slice(new Date().getDay(), new Date().getDay() + 6);
    } else {
        nextDays = days.slice(new Date().getDay());
        const remainDays = 6 - nextDays.length;
        nextDays = nextDays.concat(days.slice(0, remainDays));
    }
    return nextDays;
}
//details
export const date = () => {
    var bugun = new Date();
    var gunler = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var aylar = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var gun = gunler[bugun.getDay()];
    var ay = aylar[bugun.getMonth()];
    var gunSayisi = bugun.getDate();
    var yil = bugun.getFullYear();
    return gun + ', ' + ay + ' ' + gunSayisi + ', ' + yil;
}
export const decideImages = (todayWheater, bgImages, iconImages) => {
    let images = [];
    const hour = new Date().getHours();
    switch (String(todayWheater[7].toLowerCase())) {
        case "clear sky":
            (hour > 7 && hour < 19) ? images.push([bgImages[0], iconImages[0]]) : images.push([bgImages[1], iconImages[1]]); break;
        case "few clouds":
        case "broken clouds":
        case "scattered clouds":
            (hour > 7 && hour < 19) ? images.push([bgImages[2], iconImages[2]]) : images.push([bgImages[3], iconImages[3]]); break;
        case "overcast clouds":
            (hour > 7 && hour < 19) ? images.push([bgImages[4], iconImages[4]]) : images.push([bgImages[5], iconImages[5]]); break;
        case "light rain":
        case "moderate rain":
        case "heavy rain":
            (hour > 7 && hour < 19) ? images.push([bgImages[6], iconImages[6]]) : images.push([bgImages[7], iconImages[7]]); break;
        case "thunderstorm":
            (hour > 7 && hour < 19) ? images.push([bgImages[8], iconImages[8]]) : images.push([bgImages[9], iconImages[9]]); break;
        default: break;
    }
    return images;
}
//day
export const decideImage = (weather_status, iconImages) => {
    let images = [];
    const hour = new Date().getHours();
    weather_status &&
        Array.from(weather_status).forEach(element => {
            switch (element) {
                case "clear sky":
                    (hour > 7 && hour < 19) ? images.push(iconImages[0]) : images.push(iconImages[1]); break;
                case "few clouds":
                case "broken clouds":
                case "scattered clouds":
                    (hour > 7 && hour < 19) ? images.push(iconImages[2]) : images.push(iconImages[3]); break;
                case "overcast clouds":
                    (hour > 7 && hour < 19) ? images.push(iconImages[4]) : images.push(iconImages[5]); break;
                case "light rain":
                case "moderate rain":
                case "heavy rain":
                    (hour > 7 && hour < 19) ? images.push(iconImages[6]) : images.push(iconImages[7]); break;
                case "thunderstorm":
                    (hour > 7 && hour < 19) ? images.push(iconImages[8]) : images.push(iconImages[9]); break;
                default: break;
            }
        });
    return images
}
//wheater slice
export const WheaterStatu = (dizi) => {
    let status = {
        "clear sky": 0,
        "few clouds": 0,
        "overcast clouds": 0,
        "light rain": 0,
        "thunderstorm": 0
    };
    Array.from(dizi).forEach((element) => {
        switch (String(element.weather[0].description)) {
            case "clear sky":
                status['clear sky']++; break;
            case "few clouds":
            case "broken clouds":
            case "scattered clouds":
                status['few clouds']++; break;
            case "overcast clouds":
                status['overcast clouds']++; break;
            case "light rain":
            case "moderate rain":
            case "heavy rain":
                status['light rain']++; break;
            case "thunderstorm":
                status.thunderstorm++; break;
            default: break;
        }
    })
    let maxStatus =
        Object.keys(status).reduce((a, b) => status[a] > status[b] ? a : b);
    return String(maxStatus);

}
export const handleChange = (e, dispatch, cityData) => {
    dispatch(setCity(formatCityNames(e.target.value)));
    try {
        const inputText = formatCityNames(e.target.value);
        if (inputText.length >= 3) {
            const filteredCities = cityData.filter(city =>
                city[0].startsWith(inputText)
            );
            dispatch(setFilteredCities(filteredCities));
        } else {
            dispatch(setFilteredCities([]));
        }
    } catch (error) {
        notifyErr('Error fetching cities:', error);
    }
};
export const handleClick = (favorites, navigate) => {
    if (Array.from(favorites).length > 0) {
        navigate("favorites");
    }
    else {
        notifyWarn("Favori şehir listeniz boş")
    }
}
export const handleAddClick = (dispatch, favorites, todayWheater, city, wheaters) => {
    if (Array.from(favorites).length < 6) {
        notifyInfo("Favorilerinize eklendi.")
        dispatch(addFavorites([...todayWheater, city, wheaters]))
    }
    else {
        notifyErr("Maksimum 5 adet favoriniz olabilir.")
    }
}
export const handleRemoveClick = (dispatch, city) => {
    notifyInfo("Favorilerinizden silindi.")
    dispatch(removeFavorites(city))
}
export const IsFavorite = (favorites, city) => {
    if (Array.from(favorites).length === 0) {
        return false;
    }
    else {
        const isfavorite = Array.from(favorites).filter((favorite) => {
            return favorite[8] === city;
        }).length > 0;
        return isfavorite;
    }
}