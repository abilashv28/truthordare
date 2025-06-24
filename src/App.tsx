import { useState } from "react";
import BottleSpinner from "./components/BottleSpinner";

const questions = {
	normal: {
		truths: [
			"What is your favorite color?",
			"Have you ever lied to your parents?",
			"What is your favorite food?",
			"What is your biggest fear?",
			// Add more normal truths
		],
		dares: [
			"Do 10 jumping jacks!",
			"Sing a song loudly!",
			"Spin around 5 times!",
			"Do your best animal impression!",
			// Add more normal dares
		],
	},
	teenage: {
		truths: [
			"Who was your first crush?",
			"Have you ever skipped a class?",
			"What is the most embarrassing thing at school?",
			"Have you ever cheated on a test?",
			// Add more teenage truths
		],
		dares: [
			"Text your crush 'Hi'!",
			"Post a silly selfie on social media!",
			"Speak in a funny accent for 2 minutes!",
			"Do a TikTok dance!",
			// Add more teenage dares
		],
	},
	spicy: {
		truths: [
			"What is your wildest fantasy?",
			"Have you ever had a secret relationship?",
			"What is the most daring thing you've done?",
			"Who here do you find most attractive?",
			// Add more spicy truths
		],
		dares: [
			"Send a flirty message to someone!",
			"Share your last search history!",
			"Do a seductive dance!",
			"Reveal a secret!",
			// Add more spicy dares
		],
	},
};

export default function App() {
	type Category = "normal" | "teenage" | "spicy";
	const [category, setCategory] = useState<Category | null>(null);
	const [mode, setMode] = useState<"truth" | "dare" | null>(null);
	const [question, setQuestion] = useState<string>("");
	const [history, setHistory] = useState<string[]>([]);
	const [spinning, setSpinning] = useState(false);
	const [angle, setAngle] = useState(0);

	function getRandom(arr: string[]) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function handleSpin() {
		setSpinning(true);
		// Randomly pick truth or dare
		const result = Math.random() < 0.5 ? "truth" : "dare";
		// Calculate random spins (4-7 full spins) + final angle
		const spins = Math.floor(Math.random() * 3) + 4; // 4 to 6 spins
		const finalAngle = result === "truth" ? 0 : 180;
		setAngle(spins * 360 + finalAngle);
		setTimeout(() => {
			setMode(result);
			const q =
				result === "truth"
					? getRandom(questions[category as Category].truths)
					: getRandom(questions[category as Category].dares);
			setQuestion(q);
			setHistory([q, ...history]);
			setSpinning(false);
		}, 4600); // match the 4.5s animation duration
	}

	function handleReset() {
		setMode(null);
		setQuestion("");
		setAngle(0);
	}

	function handleCategorySelect(cat: Category) {
		setCategory(cat);
		setMode(null);
		setQuestion("");
		setHistory([]);
	}

	function handleBackToCategory() {
		setCategory(null);
		setMode(null);
		setQuestion("");
		setHistory([]);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center justify-center p-4">
			<div className="bg-white/80 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
				<h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-6 drop-shadow-lg">
					Truth or Dare
				</h1>
				{!category && (
					<div className="flex flex-col gap-4 mb-4">
						<div className="text-lg font-semibold text-gray-700 mb-2">
							Choose a Category
						</div>
						<button
							className="py-2 px-6 rounded-full bg-green-400 text-white font-bold shadow hover:bg-green-500 transition"
							onClick={() => handleCategorySelect("normal")}
						>
							Normal
						</button>
						<button
							className="py-2 px-6 rounded-full bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600 transition"
							onClick={() => handleCategorySelect("teenage")}
						>
							Teenage
						</button>
						<button
							className="py-2 px-6 rounded-full bg-pink-600 text-white font-bold shadow hover:bg-pink-700 transition"
							onClick={() => handleCategorySelect("spicy")}
						>
							Spicy
						</button>
					</div>
				)}
				{category && !mode && (
					<>
						<div className="text-lg font-semibold text-gray-700 mb-4">
							Category: <span className="capitalize">{category}</span>
						</div>
						<BottleSpinner
							spinning={spinning}
							onSpin={handleSpin}
							angle={angle}
						/>
						<button
							className="mt-2 text-xs text-gray-500 underline"
							onClick={handleBackToCategory}
							disabled={spinning}
						>
							Back to Categories
						</button>
					</>
				)}
				{category && mode && (
					<div className="flex flex-col items-center gap-6">
						<div className="text-2xl font-semibold text-gray-800 animate-fade-in">
							{mode === "truth" ? "Truth:" : "Dare:"}
						</div>
						<div className="text-xl text-gray-700 mb-2 animate-fade-in">
							{question}
						</div>
						<button
							className="mt-2 py-2 px-6 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
							onClick={handleReset}
						>
							Play Again
						</button>
						<button
							className="text-xs text-gray-500 underline"
							onClick={handleBackToCategory}
						>
							Back to Categories
						</button>
					</div>
				)}
				{category && (
					<div className="mt-8 text-left">
						<h2 className="text-lg font-bold text-gray-700 mb-2">History</h2>
						<ul className="max-h-32 overflow-y-auto text-gray-600 text-sm space-y-1">
							{history.map((item, idx) => (
								<li key={idx}>• {item}</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<footer className="mt-8 text-gray-500 text-xs">
				&copy; {new Date().getFullYear()} Truth or Dare Game
			</footer>
		</div>
	);
}