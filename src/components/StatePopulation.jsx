import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCityPopulationMutation } from "../services/citiesApi";
import PopulationChart from "./PopulationChart";
import SkeletonLoader from "./SkeletonLoader";

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

	return (
		<>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<PopulationChart
					data={data}
					label='Cities'
					onBarClick={(barData) => {
						navigate(`/country/${country}/city/${barData.name}`);
					}}
				/>
			)}
		</>
	);
}
