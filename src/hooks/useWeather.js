import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const config = {
	params: {
		appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
		units: 'metric',
		lang: 'es',
	},
};

export function useWeather() {
	const [cityName, setCityName] = useState('');
	const [coords, setCoords] = useState(null);
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);

	const params = new URLSearchParams(config.params).toString();

	// Detectar ciudad por IP
	useEffect(() => {
		axios
			.get('https://ipinfo.io/json')
			.then((res) => setCityName(res.data.city));
	}, []);

	// Por nombre de ciudad
	useEffect(() => {
		if (!cityName) return;
		setLoading(true);
		axios
			.get(BASE_URL + `?q=${cityName}&` + params)
			.then((res) => {
				setWeather({
					city: res.data.name,
					country: res.data.sys.country,
					temp: res.data.main.temp,
					humidity: res.data.main.humidity,
					wind_speed: res.data.wind.speed,
					clouds: res.data.clouds.all,
					pressure: res.data.main.pressure, // ✅ ya lo teníamos
					timezone: res.data.timezone, // ✅ NUEVO: offset en segundos
					description: res.data.weather[0].description,
					icon: res.data.weather[0].icon,
					iconCode: res.data.weather[0].id,
				});
			})
			.finally(() => setLoading(false));
	}, [cityName]);

	// Por coordenadas
	useEffect(() => {
		if (!coords) return;
		setLoading(true);
		axios
			.get(BASE_URL + `?lat=${coords.lat}&lon=${coords.lon}&` + params)
			.then((res) => {
				setWeather({
					city: res.data.name,
					country: res.data.sys.country,
					temp: res.data.main.temp,
					humidity: res.data.main.humidity,
					wind_speed: res.data.wind.speed,
					clouds: res.data.clouds.all,
					pressure: res.data.main.pressure, // ✅ ya lo teníamos
					timezone: res.data.timezone, // ✅ NUEVO
					description: res.data.weather[0].description,
					icon: res.data.weather[0].icon,
					iconCode: res.data.weather[0].id,
				});
			})
			.finally(() => setLoading(false));
	}, [coords]);

	const getCoords = () => {
		if (!navigator.geolocation) {
			alert('Geolocalización no es soportada por tu navegador');
			return;
		}

		const success = ({ coords }) => {
			setCoords({
				lat: coords.latitude,
				lon: coords.longitude,
			});
		};

		const error = (err) => {
			console.log(err);
			alert('No se pudo obtener tu ubicación');
		};

		navigator.geolocation.getCurrentPosition(success, error);
	};

	return {
		weather,
		loading,
		setCityName,
		getCoords,
	};
}
