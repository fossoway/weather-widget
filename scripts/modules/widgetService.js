import { fetchWeather } from './APIservice.js';
import { renderWidgetForecast, renderWidgetToday, renderWidgetOther } from './render.js';


const startWidget = async () => {
    const widget = document.createElement('div');
    widget.classList.add('widget');

    const dataWeather = await fetchWeather('Омск');
    console.log(dataWeather.data);
    if (dataWeather.success) {
        renderWidgetToday(widget, dataWeather.data);
        renderWidgetOther(widget, dataWeather.data);
    } else {
        showError();
    };

    renderWidgetForecast(widget);

    return widget;
};


export { startWidget };