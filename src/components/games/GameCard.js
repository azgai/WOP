import { Link } from "react-router-dom";

function GameCard({ game }) {
    return (
        <Link to={`/games/${game.id}`} className="game-card">
            <img src={game.image} alt={game.title} />

            <div className="game-card-content">
                <h3>{game.title}</h3>
                <p>{game.category}</p>
            </div>
        </Link>
    );
}

export default GameCard;