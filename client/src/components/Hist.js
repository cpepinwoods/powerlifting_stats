import React from 'react';
import * as d3 from 'd3';

const Axis = ({x, y, scale, ticks, dir}) => {
    let axis = undefined;
    let transform = `translate(${x}, ${y})`;
    if (dir === "y") {
        axis = d3.axisBottom(scale).ticks(ticks);
        transform = [`translate(${x}, ${y}) rotate(90)`];
    } else {
        axis = d3.axisBottom(scale).tickValues(ticks);
    }
    return (
        <g transform={transform} ref={node => d3.select(node).call(axis)} />
    );
}

function Hist({freq, vals, id, width, height}) {
    const max = Math.max(...freq);
    const graph_height = height * 0.9;
    const graph_width = width * 0.9;
    const x_offset = width * 0.05;
    const y_offset = height * 0.05;
    let count = freq.length;
    const y_scale = graph_height / max;
    const x_scale = graph_width / count;
    const graph = freq.map((val, index) => {
        return (<g>
            <rect x={x_offset + index*x_scale} y={y_offset + graph_height - val*y_scale} width={x_scale - 1} height={val*y_scale} fill="black"></rect>
            <text x={x_offset + index*x_scale + x_scale/2 - 7} y={y_offset + graph_height - val*y_scale - 3} fill="black">{val}</text>
            </g>)
    });
    if (count === 1){
        count = 0;
    }
    const sum = freq.reduce((a, b) => a + b, 0);
    const xScale = d3.scaleLinear().domain([0, Math.max(...vals)]).range([x_offset, x_offset + graph_width]);
    const yScale = d3.scaleLinear().domain([0, max/sum*100]).range([graph_height + y_offset, y_offset]);
    const step = Math.max(...vals)/50;
    const ticks = d3.range(0, Math.max(...vals) + step, step);
    console.log(vals);
    return (
        <svg ref={id} width="100%" height="100%" margin="10px">
            {graph}
            <Axis x={0} y={height-25} scale={xScale} ticks={ticks} dir={"x"}></Axis>
            <Axis x={x_offset} y={0} scale={yScale} ticks={10} dir={"y"}></Axis>
        </svg>
    );
}

export default Hist;