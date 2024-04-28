import './App.css';
import React, { useState } from 'react';

function App() {  
  const [state, setState] = useState({ apiResponse: "" });
  const callAPI = async () => {
    const meet = document.getElementById("meet").value;
    console.log(meet)
    await fetch("http://localhost:9000/stats/stats_return?meet=" + meet)
      .then(res => res.text())
      .then(res => setState({ apiResponse: res }));
  }
  return (
    <>
      <div className="center">
        <h1>Enter Meet URL</h1>
        <input type="text" id="meet" />
        <button onClick={callAPI}>Get Meet Data</button>
      </div>
      <div className='center'>
        <p>{state.apiResponse}</p>
      </div>
    </>
  );
}

export default App;
