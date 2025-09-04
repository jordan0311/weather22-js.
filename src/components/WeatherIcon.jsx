import {
	Cloud,
	Sun,
	CloudRain,
	Snowflake,
	CloudLightning,
	CloudFog,
} from 'lucide-react';

const conditionsCodes = {
	thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
	drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
	rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
	snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
	atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
	clear: [800],
	clouds: [801, 802, 803, 804],
};

const icons = {
	thunderstorm: <CloudLightning className="text-yellow-400 size-16" />,
	drizzle: <CloudRain className="text-cyan-400 size-16" />,
	rain: <CloudRain className="text-blue-400 size-16" />,
	snow: <Snowflake className="text-sky-300 size-16" />,
	atmosphere: <CloudFog className="text-gray-400 size-16" />,
	clear: <Sun className="text-yellow-400 size-16" />,
	clouds: <Cloud className="text-gray-300 size-16" />,
};

export default function WeatherIcon({ code }) {
	// Convertir siempre a número para evitar que falle el includes
	const numericCode = Number(code);

	const conditionKeys = Object.keys(conditionsCodes);
	const conditionKey = conditionKeys.find((key) =>
		conditionsCodes[key].includes(numericCode),
	);

	return icons[conditionKey] || <Cloud className="text-gray-300 size-16" />;
}
