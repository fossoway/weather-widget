const addZero = (n) => n < 10 ? `0${n}` : n;

export const getCurrentDateTime = () => {
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

    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dayOfWeek = weekdays[date.getDay()];

    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());

    return {dayOfMonth, month, year, dayOfWeek, hours, minutes};
};


export const getWeatherForecastData = (data) => {
    const forecast = data.list.filter((item) => {
        return new Date(item.dt_txt).getHours() === 12 &&
            new Date(item.dt_txt).getDate() > new Date().getDate();
    });

    if (forecast.length < 5) {
        forecast.push(data.list[39])
    };

    console.log(forecast);

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
        };
    });

    return forecastData;
};