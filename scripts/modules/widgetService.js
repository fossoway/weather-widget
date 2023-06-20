import { renderWidgetForecast, renderWidgetToday, renderWidgetOther } from './render.js';


const startWidget = () => {
    const widget = document.createElement('div');
    widget.classList.add('widget');

    renderWidgetToday(widget);
    renderWidgetOther(widget);
    renderWidgetForecast(widget);


    return widget;
};


export { startWidget };