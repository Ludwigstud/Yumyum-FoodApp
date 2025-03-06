import React from "react";
import { Provider } from "react-redux";
import AppRoutes from "./Route";
import { store } from "./redux/store";

const App = () => {
	return (
		<div className="appContainer">
			<Provider store={store}>
				<AppRoutes />
			</Provider>
		</div>
	);
};

export default App;
