import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCityPopulationMutation } from "../services/citiesApi";
import PopulationChart from "./PopulationChart";

export default function StatePopulation() {
	const { country } = useParams();
	const navigate = useNavigate();
	const [getState, { data, status, isLoading }] =
		useGetCityPopulationMutation();

	const fetchStates = async () => {
		try {
			await getState({ country });
		} catch (error) {
			console.error("Failed to fetch states:", error);
		}
	};

	useEffect(() => {
		fetchStates();
	}, [country]);

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
					navigate(`/country/${country}/state/${barData.name}`);
				}}
			/>
		</div>
	);
}
