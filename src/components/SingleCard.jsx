import "./singleCard.css";

export default function singleCard({ card, handleChoice, flipped, disabled }) {
	const handleClick = () => !disabled && handleChoice(card);

	return (
		<div className="card">
			<div className={flipped ? "flipped" : ""}>
				<img src={card.src} alt="card front" className="front" />
				<img src="/flags/cover.jpg" alt="card back" className="back" onClick={handleClick} />
			</div>
		</div>
	);
}
