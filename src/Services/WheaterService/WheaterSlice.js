import { createSlice } from "@reduxjs/toolkit";
import { WheaterStatu } from "../Functions";
export const initialState = {
    wheater: [],
    todayWheater: [],
    temps: []
}
export const WheaterSlice = createSlice({
    name: "WheaterSlice",
    initialState,
    reducers: {
        setWheater: (state, actions) => {
            if (state.todayWheater.length !== 0) {
                state.todayWheater.length = 0;
            }
            var gunlukVeriler = [];
            let maxTemp = Number(-Number.MAX_VALUE);
            let minTemp = Number(Number.MAX_VALUE);
            let sumofFeelsLike = 0;
            let sumofHumidity = 0;
            let sumofPop = 0;
            let sumofWind = 0;
            const date = new Date();
            const day = String(date.getDate()).length === 1 ? `${"0" + date.getDate()}` : date.getDate()
            const month = String(date.getMonth()).length === 1 ? `${"0" + (date.getMonth() + 1)}` : (date.getMonth() + 1)
            Array.from(actions.payload).forEach((item) => {
                if (`${date.getFullYear()}-${month}-${day}` === String(item.dt_txt).split(" ")[0]) {
                    gunlukVeriler = [...gunlukVeriler, item];
                }
            })
            Array.from(gunlukVeriler).forEach((item) => {
                if (item.main.temp_max > maxTemp) {
                    maxTemp = item.main.temp_max
                }
                if (item.main.temp_min < minTemp) {
                    minTemp = item.main.temp_min
                }
                sumofFeelsLike += item.main.feels_like;
                sumofHumidity += item.main.humidity;
                sumofPop += item.pop;
                sumofWind += item.wind.speed
            })
            state.todayWheater = [...state.todayWheater, `${Number(Number(maxTemp - 272.15).toFixed(1))}°C`]
            state.todayWheater = [...state.todayWheater, `${Number(Number(minTemp - 272.15).toFixed(1))}°C`]
            state.todayWheater = [...state.todayWheater, `${Number(Number((sumofFeelsLike / Array.from(gunlukVeriler).length) - 272.15).toFixed(1))}°C`]
            state.todayWheater = [...state.todayWheater, `${Math.round((sumofPop / Array.from(gunlukVeriler).length) * 100)}%`]
            state.todayWheater = [...state.todayWheater, `${Math.round(sumofWind / Array.from(gunlukVeriler).length)}km/h`]
            state.todayWheater = [...state.todayWheater, `${Math.round(sumofHumidity / Array.from(gunlukVeriler).length)}%`]
            state.todayWheater = [...state.todayWheater, Number(parseInt(Math.random() * 10))]
            state.todayWheater = [...state.todayWheater,
            String(actions.payload[0].weather[0].description).substring(0, 1).toUpperCase().concat(String(actions.payload[0].weather[0].description).substring(1, String(actions.payload[0].weather[0].description).length).toLowerCase())]
            /**
             *? 1.Veri ==> Max Sıcaklık
             *? 2.Veri ==> Min Sıcaklık
             *? 3.Veri ==> Hissedilen Ortalama Sıcaklık
             *? 4.Veri ==> Yagış Olasılıgı
             *? 5.Veri ==> speed
             *? 6.Veri ==> Nem
             *? 7.Veri ==> random atanmış uv 
             *? 8.Veri ==> hava durumu descr
             */
        },
        setMaxMinOfDays: (state, actions) => {
            if (state.wheater.length !== 0 || state.temps.length !== 0) {
                state.wheater.length = 0;
                state.temps.length = 0;
            }
            var gruplanmis_veriler = [];
            var max_min_temps = [];
            var weather_descs = [];
            var count = 0;
            Array.from(actions.payload).forEach((veri) => {
                var tarih_str = veri.dt_txt.split(' ')[0];
                var index = gruplanmis_veriler.findIndex(item => item && item.tarih === tarih_str);
                if (index === -1) {
                    gruplanmis_veriler.push({ tarih: tarih_str, veriler: [veri] });
                } else {
                    gruplanmis_veriler[index].veriler.push(veri);
                }
            });
            Array.from(gruplanmis_veriler).forEach((arr) => {
                let maxTemp = Number(-Number.MAX_VALUE);
                let minTemp = Number(Number.MAX_VALUE);
                Array.from(arr.veriler).forEach((element) => {
                    if (element.main.temp_max > maxTemp) {
                        maxTemp = element.main.temp_max
                    }
                    if (element.main.temp_min < minTemp) {
                        minTemp = element.main.temp_min
                    }
                })
                max_min_temps.push(
                    [
                        `${Math.round(Number(maxTemp - 272.15))}°C`
                        ,
                        `${Math.round(Number(minTemp - 272.15))}°C`
                    ]
                )
            })
            Array.from(gruplanmis_veriler).forEach((arr) => {
                weather_descs.push(WheaterStatu(arr.veriler))
            })
            for (var i = 0; i < gruplanmis_veriler.length; i++) {
                var arr = gruplanmis_veriler[i];
                for (var j = 0; j < arr.veriler.length; j++) {
                    var elements = arr.veriler[j];
                    state.temps = [...state.temps, { date: elements.dt_txt, temp: (Number(elements.main.feels_like - 272.15).toFixed(1)) }]
                    count++;
                    if (count === 9) {
                        break;
                    }
                }
                if (count === 9) {
                    break;
                }
            }
            state.wheater = [...state.wheater, max_min_temps];
            state.wheater = [...state.wheater, weather_descs];
        }
    }
})
export const { setWheater, setMaxMinOfDays } = WheaterSlice.actions
export default WheaterSlice.reducer