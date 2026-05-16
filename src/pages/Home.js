import DynamicBackground from "../components/Home/DynamicBackground";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">

            {/* Background Layer */}
            <DynamicBackground />

            {/* Content Layer */}
            <div className="home-content">
                <h1>Welcome to the World of Pixels</h1>

                <p>Play games and compete in the game world.</p>
            </div>

        </div>
    );
}

export default Home;