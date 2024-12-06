import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PopulationChart = ({ data, onBarClick }) => {
	const svgRef = useRef();
	console.log(data, "data");
	useEffect(() => {
		if (!data || !data.length) return;

		// Clear any existing chart
		d3.select(svgRef.current).selectAll("*").remove();

		// Increased dimensions and margins
		const margin = { top: 20, right: 50, bottom: 120, left: 120 };
		const width = 3000 - margin.left - margin.right; // Increased width even more
		const height = 600 - margin.top - margin.bottom; // Increased height

		// Create SVG container with dynamic width
		const svg = d3
			.select(svgRef.current)
			.attr("width", "100%") // Make SVG responsive
			.attr("height", height + margin.top + margin.bottom)
			.attr(
				"viewBox",
				`0 0 ${width + margin.left + margin.right} ${
					height + margin.top + margin.bottom
				}`
			)
			.attr("preserveAspectRatio", "xMidYMid meet")
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Modified scales
		const x = d3
			.scaleBand()
			.range([0, width])
			.domain(data.map((d) => d.name))
			.padding(0.4); // Increased padding between bars

		const y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, d3.max(data, (d) => d.totalPopulation)]); // In the click handler:

		// Modified X axis
		svg
			.append("g")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(x).tickValues(x.domain().filter((d, i) => !(i % 5)))) // Show every 5th label
			.selectAll("text")
			.attr("transform", "rotate(-45)")
			.style("text-anchor", "end")
			.style("font-size", "12px")
			.attr("dx", "-0.8em")
			.attr("dy", "0.15em");

		// Modified Y axis
		svg
			.append("g")
			.call(
				d3
					.axisLeft(y)
					.tickFormat((d) => d3.format(".2s")(d))
					.ticks(10)
			) // Explicitly set number of ticks
			.style("font-size", "12px");

		// Create bars
		svg
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", (d) => x(d.name))
			.attr("y", (d) => y(d.totalPopulation))
			.attr("width", x.bandwidth())
			.attr("height", (d) => height - y(d.totalPopulation))
			.attr("fill", "#69b3a2")
			// Add hover effects
			.on("mouseover", function (event, d) {
				d3.select(this).attr("fill", "#4a7c6f");

				// Add tooltip
				svg
					.append("text")
					.attr("class", "tooltip")
					.attr("x", x(d.name) + x.bandwidth() / 2)
					.attr("y", y(d.totalPopulation) - 5)
					.attr("text-anchor", "middle")
					.text(d3.format(".2s")(d.totalPopulation));
			})
			.on("mouseout", function () {
				d3.select(this).attr("fill", "#69b3a2");
				svg.selectAll(".tooltip").remove();
			}) // Add click handler here
			.on("click", function (event, d) {
				onBarClick?.(d);
			});

		// Add labels
		svg
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 - height / 2)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Population");

		svg
			.append("text")
			.attr(
				"transform",
				`translate(${width / 2}, ${height + margin.bottom - 10})`
			)
			.style("text-anchor", "middle")
			.text("Countries");
	}, [data]);

	return (
		<div className='chart-container'>
			<svg ref={svgRef}></svg>
		</div>
	);
};

export default PopulationChart;

// reduce the label count show after 5 label
