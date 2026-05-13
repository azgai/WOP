import { useEffect, useState, useCallback } from "react";
import "./tictactoe.css";

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

function TicTacToe() {
    const emptyBoard = Array(9).fill("");

    const [board, setBoard] = useState(emptyBoard);
    const [isXTurn, setIsXTurn] = useState(true);
    const [mode, setMode] = useState("multi");
    const [winner, setWinner] = useState(null);

    const [score, setScore] = useState(() => {
        return JSON.parse(localStorage.getItem("ttt-score")) || {
            X: 0,
            O: 0,
        };
    });

    // CHECK WINNER
    const checkWinner = useCallback((newBoard) => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;

            if (
                newBoard[a] &&
                newBoard[a] === newBoard[b] &&
                newBoard[a] === newBoard[c]
            ) {
                return newBoard[a];
            }
        }

        if (!newBoard.includes("")) {
            return "draw";
        }

        return null;
    }, []);

    // HANDLE CLICK
    const handleClick = useCallback((index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];

        newBoard[index] = isXTurn ? "X" : "O";

        const result = checkWinner(newBoard);

        setBoard(newBoard);
        setWinner(result);

        if (result === "X" || result === "O") {
            const updatedScore = { ...score };

            updatedScore[result]++;

            setScore(updatedScore);

            localStorage.setItem(
                "ttt-score",
                JSON.stringify(updatedScore)
            );
        }

        setIsXTurn(!isXTurn);

    }, [board, isXTurn, winner, score, checkWinner]);

    // CPU MOVE
    useEffect(() => {
        if (mode === "cpu" && !isXTurn && !winner) {

            const emptyIndexes = board
                .map((val, idx) => (val === "" ? idx : null))
                .filter((v) => v !== null);

            const randomMove =
                emptyIndexes[
                Math.floor(Math.random() * emptyIndexes.length)
                ];

            if (randomMove !== undefined) {

                const timer = setTimeout(() => {
                    handleClick(randomMove);
                }, 500);

                return () => clearTimeout(timer);
            }
        }

    }, [isXTurn, mode, board, winner, handleClick]);

    // RESET GAME
    const resetGame = () => {
        setBoard(emptyBoard);
        setIsXTurn(true);
        setWinner(null);
    };

    // RESET SCORE
    const resetScore = () => {
        const clearedScore = {
            X: 0,
            O: 0,
        };

        setScore(clearedScore);

        localStorage.setItem(
            "ttt-score",
            JSON.stringify(clearedScore)
        );
    };

    return (
        <div className="ttt-container">
            <h1>Tic Tac Toe</h1>

            {/* MODES */}
            <div className="mode-switch">
                <button onClick={() => setMode("multi")}>
                    Multiplayer
                </button>

                <button onClick={() => setMode("cpu")}>
                    VS Computer
                </button>
            </div>

            {/* SCORE */}
            <div className="score">
                <p>X: {score.X}</p>
                <p>O: {score.O}</p>
            </div>

            {/* STATUS */}
            <h2>
                {winner
                    ? winner === "draw"
                        ? "Draw!"
                        : `${winner} Wins!`
                    : `Turn: ${isXTurn ? "X" : "O"}`}
            </h2>

            {/* BOARD */}
            <div className="board">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        className="cell"
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </div>
                ))}
            </div>

            {/* CONTROLS */}
            <div className="controls">
                <button className="reset" onClick={resetGame}>
                    Restart Game
                </button>

                <button className="reset" onClick={resetScore}>
                    Reset Score
                </button>
            </div>
        </div>
    );
}

export default TicTacToe;