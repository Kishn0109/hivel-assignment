import React from "react";
import { Link } from "react-router-dom";

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "80vh",
		padding: "20px",
		textAlign: "center",
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	},
	title: {
		fontSize: "8rem",
		fontWeight: "bold",
		margin: "0",
		background: "linear-gradient(45deg, #2563eb, #7c3aed)",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
	},
	subtitle: {
		fontSize: "1.5rem",
		color: "#4B5563",
		marginTop: "1rem",
		marginBottom: "2rem",
	},
	text: {
		fontSize: "1.1rem",
		color: "#6B7280",
		maxWidth: "600px",
		marginBottom: "2rem",
	},
	button: {
		padding: "12px 24px",
		fontSize: "1rem",
		color: "white",
		backgroundColor: "#2563eb",
		border: "none",
		borderRadius: "8px",
		cursor: "pointer",
		textDecoration: "none",
		transition: "background-color 0.2s ease",
	},
	buttonHover: {
		backgroundColor: "#1d4ed8",
	},
};

const NotFound = () => {
	return (
		<div style={styles.container}>
			<h1 style={styles.title}>404</h1>
			<h2 style={styles.subtitle}>Page Not Found</h2>
			<p style={styles.text}>
				Oops! The page you're looking for doesn't exist or has been moved.
			</p>
			<Link
				to='/'
				style={styles.button}
				onMouseOver={(e) =>
					(e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
				}
				onMouseOut={(e) =>
					(e.target.style.backgroundColor = styles.button.backgroundColor)
				}>
				Return Home
			</Link>
		</div>
	);
};

export default NotFound;
