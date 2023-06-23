const addZero = (n) => n < 10 ? `0${n}` : n;

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
    const forecast = data.list.filter((item) => {
        const daytimeHours = [12, 13, 14];
        const currentDate = new Date();
        const dateUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);

        return daytimeHours.includes(new Date(item.dt * 1000).getHours()) &&
            new Date(item.dt_txt).getDate() > dateUTC.getDate();
    });

    const forecastData = forecast.map((item) => {
        const date = new Date(item.dt_txt);
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
        const weatherIcon = item.weather[0].icon;
        const itemAlt = item.weather[0].description;

        let minTemp = Infinity;
        let maxTemp = -Infinity;

        for (let i = 0; i < data.list.length; i += 1) {
            const min = data.list[i].main.temp_min;
            const max = data.list[i].main.temp_max;
            const tempDate = new Date(data.list[i].dt_txt);

            if (tempDate.getDate() === date.getDate()) {
                if (min < minTemp) {
                    minTemp = min;
                }
                if (max > maxTemp) {
                    maxTemp = max;
                }
            };
        };

        return {
            dayOfWeek,
            weatherIcon,
            minTemp,
            maxTemp,
            itemAlt,
        };
    });

    return forecastData;
};