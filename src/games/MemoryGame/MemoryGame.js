import { useEffect, useState } from "react";
import "./MemoryGame.css";

const emojis = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝"];

function shuffle(array) {
    return [...array, ...array]
        .sort(() => Math.random() - 0.5)
        .map((item, index) => ({
            id: index,
            value: item,
            flipped: false,
            matched: false
        }));
}

function MemoryGame() {
    const [cards, setCards] = useState(() => shuffle(emojis));
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [moves, setMoves] = useState(0);
    const [wins, setWins] = useState(0);

    const handleClick = (card) => {
        if (disabled || card.flipped || card.matched) return;

        if (!firstCard) {
            setFirstCard(card);
            flipCard(card);
        } else {
            setSecondCard(card);
            flipCard(card);
            setDisabled(true);
        }
    };

    const flipCard = (card) => {
        setCards((prev) =>
            prev.map((c) =>
                c.id === card.id ? { ...c, flipped: true } : c
            )
        );
    };

    useEffect(() => {
        if (firstCard && secondCard) {
            setMoves((m) => m + 1);

            if (firstCard.value === secondCard.value) {
                setCards((prev) =>
                    prev.map((c) =>
                        c.value === firstCard.value
                            ? { ...c, matched: true }
                            : c
                    )
                );

                resetTurn();
            } else {
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === firstCard.id || c.id === secondCard.id
                                ? { ...c, flipped: false }
                                : c
                        )
                    );

                    resetTurn();
                }, 800);
            }
        }
    }, [firstCard, secondCard]);

    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
        setDisabled(false);
    };

    const resetGame = () => {
        setCards(shuffle(emojis));
        setFirstCard(null);
        setSecondCard(null);
        setMoves(0);
        setDisabled(false);
    };

    useEffect(() => {
        if (cards.every((c) => c.matched)) {
            setWins((w) => w + 1);
        }
    }, [cards]);

    return (
        <div className="memory-container">
            <h1>Memory Game</h1>

            <div className="stats">
                <p>Moves: {moves}</p>
                <p>Wins: {wins}</p>
            </div>

            <div className="grid">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
                        onClick={() => handleClick(card)}
                    >
                        {card.flipped || card.matched ? card.value : "❓"}
                    </div>
                ))}
            </div>

            <button onClick={resetGame} className="reset">
                Restart
            </button>
        </div>
    );
}

export default MemoryGame;