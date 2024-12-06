import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const Layout = () => {
	return (
		<div className='container'>
			<Breadcrumb />
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
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
