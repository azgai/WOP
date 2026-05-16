import DynamicBackground from "../components/home/DynamicBackground";
import "./Home.css";

function Home() {
    return (
        <div className="page">
            <DynamicBackground />

            <div className="home-content">
                <h1>Welcome to the World of Pixels</h1>

                <br />

                <p>Play games and compete in the game world.</p>
            </div>
        </div>
    );
}

export default Home;