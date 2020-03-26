import React, { useState } from 'react';
import './App.css';

function App() {
  const [slength, setSLength] = useState(0)
  const [plength, setPLength] = useState(0)
  const [swidth, setSWidth] = useState(0)
  const [pwidth, setPWidth] = useState(0)
  const [result, setResult] = useState("")

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
    ).then(res => {
      if ("0" === res[1]) {
        setResult("Setosa");
      }
      else if ("1" === res[1]) {
        setResult("Versicolor")
      }
      else if ("2" === res[1]) {
        setResult("Virginica")
      }
    })
  }
  return (
    <div className="App">
      <h1>
        Predict
      </h1>
      <form onSubmit={handleSubmit} method="post">
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
      <br></br>
      <div>
        Result
      </div>
      <br></br>
      <div>
        {result ? `The flower might be of type '${result}'` : ""}
      </div>
    </div>
  );
}

export default App;
