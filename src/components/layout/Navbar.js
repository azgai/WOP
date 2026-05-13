import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>GameSite</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/games">Games</Link>
                <Link to="/leaderboard">Leaderboard</Link>
            </div>
        </nav>
    );
}

export default Navbar;