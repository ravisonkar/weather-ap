import axios from 'axios';

export const fetchWeatherDataRequest = (selectValue) => { 
    return axios.
    get(`http://api.openweathermap.org/data/2.5/weather?zip=${selectValue}&appid=32feb6bc3cb00957d53449796352cde7`)
      .then((value) => value.data);
};