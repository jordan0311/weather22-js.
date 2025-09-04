export default function Card1({ children }) {
	return (
		<div
			className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] 
                 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10
                 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
                 hover:scale-[1.02]"
		>
			{children}
		</div>
	);
}
