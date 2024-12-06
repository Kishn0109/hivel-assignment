import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PopulationChart from "./PopulationChart";
import { useGetSingleCityPopulationMutation } from "../services/citiesApi";

const CityPopulation = () => {
	const { country, city } = useParams();
	const [getCityData, { data: cities, isLoading, error }] =
		useGetSingleCityPopulationMutation();
	console.log(country, city, "afjaskdjfads");
	useEffect(() => {
		const fetchCityData = async () => {
			try {
				await getCityData(city); // Assuming we want to fetch data for the state name
			} catch (err) {
				console.error("Failed to fetch city data:", err);
			}
		};

		fetchCityData();
	}, [city, getCityData]);
	if (error) {
		return <div>Error loading cities</div>;
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
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<PopulationChart
					data={cities}
					onBarClick={(barData) => {
						console.log("City clicked:", barData.name);
					}}
					label='Cities'
				/>
			)}
		</div>
	);
};

export default CityPopulation;
