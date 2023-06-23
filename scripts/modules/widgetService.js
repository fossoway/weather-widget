import { fetchForecast, fetchWeather, getCity } from './APIservice.js';
import { renderWidgetForecast, renderWidgetToday, renderWidgetOther, showError } from './render.js';


const startWidget = async (city, widget) => {

    if (!city) {
        const dataCity = await getCity();
        if (dataCity.success) {
            city = dataCity.city;
        } else {
            showError(widget, dataCity.error);
        }
    };

    if (!widget) {
        widget = document.createElement('div');
        widget.classList.add('widget');
    };

    const dataWeather = await fetchWeather(city);

    if (dataWeather.success) {
        renderWidgetToday(widget, dataWeather.data);
        renderWidgetOther(widget, dataWeather.data);
    } else {
        showError(widget, dataWeather.error);
    };

    const dataForecast = await fetchForecast(city);
    //console.log(dataForecast)
    //console.log(new Date(dataForecast.data.list[0].dt * 1000).toTimeString("ru-RU"));
    //console.log(new Date(dataForecast.data.list[1].dt * 1000).toTimeString("ru-RU"));
    //console.log(new Date(dataForecast.data.list[2].dt * 1000).toTimeString("ru-RU"));

    if (dataForecast.success) {
        renderWidgetForecast(widget, dataForecast.data);
    } else {
        showError(widget, dataForecast.error);
    }

    return widget;
};


export { startWidget };