function GameCard({ game, notify }) {

    function handleDelete() {
        fetch(`https://game-store-by-us.herokuapp.com/game/${game.game_id}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", game: game }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <tr key={game.game_id}>
            <td>{game.title}</td>
            <td>{game.esrbRating}</td>
            <td>{game.studio}</td>
            <td>{game.description}</td>
            <td>{game.price}</td>
            <td>{game.quantity}</td>
            <td>
                <button id="deleteButton" className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                <button id="editButton" className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", game: game })}>Edit</button>
            </td>
        </tr>
    );
}

export default GameCard;
