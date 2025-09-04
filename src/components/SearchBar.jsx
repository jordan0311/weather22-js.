import { Search, LocateFixed } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch, onGeoLocate }) {
	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchValue.trim() === '') return;
		onSearch(searchValue);
		setSearchValue('');
	};

	return (
		<div className="flex items-center gap-3 mb-6">
			<form
				onSubmit={handleSubmit}
				className="flex items-center gap-2 flex-1 bg-white/5 border border-white/20 rounded-2xl px-5 py-3
                   shadow-inner focus-within:shadow-lg transition-all"
			>
				<Search className="size-5 text-cyan-400" />
				<input
					type="text"
					className="w-full bg-transparent outline-none placeholder-gray-400 text-white font-medium"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Busca una ciudad..."
				/>
			</form>
			<button
				onClick={onGeoLocate}
				className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl p-3 shadow-lg transition-all cursor-pointer"
			>
				<LocateFixed className="size-5" />
			</button>
		</div>
	);
}
