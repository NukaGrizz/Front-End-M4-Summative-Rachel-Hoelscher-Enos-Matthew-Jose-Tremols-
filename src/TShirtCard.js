function TShirtCard({ tshirt, notify }) {

    function handleDelete() {
        fetch(`https://game-store-by-us.herokuapp.com/tShirt/${tshirt.t_shirt_id}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", tshirt: tshirt }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <tr key={tshirt.t_shirt_id}>
            <td>{tshirt.size}</td>
            <td>{tshirt.color}</td>
            <td>{tshirt.description}</td>
            <td>{tshirt.price}</td>
            <td>{tshirt.quantity}</td>
            <td>
                <button id="deleteButton" className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                <button id="editButton" className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", tshirt: tshirt })}>Edit</button>
            </td>
        </tr>
    );
}

export default TShirtCard;
