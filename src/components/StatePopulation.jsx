import React, { useEffect } from "react";
import { useGetStatesMutation } from "../services/citiesApi";

export default function StatePopulation({ value }) {
	const [getState, { data, status }] = useGetStatesMutation();

	const fetchStates = async (country) => {
		try {
			const states = await getState({ country: "East Asia" });
			console.log(states);
		} catch (error) {
			console.error("Failed to fetch states:", error);
		}
	};
	console.log(data, "data");
	useEffect(() => {
		fetchStates(value);
	}, []);
	if (status === 404) {
		return <>State not found</>;
	}
	return (
		<div
			style={{
				width: "100vw",
				height: "80vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: "2px solid red",
				marginRight: "auto",
				marginLeft: "auto",
			}}>
			{/* <PopulationChart
				data={states}
				onBarClick={(barData) => {
					setStage({
						name: STAGE.STATE,
						value: barData.country,
					});
				}}
			/> */}
		</div>
	);
}
