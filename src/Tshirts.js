import { useState, useEffect } from 'react';
import './Records.css';
import TShirtCard from './TShirtCard.js';
import TShirtForm from './TShirtForm.js';

function TShirts() {

    const [tshirts, setTShirts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedTShirt, setScopedTShirt] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://game-store-by-us.herokuapp.com/tShirt")
        .then(response => response.json())
        .then(result => setTShirts(result))
        .catch(console.log);
    }, []);

    function addClick() {
        
        setScopedTShirt({ t_shirt_id: 0, size: "", color: "", description: "", price:0,quantity: 0 });
        setShowForm(true);
    }

    function notify({ action, tshirt, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setTShirts([...tshirts, tshirt]);
                break;
            case "edit":
                setTShirts(tshirts.map(e => {
                    if (e.t_shirt_id === tshirt.t_shirt_id) {
                        return tshirt;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedTShirt(tshirt);
                setShowForm(true);
                return;
            case "delete":
                setTShirts(tshirts.filter(e => e.t_shirt_id !== tshirt.t_shirt_id));
                break;
            default: break;
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <TShirtForm tshirt={scopedTShirt} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='recordTitle'>T-Shirts</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a T-Shirt</button>
                <table id='records'>
                    <tr>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quanttity</th>
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {tshirts.map(r => <TShirtCard key={r.t_shirt_id} tshirt={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TShirts;