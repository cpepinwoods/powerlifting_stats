import './App.css';
import React, { useEffect, useState } from 'react';

function App() {  
  const [state, setState] = useState({ apiResponse: "" });
  const [meets, setMeets] = useState([""]);

  const callAPI = async () => {
    const meet = document.getElementById("meet").value;
    console.log(meet)
    await fetch("http://localhost:9000/stats/stats_return?meet=" + meet)
      .then(res => res.text())
      .then(res => setState({ apiResponse: res }));
  }

  const getMeetStats = async (meet) => {
    await fetch("http://localhost:9000/stats/stats_return?meet=" + meet)
      .then(res => res.text())
      .then(res => setState({ apiResponse: res }));
  }

  const getMeets = async () => {
    await fetch("http://localhost:9000/stats/get_meets")
      .then(res => {
        return res.json()
      })
      .then(res => setMeets(res));
  }

  useEffect(() => {
    getMeets();
  }, []);

  const renderMeets = () => {
    if (!meets) {
      return <p>No meets listed</p>
    } else {
      const meetList = meets.map((meet, index) => {
        return <button key={index} onClick={() => {getMeetStats(meet)}}>{meet}</button>
      });
      return (
        <div>
          {meetList}
        </div>
      )
    }
  }
  return (
    <>
      <div>
        <h1>Enter Meet URL</h1>
        <input type="text" id="meet" />
        <button onClick={callAPI}>Get Meet Data</button>
      </div>
      <div>
        <h1>Meets Currently Listed</h1>
        {renderMeets()}
      </div>
      <div>
        <p>{state.apiResponse}</p>
      </div>
    </>
  );
}

export default App;
