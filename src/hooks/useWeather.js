import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export function useWeather() {
	const [cityName, setCityName] = useState('');
	const [coords, setCoords] = useState(null);
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);

	// Función para normalizar nombres de ciudades (quita acentos)
	const normalizeCity = (city) => {
		return city.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	};

	// Detectar ciudad por IP (primera carga)
	useEffect(() => {
		axios
			.get('https://ipinfo.io/json')
			.then((res) => {
				const normalizedCity = normalizeCity(res.data.city);
				setCityName(normalizedCity);
				// Si ipinfo nos da coordenadas, las guardamos también
				if (res.data.loc) {
					const [lat, lon] = res.data.loc.split(',');
					setCoords({ lat, lon });
				}
			})
			.catch((err) => console.error('Error detectando ciudad:', err));
	}, []);

	// Obtener clima por nombre de ciudad
	useEffect(() => {
		if (!cityName) return;
		setLoading(true);

		axios
			.get(BASE_URL, {
				params: {
					q: cityName,
					appid: API_KEY,
					units: 'metric',
					lang: 'es',
				},
			})
			.then((res) => {
				setWeather({
					city: res.data.name,
					country: res.data.sys.country,
					temp: res.data.main.temp,
					humidity: res.data.main.humidity,
					wind_speed: res.data.wind.speed,
					clouds: res.data.clouds.all,
					pressure: res.data.main.pressure,
					timezone: res.data.timezone,
					description: res.data.weather[0].description,
					icon: res.data.weather[0].icon,
					iconCode: res.data.weather[0].id,
				});
			})
			.catch((err) => {
				console.error(
					'Error obteniendo clima:',
					err.response?.data || err.message,
				);
				alert(
					'No se pudo obtener el clima por nombre de ciudad. Intentando por coordenadas...',
				);
				// Si falla la ciudad, intentamos con coords
				if (coords) fetchWeatherByCoords(coords.lat, coords.lon);
			})
			.finally(() => setLoading(false));
	}, [cityName]);

	// Obtener clima por coordenadas
	const fetchWeatherByCoords = (lat, lon) => {
		setLoading(true);
		axios
			.get(BASE_URL, {
				params: {
					lat,
					lon,
					appid: API_KEY,
					units: 'metric',
					lang: 'es',
				},
			})
			.then((res) => {
				setWeather({
					city: res.data.name,
					country: res.data.sys.country,
					temp: res.data.main.temp,
					humidity: res.data.main.humidity,
					wind_speed: res.data.wind.speed,
					clouds: res.data.clouds.all,
					pressure: res.data.main.pressure,
					timezone: res.data.timezone,
					description: res.data.weather[0].description,
					icon: res.data.weather[0].icon,
					iconCode: res.data.weather[0].id,
				});
			})
			.catch((err) => {
				console.error(
					'Error obteniendo clima por coordenadas:',
					err.response?.data || err.message,
				);
				alert(
					'No se pudo obtener el clima. Verifica tu API key o tu conexión.',
				);
			})
			.finally(() => setLoading(false));
	};

	// Obtener coords del navegador manualmente
	const getCoords = () => {
		if (!navigator.geolocation) {
			alert('Geolocalización no soportada por tu navegador');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				const lat = coords.latitude;
				const lon = coords.longitude;
				setCoords({ lat, lon });
				fetchWeatherByCoords(lat, lon);
			},
			(err) => {
				console.error(err);
				alert('No se pudo obtener tu ubicación');
			},
		);
	};

	return {
		weather,
		loading,
		setCityName,
		getCoords,
	};
}
