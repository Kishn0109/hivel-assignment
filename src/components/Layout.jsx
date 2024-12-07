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
					width: "99vw",
					height: "80vh",
					overflowX: "auto",
					position: "relative",
				}}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
