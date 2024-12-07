import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PopulationChart = ({ data, onBarClick, label = "", renderPopup }) => {
	const svgRef = useRef();
	useEffect(() => {
		// Add scroll event listener to chart container
		const container = document.querySelector(".chart-container");

		const handleScroll = () => {
			// Remove popup when scrolling
			const popup = document.querySelector(".popup-card");
			if (popup) {
				popup.remove();
			}
		};

		container?.addEventListener("scroll", handleScroll);

		// Cleanup listener on component unmount
		return () => {
			container?.removeEventListener("scroll", handleScroll);
		};
	}, []); // Empty dependency array since we only want to set this up once

	useEffect(() => {
		if (!data || !data.length) return;

		// Clear any existing chart
		d3.select(svgRef.current).selectAll("*").remove();

		const margin = { top: 20, right: 50, bottom: 120, left: 120 };
		const width = data.length * 40;
		const height = 600 - margin.top - margin.bottom;

		// Create SVG container with dynamic width
		const svg = d3
			.select(svgRef.current)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Modified scales
		const x = d3
			.scaleBand()
			.range([0, width])
			.domain(data.map((d) => d.name))
			.padding(0.1); // Reduced padding to fit more bars

		const y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, d3.max(data, (d) => d.totalPopulation)]); // In the click handler:

		// Modified X axis - show fewer labels to prevent overcrowding
		svg
			.append("g")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(x).tickValues(x.domain()))
			.selectAll("text")
			.attr("transform", "rotate(-45)") // Rotate text 45 degrees
			.style("text-anchor", "end")
			.attr("dx", "-0.8em") // Adjust X position of text
			.attr("dy", "-0.4em") // Adjust Y position of text
			.style("font-size", "16px"); // Slightly smaller font size for better fit

		// Modified Y axis
		svg
			.append("g")
			.call(
				d3
					.axisLeft(y)
					.tickFormat((d) => d3.format(".2s")(d))
					.ticks(10)
			) // Explicitly set number of ticks'
			.style("font-size", "24px") // Increased font size from 12px to 24px
			.selectAll("text")
			.attr("x", -10) // Adjust horizontal position of labels
			.attr("dy", "0.1em") // Adjust vertical alignment
			.style("margin-right", "15px"); // Add spacing between text and axis

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
				// Remove any existing popup
				d3.select(".popup-card").remove();

				// Create popup card
				const popup = d3
					.select("body")
					.append("div")
					.attr("class", "popup-card")
					.style("position", "absolute")
					.style("left", `${event.pageX + 10}px`)
					.style("top", `${event.pageY - 10}px`)
					.style("background", "white")
					.style("padding", "15px")
					.style("border-radius", "8px")
					.style("box-shadow", "0 2px 10px rgba(0,0,0,0.1)")
					.style("z-index", "1000")
					.style("min-width", "250px");

				// Add content to popup
				// Use custom popup content if provided, otherwise use default
				if (renderPopup) {
					popup.html(renderPopup(d));
				} else {
					popup.html(`
            <div style="position: relative">
              <button 
                  onclick="this.parentElement.parentElement.remove()" 
                  style="position: absolute; right: 5px; top: 5px; border: none; background: none; cursor: pointer; font-size: 18px;"
              >
                  ×
              </button>
              <h3 style="margin: 0 0 15px 0; padding-right: 20px">
                <strong>Name: </strong><br/>${d.name}</h3>
              <div style="margin-bottom: 10px">
                  <strong>Population:</strong><br/> ${d3.format(",.0f")(
										d.totalPopulation
									)}
              </div>
            </div>
         `);
				}
				// Stop the click event from bubbling up
				event.stopPropagation();

				// Create handler for outside clicks
				function handleOutsideClick(e) {
					const popupElement = document.querySelector(".popup-card");
					if (popupElement && !popupElement.contains(e.target)) {
						popupElement.remove();
						document.removeEventListener("click", handleOutsideClick);
					}
				}

				// Make handler available globally for the close button
				window._handleOutsideClick = handleOutsideClick;

				// Add click listener to document
				setTimeout(() => {
					document.addEventListener("click", handleOutsideClick);
				}, 0);
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
			.text(label);
		// Add the wrap function
	}, [data]);

	return (
		<div className='chart-container'>
			<svg ref={svgRef}></svg>
		</div>
	);
};

export default PopulationChart;

// reduce the label count show after 5 label
