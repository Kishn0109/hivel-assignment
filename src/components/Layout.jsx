import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const Layout = () => {
	return (
		<div className='container'>
			<Breadcrumb />
			<Outlet />
		</div>
	);
};

export default Layout;
