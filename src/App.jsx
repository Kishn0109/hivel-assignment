import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import CountryPopulation from "./components/CountryPopulation";
import StatePopulation from "./components/StatePopulation";
import CityPopulation from "./components/CityPopulation";
import Layout from "./components/Layout";
import "./App.css";
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className='container'>
					<Routes>
						<Route element={<Layout />}>
							<Route path='/' element={<CountryPopulation />} />
							<Route path='/country/:country' element={<StatePopulation />} />
							<Route
								path='/country/:country/city/:city'
								element={<CityPopulation />}
							/>
						</Route>
					</Routes>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
