const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '7e6221eb9cad806f36697fe399f4a667';

export const fetchWeather = async (coord) => {
    try {
        const response = await fetch(`${API_URL}weather?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&lang=ru`);
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }
        const data = await response.json();
        return {success: true, data};
    } catch (error) {
        
        return {success: false, error};
    }
};


export const fetchForecast = async (coord) => {
    try {
        const response = await fetch(`${API_URL}forecast?lat=${coord.lat}&lon=${coord.lon}&cnt=5&appid=${API_KEY}&lang=ru`);
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }
        const data = await response.json();
        return {success: true, data};
    } catch (error) {
        
        return {success: false, error};
    };
};

export const getCity = async () => {
    const url = 'https://ipapi.co/';

    try {
        const response = await fetch(`${url}json`);

        if (!response.ok) {
            throw new Error('Ошибка получения города');
        };

        const coord = await response.json();
        return {success: true, coord};

    } catch (error) {
        console.error(error);
        return {success: false, error};
    };
};