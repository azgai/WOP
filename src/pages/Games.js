import { useState } from "react";
import gamesData from "../data/gamesData";
import GameCard from "../components/games/GameCard";
import "./Home.css"; // Reuse styles from Home for consistency
function Games() {
    const [search, setSearch] = useState("");

    const categories = [...new Set(gamesData.map((game) => game.category))];

    // filter by search
    const filteredGames = gamesData.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page">
            <h1>Games Library</h1>

            {/* SEARCH BAR */}
            <input
                type="text"
                placeholder="Search games..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />

            {/* SHOW RESULTS */}
            {search ? (
                <div className="games-grid">
                    {filteredGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                // CATEGORY VIEW (default)
                categories.map((category) => (
                    <div key={category} className="category-section">
                        <h2 className="category-title">{category}</h2>

                        <div className="games-grid">
                            {gamesData
                                .filter((game) => game.category === category)
                                .map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Games;