import Card1 from './components/Card1';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { useWeather } from './hooks/useWeather';

export default function App() {
	const { weather, loading, setCityName, getCoords } = useWeather();

	if (loading) {
		return (
			<div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen grid place-content-center">
				<div className="flex flex-col items-center gap-4">
					<div className="size-12 border-4 border-gray-700 border-t-cyan-500 rounded-full animate-spin"></div>
					<span className="text-cyan-400 font-semibold">Cargando...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen grid place-content-center px-4">
			<Card1>
				<SearchBar onSearch={setCityName} onGeoLocate={getCoords} />
				{weather && <WeatherCard weather={weather} />}
			</Card1>
		</div>
	);
}
