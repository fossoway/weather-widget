import { fetchForecast, fetchWeather } from './APIservice.js';
import { renderWidgetForecast, renderWidgetToday, renderWidgetOther, showError } from './render.js';


const startWidget = async () => {
    const city = 'Омск';
    const widget = document.createElement('div');
    widget.classList.add('widget');

    const dataWeather = await fetchWeather(city);

    if (dataWeather.success) {
        renderWidgetToday(widget, dataWeather.data);
        renderWidgetOther(widget, dataWeather.data);
    } else {
        showError(dataWeather.error);
    };

    const dataForecast = await fetchForecast(city);
    console.log(dataForecast)

    if (dataForecast.success) {
        renderWidgetForecast(widget, dataForecast.data);
    } else {
        showError(dataForecast.error);
    }

    return widget;
};


export { startWidget };