import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main>
            <div>Hello World</div>
            <div>
                <Link to="/game">Game</Link>
            </div>
        </main>
    )
}

export default Home;