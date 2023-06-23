import { getCurrentDateTime, getWeatherForecastData } from "./utils.js";


const renderWidgetToday = (widget, data) => {
    const {dayOfMonth, month, year, dayOfWeek, hours, minutes} = getCurrentDateTime(data);

    widget.insertAdjacentHTML(
        'beforeend',
        `
        <div class="widget__today">
            <div class="widget__date-block">
                <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
                <p class="widget__time">${hours}:${minutes}</p>
                <p class="widget__day">${dayOfWeek}</p>
        </div>
        <div class="widget__icon">
            <img class="widget__img" 
                src="./icon/${data.weather[0].icon}.svg" 
                alt="Погода">
        </div>
        <div class="widget__wheather">
            <div class="widget__city">
                <p>${data.name}</p>
                
            </div>
            <p class="widget__temp-big">${(data.main.temp - 273.15).toFixed(1)}°C</p>
            <p class="widget__felt">ощущается</p>
            <p class="widget__temp-small">${(data.main.feels_like - 273.15).toFixed(1)}°C</p>
        </div>
        `
    )
};

const renderWidgetOther = (widget, data) => {
const dewPoint = (data.main.temp - 273.15) - (1 - data.main.humidity / 100) / 0.05;

    widget.insertAdjacentHTML(
        'beforeend',
        `
        <div class="widget__other">
            <div class="widget__wind">
                <p class="widget__wind-title">Ветер</p>
                <p class="widget__wind-speed">${data.wind.speed} м/с</p>
                <p class="widget__wind-text" 
                    style="transform: rotate(${data.wind.deg}deg)">&#129123;</p>

            </div>
            <div class="widget__humidity">
                <p class="widget__humidity-title">Влажность</p>
                <p class="widget__humidity-value">${data.main.humidity}%</p>
                <p class="widget__humidity-text">Т.Р: ${dewPoint.toFixed(2)} °C</p>
            </div>
            <div class="widget__pressure">
                <p class="widget__pressure-title">Давление</p>
                <p class="widget__pressure-value">${(data.main.pressure * 0.750063755419211).toFixed(2)}</p>
                <p class="widget__pressure-text">мм рт.ст.</p>
            </div>
        </div>
        `
    )
};

const renderWidgetForecast = (widget, data) => {
    const widgetForecast = document.createElement('ul');
    widgetForecast.className = 'widget__forecast';

    const forecastDataFiveHours = getWeatherForecastData(data);

    console.log(forecastDataFiveHours)

    const items = forecastDataFiveHours.map((item) => {
        const widgetDayItem = document.createElement('li');
        widgetDayItem.className = 'widget__day-item';
        widgetDayItem.insertAdjacentHTML('beforeend', `
                <p class="widget__day-text">${item.dayOfWeek}, ${item.hoursOfDay}:00</p>
                <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="${item.itemAlt}">
                <div class="widget__day-temp">${(item.temp - 273.15).toFixed(1)}° 
                    <p style="transform: rotate(${item.windDeg}deg); color: red">&#8659;</p> 
                    ${item.windSpeed}
                </div>
        `)
        return widgetDayItem;
    });

    widgetForecast.append(...items);
    widget.append(widgetForecast);
};


const showError = (widget, error) => {
    widget.textContent = error.toString();
    widget.classList.add('widget_error');
}


export { renderWidgetForecast, renderWidgetToday, renderWidgetOther, showError };