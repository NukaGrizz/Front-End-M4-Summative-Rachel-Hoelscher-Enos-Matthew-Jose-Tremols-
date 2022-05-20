import { useState } from 'react';

function ConsoleForm({ console: initialConsole, notify }) {

    const [console, setConsole] = useState(initialConsole);
    const isAdd = initialConsole.console_id === 0;

    function handleChange(evt) {
        const clone = { ...console };
        clone[evt.target.name] = evt.target.value;
        setConsole(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "https://game-store-by-us.herokuapp.com/console" : `https://game-store-by-us.herokuapp.com/console/${console.console_id}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(console)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return console;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                console: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{console.console_id > 0 ? "Edit" : "Add"} Console</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="artist">Model</label>
                    <input type="text" id="artist" name="artist"
                        className="form-control"
                        value={console.model} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="album">manufacturer</label>
                    <input type="text" id="album" name="album"
                        className="form-control"
                        value={console.manufacturer} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">memory_amount</label>
                    <input type="text" id="year" name="year"
                        className="form-control"
                        value={console.memory_amount} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default ConsoleForm;