import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCityPopulationMutation } from "../services/citiesApi";
import PopulationChart from "./PopulationChart";
import SkeletonLoader from "./SkeletonLoader";
import * as d3 from "d3";

export default function StatePopulation() {
	const { country } = useParams();
	const navigate = useNavigate();
	const [getState, { data, error, isLoading }] = useGetCityPopulationMutation();

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

	if (error?.status === 404) {
		return <>Data not found</>;
	}
	const renderPopup = (d) => {
		return `
        <div style="position: relative">
          <button 
              onclick="this.parentElement.parentElement.remove()" 
              style="position: absolute; right: 5px; top: 5px; border: none; background: none; cursor: pointer; font-size: 18px;padding-top:0px "
          >
              ×
          </button>
          <a href="/country/${country}/city/${d.name}" >
          <h3 style="margin: 0 0 15px 0; padding-right: 20px">
            <strong>Name: </strong><br/>${d.country}</h3>
            <div style="margin-bottom: 10px">
                <strong>Population:</strong><br/> ${d3.format(",.0f")(
									d.totalPopulation
								)}
            </div>
          </a>
        </div>
      `;
	};

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
					renderPopup={renderPopup}
				/>
			)}
		</>
	);
}
