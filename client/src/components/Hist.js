import React, { useEffect } from 'react';
import * as d3 from 'd3';

function drawChart(data) {
    const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 300);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => 300 - 10 * d)
        .attr("width", 65)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green");
}

function Hist({data, id}) {
    useEffect(() => {
        drawChart(data);
    }, [data]);
    return (
        <div id={id}></div>
    );
}

export default Hist;