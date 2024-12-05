import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CityPopulation from "./components/CityPopulation";

function App() {
	return (
		<Provider store={store}>
			<CityPopulation />
		</Provider>
	);
}

export default App;
