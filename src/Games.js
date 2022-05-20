import { useState, useEffect } from 'react';
import './Records.css';
import GameCard from './GameCard.js';
import GameForm from './GameForm.js';

function Games() {

    const [games, setGames] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedGame, setScopedGame] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://game-store-by-us.herokuapp.com/game")
        .then(response => response.json())
        .then(result => setGames(result))
        .catch(console.log);
    }, []);

    function addClick() {
        setScopedGame({ game_id: 0, title: "", esrbRating: "", description: "",price: 0, studio:"",quantity:0 });
        setShowForm(true);
    }

    function notify({ action, game, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setGames([...games, game]);
                break;
            case "edit":
                setGames(games.map(e => {
                    if (e.game_id === game.game_id) {
                        return game;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedGame(game);
                setShowForm(true);
                return;
            case "delete":
                setGames(games.filter(e => e.game_id !== game.game_id));
                break;
            default: break;
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <GameForm game={scopedGame} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='recordTitle'>Games</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Game</button>
                <table id='records'>
                    <tr>
                        <th>Title</th>
                        <th>EsrbRating</th>
                        <th>Studio</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {games.map(r => <GameCard key={r.game_id} game={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Games;