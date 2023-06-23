import { getCity } from "./APIservice.js";

const addZero = (n) => n < 10 ? `0${n}` : n;

export const startCityWidget = async () => {

    const cityCoord = await getCity('latitude');

    if (cityCoord.success) {
        const coord = {
            lat: cityCoord.coord.latitude,
            lon: cityCoord.coord.longitude,
        }
        return coord;
    } else {
        showError(widget, cityCoord.error);
    }
};

export const getCurrentDateTime = (data) => {
    const months = [
        'янв',
        'фев',
        'мар',
        'апр',
        'май',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
    ];

    const weekdays = [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота',
    ];

    const date = new Date();

    const cityTime = new Date(Date.now() + date.getTimezoneOffset() * 60000 + data.timezone * 1000);

    const dayOfMonth = cityTime.getDate();
    const month = months[cityTime.getMonth()];
    const year = cityTime.getFullYear();
    const dayOfWeek = weekdays[cityTime.getDay()];

    const hours = addZero(cityTime.getHours());
    const minutes = addZero(cityTime.getMinutes());

    return {dayOfMonth, month, year, dayOfWeek, hours, minutes};
};


export const getWeatherForecastData = (data) => {
    const date = new Date();
    const cityTime = new Date(Date.now() + date.getTimezoneOffset() * 60000 + data.city.timezone * 1000);
    const year = cityTime.getFullYear();
    const month = cityTime.getMonth();
    const day = cityTime.getDate();
    let hours = cityTime.getHours();

    const forecastData = data.list.map((item) => {
        hours += 3;
        const date = new Date(year, month, day, hours);
        const weekdaysShort = [
            'вс',
            'пн',
            'вт',
            'ср',
            'чт',
            'пт',
            'сб',
        ];

        const dayOfWeek = weekdaysShort[date.getDay()];
        const hoursOfDay = addZero(date.getHours());
        const minutesOfDay = addZero(date.getMinutes());
        const weatherIcon = item.weather[0].icon;
        const itemAlt = item.weather[0].description;

        const temp = item.main.temp;

        return {
            dayOfWeek,
            hoursOfDay,
            minutesOfDay,
            weatherIcon,
            temp,
            itemAlt,
        };
    });

    return forecastData;
};