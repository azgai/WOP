import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Games from "../pages/Games";
import GameDetails from "../pages/GameDetails";
import Leaderboard from "../pages/Leaderboard";
import NotFound from "../pages/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;