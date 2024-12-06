import React, { useEffect } from "react";
import { useGetCityPopulationMutation } from "../services/citiesApi";
import PopulationChart from "./PopulationChart";

export default function StatePopulation({ value }) {
	const [getState, { data, status, isLoading }] =
		useGetCityPopulationMutation();

	const fetchStates = async (country) => {
		try {
			const states = await getState({ country: country });
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
	if (isLoading) {
		return <div>Loading...</div>;
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
			<PopulationChart
				data={data}
				onBarClick={(barData) => {
					setStage({
						name: STAGE.STATE,
						value: barData.country,
					});
				}}
			/>
		</div>
	);
}
