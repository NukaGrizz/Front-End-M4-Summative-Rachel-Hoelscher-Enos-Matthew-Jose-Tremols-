import { useState, useEffect } from 'react';
import './Records.css';
import ConsoleCard from './ConsoleCard.js';
import ConsoleForm from './ConsoleForm.js';

function Consoles() {

    const [consoles, setConsoles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedConsole, setScopedConsole] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://game-store-by-us.herokuapp.com/console")
        .then(response => response.json())
        .then(result => setConsoles(result))
        .catch(console.log);
    }, []);

    function addClick() {
        setScopedConsole({ console_id: 0, model: "", manufacturer: "", memory_amount: "", processor:"", price:0, quantity:0 });
        setShowForm(true);
    }

    function notify({ action, console, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setConsoles([...consoles, console]);
                break;
            case "edit":
                setConsoles(consoles.map(e => {
                    if (e.console_id === console.console_id) {
                        return console;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedConsole(console);
                setShowForm(true);
                return;
            case "delete":
                setConsoles(consoles.filter(e => e.console_id !== console.console_id));
                break;
            default: break;
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <ConsoleForm console={scopedConsole} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='recordTitle'>Consoles</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Console</button>
                <table id='records'>
                    <tr>
                        <th>Model</th>
                        <th>Manufacture</th>
                        <th>Memory</th>
                        <th>Processer</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {consoles.map(r => <ConsoleCard key={r.console_id} console={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Consoles;