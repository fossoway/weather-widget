import { startCityWidget } from './modules/utils.js';
import { startWidget } from './modules/widgetService.js';


const initWidget = async (app) => {

    const coord = await startCityWidget();
    const widget = await startWidget(coord);
    app.append(widget);

    return {coord, widget};
};

const app = document.querySelector('#app');
const {coord, widget} = await initWidget(app);

ymaps.ready(init);
function init() {

    const myMap = new ymaps.Map('map', {
        zoom: 12,
        center: [coord.lat, coord.lon],
        controls: []
    });

    var searchControl = new ymaps.control.SearchControl({
        options: {
            provider: 'yandex#map'
        }
    });

    myMap.controls.add(searchControl);
    
    searchControl.events.add('resultselect', async function (e) {
        console.log('search!');
        var index = e.get('index');
        var results = searchControl.getResultsArray();
        const coordList = results[0].geometry.getCoordinates();
        const coord = {
            lat: coordList[0],
            lon: coordList[1],
        };

        await startWidget(coord, widget);
    })

    myMap.balloon.destroy();
};