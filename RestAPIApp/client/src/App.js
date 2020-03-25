import React, { useState } from 'react';
import './App.css';

function App() {
  const [slength, setSLength] = useState(0)
  const [plength, setPLength] = useState(0)
  const [swidth, setSWidth] = useState(0)
  const [pwidth, setPWidth] = useState(0)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': '127.0.0.1:8000',
      'User-Agent': 'curl/7.64.1',
      'Accept': '*/*',
    },
    // to convert json to x-www-form-urlencoded format
    body:
      new URLSearchParams({
        'slength': slength,
        'swidth': swidth,
        'plength': plength,
        'pwidth': pwidth
      }),

  };

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://127.0.0.1:8000/predict', requestOptions).then(
      response => response.json()
    ).then(result => console.log(result))
  }
  return (
    <div className="App">
      <h1>
        Predict
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="slength">Sepal Length:</label>
        <input type="text" id="slength" name="slength" value={slength} onChange={(event) => { setSLength(event.target.value) }} /><br /><br />
        <label htmlFor="swidth">Sepal Width:</label>
        <input type="text" id="swidth" name="swidth" value={swidth} onChange={(event) => { setSWidth(event.target.value) }} /><br /><br />
        <label htmlFor="plength">Petal Length:</label>
        <input type="text" id="plength" name="plength" value={plength} onChange={(event) => { setPLength(event.target.value) }} /><br /><br />
        <label htmlFor="pwidth">Petal Width:</label>
        <input type="text" id="pwidth" name="pwidth" value={pwidth} onChange={(event) => { setPWidth(event.target.value) }} /><br /><br />
        {/* <input type="submit" value="Submit" onClick={() => {
          fetch('http://127.0.0.1:8000/predict').then(
            response => console.log(response)
          )
        }} /> */}
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
