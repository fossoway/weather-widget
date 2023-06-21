const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '7e6221eb9cad806f36697fe399f4a667';

export const fetchWeather = async (city) => {
    try {
        const response = await fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}&lang=ru`);
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }
        const data = await response.json();
        return {success: true, data};
    } catch (err) {
        
        return {success: false, err};
    }
};