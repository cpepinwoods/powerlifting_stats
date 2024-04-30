import './App.css';
import React, { useEffect, useState } from 'react';
import Hist from './components/Hist.js';

function App() {  
  const [state, setState] = useState({ apiResponse: "" });
  const [meets, setMeets] = useState([""]);

  const getNewMeet = async () => {
    const meet = document.getElementById("meet").value;
    await fetch("http://localhost:9000/stats/get_new_meet?meet=" + meet)
      .then(res => res.text())
      .then(res => alert(res))
      .then(() => getMeets());
  }

  // Gets the stats of the specified meet on button click
  const getMeetStats = async (meet) => {
    await fetch("http://localhost:9000/stats/stats_return?meet=" + meet)
      .then(res => {
        res.text();
        console.log(res);
      })
      .then(res => setState({ apiResponse: res }))
      .then(() => console.log(state));
  }

  const getMeets = async () => {
    await fetch("http://localhost:9000/stats/get_meets")
      .then(res => {
        return res.json()
      })
      .then(res => setMeets(res));
  }

  // Get meets use effect
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
        <button onClick={getNewMeet}>Get Meet Data</button>
      </div>
      <div>
        <h1>Meets Currently Listed</h1>
        {renderMeets()}
      </div>
      <div>
        <Hist data={{state}} id={"viz"}></Hist>
      </div>
    </>
  );
}

export default App;
