import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
const modernBreadcrumbStyles = {
	container: {
		display: "flex",
		alignItems: "center",
		padding: "12px 20px",
		listStyle: "none",
		backgroundColor: "#ffffff",
		borderRadius: "8px",
		margin: "0",
		boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	},
	item: {
		display: "flex",
		alignItems: "center",
		fontSize: "14px",
		transition: "color 0.2s ease",
		cursor: "pointer",
	},
	activeItem: {
		color: "#111827",
		fontWeight: "600",
	},
	separator: {
		margin: "0 12px",
		color: "#D1D5DB",
		fontSize: "16px",
	},
};
const Breadcrumb = () => {
	const { country, city } = useParams();
	const navigate = useNavigate();
	return (
		<nav style={modernBreadcrumbStyles.container}>
			<Link
				to='/'
				style={{
					...modernBreadcrumbStyles.item,
				}}>
				Countries
			</Link>

			{country && (
				<>
					<span style={modernBreadcrumbStyles.separator}>/</span>
					<Link
						to={`/country/${country}`}
						style={{
							...modernBreadcrumbStyles.item,
						}}>
						{country}
					</Link>
				</>
			)}

			{city && (
				<>
					<span style={modernBreadcrumbStyles.separator}>/</span>
					<span
						style={{
							...modernBreadcrumbStyles.item,
							...modernBreadcrumbStyles.activeItem,
						}}>
						{city}
					</span>
				</>
			)}
		</nav>
	);
};

export default Breadcrumb;
