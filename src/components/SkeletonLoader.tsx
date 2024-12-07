import React from "react";
const SkeletonLoader = () => {
	return (
		<div
			className='chart-container'
			style={{ height: "600px", display: "flex", position: "relative" }}>
			<div
				style={{
					height: "90%",
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "space-between",
					gap: "12px",
					paddingBottom: "40px",
					flex: 1,
				}}>
				{[...Array(31)].map((_, i) => (
					<div
						key={i}
						style={{
							width: "40px",
							height: `${Math.random() * 70 + 30}%`,
							backgroundColor: "#e0e0e0",
							borderRadius: "4px 4px 0 0",
							animation: "pulse 1.5s infinite ease-in-out",
						}}
					/>
				))}
			</div>

			<style>
				{`
          @keyframes pulse {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.4;
            }
            100% {
              opacity: 1;
            }
          }
        `}
			</style>
		</div>
	);
};
export default SkeletonLoader;
