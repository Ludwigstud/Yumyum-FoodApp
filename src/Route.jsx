import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Estimated from "./pages/Estimated";
import Receipt from "./pages/Receipt";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/menu" />}
				/>
				<Route
					path="/menu"
					element={<Menu />}
				/>
				<Route
					path="/order"
					element={<Order />}
				/>
				<Route
					path="/estimated"
					element={<Estimated />}
				/>
				<Route
					path="/receipt"
					element={<Receipt />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
