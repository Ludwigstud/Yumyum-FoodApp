import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../redux/menuSlice";

const Menu = () => {
	const dispatch = useDispatch();
	const { items, loading, error } = useSelector((state) => state.menu);

	useEffect(() => {
		dispatch(fetchMenu());
	}, [dispatch]);

	if (loading) return <div>Loading menu...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			{items.map((item) => (
				<div key={item.id}>
					<h2>{item.name}</h2>
					<p>{item.description}</p>
					<p>${item.price}</p>
				</div>
			))}
		</div>
	);
};

export default Menu;
