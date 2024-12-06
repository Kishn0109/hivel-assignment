import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
	const { country, state, city } = useParams();
	const navigate = useNavigate();

	return (
		<div className='breadcrumb'>
			<Link to='/' className='breadcrumb-item'>
				Countries
			</Link>

			{country && (
				<>
					<span className='separator'>/</span>
					<Link to={`/country/${country}`} className='breadcrumb-item'>
						{country}
					</Link>
				</>
			)}

			{state && (
				<>
					<span className='separator'>/</span>
					<Link
						to={`/country/${country}/state/${state}`}
						className='breadcrumb-item'>
						{state}
					</Link>
				</>
			)}

			{city && (
				<>
					<span className='separator'>/</span>
					<span className='breadcrumb-item active'>{city}</span>
				</>
			)}
		</div>
	);
};

export default Breadcrumb;
