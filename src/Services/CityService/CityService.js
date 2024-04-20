import axios from "axios";
import { TrToEn } from '../Functions'
import { notifyErr } from "../Notifications";
const CityService = async () => {
    try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries");

        return response.data;
    } catch (err) {
        notifyErr(err);
    }
};
export const Cities = async () => {
    const cityData = await CityService();
    const cityList = [];

    cityData.data.forEach(({ cities, iso2 }) => {
        cities.forEach((cityName) => {
            cityList.push(

                [
                    String(TrToEn(String(cityName))).substring(0, 1).toUpperCase()
                    +
                    String(TrToEn(String(cityName))).substring(1, String(TrToEn(String(cityName))).length).toLowerCase(),
                    iso2
                ]

            );
        });
    });
    return cityList;
};

export default CityService;