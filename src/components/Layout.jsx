import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const Layout = () => {
	return (
		<div className='container'>
			<div style={{ width: "100%" }}>
				<Breadcrumb />
			</div>
			<div
				style={{
					position: "relative",
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
