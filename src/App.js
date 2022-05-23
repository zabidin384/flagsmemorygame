import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
	{ src: "/flags/flag-of-Argentina.png", matched: false },
	{ src: "/flags/flag-of-Australia.png", matched: false },
	{ src: "/flags/flag-of-Brazil.png", matched: false },
	{ src: "/flags/flag-of-Canada.png", matched: false },
	{ src: "/flags/flag-of-China.png", matched: false },
	{ src: "/flags/flag-of-Denmark.png", matched: false },
	{ src: "/flags/flag-of-Egypt.png", matched: false },
	{ src: "/flags/flag-of-France.png", matched: false },
	{ src: "/flags/flag-of-Germany.png", matched: false },
	{ src: "/flags/flag-of-Indonesia.png", matched: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// Shuffle cards
	const shuffleCards = () => {
		const shuffleCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffleCards);
		setTurns(0);
	};

	// Handle a choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	// Compare 2 selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);

			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	// Reset choices & increase turn
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	// Start a new game automatically
	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className="App">
			<h1>Flags Memory Game ?</h1>
			<h3>By Zainal Abidin</h3>
			<button onClick={shuffleCards}>New Game</button>
			<div className="card-grid">
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
