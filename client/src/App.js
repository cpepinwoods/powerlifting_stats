import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import Hist from './components/Hist.js';

function App() {  
  const [freq, setFreq] = useState([0]);
  const [vals, setVals] = useState([0]);
  const [meets, setMeets] = useState([""]);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const graphRef = useRef();

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
      .then(res => res.json())
      .then(res => {
        setFreq(res.freq);
        setVals(res.vals)});
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
        const meet_name = meet.split(".")[0];
        const meet_name_parts = meet_name.split("_");
        const pretty_name = [...meet_name_parts.slice(1), meet_name_parts[0]].join(" ");
        return <li><button key={index} onClick={() => {getMeetStats(meet)}}>{pretty_name}</button></li>
      });
      return (
        <div className="meetList">
          {meetList}
        </div>
      )
    }
  }

  useEffect(() => {
    const width = graphRef.current.clientWidth;
    const height = graphRef.current.clientHeight;
    setDimensions({width, height});
  }, [graphRef]);

  return (
    <div className="outer">
      <div>
        <h1>Enter Meet URL</h1>
        <input type="text" id="meet" />
        <button onClick={getNewMeet}>Get Meet Data</button>
      </div>
      <div>
        <h1>Meets Currently Listed</h1>
        <ul columns={2}>{renderMeets()}</ul>
      </div>
      <div className="display" ref={graphRef}>
        <Hist freq={freq} vals={vals} id={useRef()} width={dimensions.width} height={dimensions.height}></Hist>
        <p>The above graph shows the totals achieved at the given meet as a Histogram.<br></br>
          The X-axis reflects the totals in kilograms that are in each bracket<br></br>
          The Y-Axis reflects the percent of the competitors that fall into each bin<br></br>
          The data labels are the number of competitors in each bin</p>
      </div>
    </div>
  );
}

export default App;
