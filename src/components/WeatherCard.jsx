import { Cloud, Droplets, Wind, Gauge } from 'lucide-react';
import { useEffect, useState } from 'react';
import WeatherIcon from './WeatherIcon';

function useCityClock(timezoneSeconds = 0) {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(id);
	}, []);

	const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
	const cityDate = new Date(utcMs + timezoneSeconds * 1000);

	return cityDate.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
}

export default function WeatherCard({ weather }) {
	const [isCelsius, setIsCelsius] = useState(true);
	const time = useCityClock(weather?.timezone ?? 0);

	const temp = isCelsius ? weather.temp : (weather.temp * 9) / 5 + 32;

	return (
		<div className="space-y-6 text-center text-white transition-all duration-700">
			{/* Icono principal */}
			<div className="flex justify-center">
				<div
					className="size-28 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full 
                     flex items-center justify-center shadow-xl animate-[wiggle_3s_infinite]"
				>
					<div className="text-6xl">
						<WeatherIcon code={weather.iconCode} />
					</div>
				</div>
			</div>

			{/* Bloque con grid (hora + botón a la izq, temperatura a la der) */}
			<div className="grid grid-cols-3 gap-4 items-stretch">
				{/* Columna izquierda con dos filas */}
				<div className="flex flex-col gap-4">
					{/* Hora */}
					<div
						className="bg-white/10 rounded-xl p-4 shadow-md flex items-center justify-center 
                          transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:scale-105"
					>
						<p className="font-mono text-lg text-cyan-300/90 tracking-widest">
							{time}
						</p>
					</div>
					{/* Botón */}
					<div
						className="bg-white/10 rounded-xl p-4 shadow-md flex items-center justify-center 
                          transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:scale-105"
					>
						<button
							onClick={() => setIsCelsius(!isCelsius)}
							className="bg-cyan-500/80 hover:bg-cyan-500 px-3 py-2 rounded-lg 
                         shadow-md text-sm font-semibold transition hover:scale-105"
						>
							Cambiar a {isCelsius ? '°F' : '°C'}
						</button>
					</div>
				</div>

				{/* Caja temperatura (ocupa dos filas de la derecha) */}
				<div
					className="col-span-2 bg-white/10 rounded-xl p-6 shadow-md flex flex-col items-center justify-center gap-2 
                        transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-105"
				>
					<h2 className="text-7xl font-extrabold text-cyan-400 drop-shadow-md">
						{temp.toFixed(0)}°
						<span className="text-3xl">{isCelsius ? 'C' : 'F'}</span>
					</h2>
				</div>
			</div>

			{/* Ciudad */}
			<h3 className="text-2xl font-semibold">
				{weather.city}, {weather.country}
			</h3>

			<p className="text-gray-300 capitalize">{weather.description}</p>

			{/* Detalles del clima */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				<div className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:scale-105">
					<Wind className="size-6 text-cyan-400 mb-1" />
					<span className="font-bold">{weather.wind_speed} km/h</span>
					<span className="text-gray-400 text-sm">Viento</span>
				</div>
				<div className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:scale-105">
					<Droplets className="size-6 text-cyan-400 mb-1" />
					<span className="font-bold">{weather.humidity}%</span>
					<span className="text-gray-400 text-sm">Humedad</span>
				</div>
				<div className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:scale-105">
					<Cloud className="size-6 text-cyan-400 mb-1" />
					<span className="font-bold">{weather.clouds}%</span>
					<span className="text-gray-400 text-sm">Nubes</span>
				</div>
				<div className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:scale-105">
					<Gauge className="size-6 text-cyan-400 mb-1" />
					<span className="font-bold">{weather.pressure} hPa</span>
					<span className="text-gray-400 text-sm">Presión</span>
				</div>
			</div>
		</div>
	);
}
