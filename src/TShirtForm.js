import { useState } from 'react';

function TShirtForm({ tshirt: initialTShirt, notify }) {

    const [tshirt, setTShirt] = useState(initialTShirt);
    const isAdd = initialTShirt.t_shirt_id === 0;

    function handleChange(evt) {
        const clone = { ...tshirt };
        clone[evt.target.name] = evt.target.value;
        setTShirt(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "https://game-store-by-us.herokuapp.com/tShirt" : `https://game-store-by-us.herokuapp.com/tShirt/${tshirt.it_shirt_id}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(tshirt)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return tshirt;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                tshirt: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{tshirt.t_shirt_id > 0 ? "Edit" : "Add"} T-Shirt</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="artist">Size</label>
                    <input type="text" id="artist" name="artist"
                        className="form-control"
                        value={tshirt.size} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="album">Color</label>
                    <input type="text" id="album" name="album"
                        className="form-control"
                        value={tshirt.color} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">Description</label>
                    <input type="text" id="year" name="year"
                        className="form-control"
                        value={tshirt.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default TShirtForm;