import { fetchForecast, fetchWeather } from './APIservice.js';
import { renderWidgetForecast, renderWidgetToday, renderWidgetOther, showError } from './render.js';


const startWidget = async (coord, widget) => {
    
    if (!widget) {
        widget = document.createElement('div');
        widget.classList.add('widget');
    };

    widget.innerText = '';
    const dataWeather = await fetchWeather(coord);

    if (dataWeather.success) {
        renderWidgetToday(widget, dataWeather.data);
        renderWidgetOther(widget, dataWeather.data);
    } else {
        showError(widget, dataWeather.error);
    };

    const dataForecast = await fetchForecast(coord);

    if (dataForecast.success) {
        renderWidgetForecast(widget, dataForecast.data);
    } else {
        showError(widget, dataForecast.error);
    }

    return widget;
};


export { startWidget };