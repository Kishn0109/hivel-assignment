import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCountriesQuery } from "../services/citiesApi";
import PopulationChart from "./PopulationChart";
import SkeletonLoader from "./SkeletonLoader";
import * as d3 from "d3";

const CountryPopulation = () => {
	const navigate = useNavigate();
	const { data: countries, isLoading } = useGetAllCountriesQuery();

	if (isLoading) {
		return <SkeletonLoader />;
	}
	const renderPopup = (d) => {
		return `
        <div style="position: relative">
        <div style="display: flex; justify-content: space-between;">
            <button 
                onclick="this.parentElement.parentElement.remove()" 
                style="position:absolute;right: 5px; top: 5px; border: none; background: none; cursor: pointer; font-size: 18px;padding-top:0px"
            >
                ×
            </button>
          </div>
          <a href="/country/${d.name}" >
            <h3 style="margin: 0 0 15px 0; padding-right: 20px">
            <strong>Name: </strong><br/>${d.country}</h3>
            <p style="margin: 0 0 15px 0; padding-right: 20px">
            <strong>Code: </strong><br/>${d.code}</p>

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
			<PopulationChart
				data={countries}
				label='Countries'
				renderPopup={renderPopup}
			/>
		</>
	);
};

export default CountryPopulation;
