import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CountryPopulation from "./components/CountryPopulation";
import { STAGE } from "./constant";
import StatePopulation from "./components/StatePopulation";
function App() {
	const [stage, setStage] = useState({
		name: STAGE.COUNTRY,
		value: "",
	});
	return (
		<Provider store={store}>
			{stage.name === STAGE.COUNTRY ? (
				<CountryPopulation setStage={setStage} />
			) : (
				<StatePopulation value={stage.value} />
			)}
		</Provider>
	);
}

export default App;
