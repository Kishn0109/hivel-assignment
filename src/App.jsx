import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import CountryPopulation from "./components/CountryPopulation";
import StatePopulation from "./components/StatePopulation";
import Breadcrumb from "./components/Breadcrumb";
import CityPopulation from "./components/CityPopulation";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className='container'>
					<Breadcrumb />
					<Routes>
						<Route path='/' element={<CountryPopulation />} />
						<Route path='/country/:country' element={<StatePopulation />} />
						<Route
							path='/country/:country/state/:state'
							element={<CityPopulation />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

// [{name:country,value:""},{name:""}]
