import { useParams } from "react-router-dom";
import gamesData from "../data/gamesData";

import TicTacToe from "../games/TicTacToe/TicTacToe";
import MemoryGame from "../games/MemoryGame/MemoryGame";

function GameDetails() {
    const { id } = useParams();

    const game = gamesData.find((g) => g.id === id);

    if (!game) {
        return <h1>Game Not Found</h1>;
    }

    const renderGame = () => {
        switch (id) {
            case "memory-match":
                return <MemoryGame />;
            case "tic-tac-toe":
                return <TicTacToe />;

            default:
                return <p>Game not built yet.</p>;
        }
    };

    return (
        <div className="page">
            <h1>{game.title}</h1>

            <img src={game.image} alt={game.title} />

            <p>{game.description}</p>

            <h3>Category: {game.category}</h3>

            <div className="game-container">
                {renderGame()}
            </div>
        </div>
    );
}

export default GameDetails;