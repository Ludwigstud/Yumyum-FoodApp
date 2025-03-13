import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../redux/menuSlice";
import Items from "./Items";
import DipsContainer from "./DipsContainer";

const MenuItems = () => {
	const dispatch = useDispatch();
	const { items, loading, error } = useSelector((state) => state.menu);

	useEffect(() => {
		dispatch(fetchMenu());
	}, [dispatch]);

	if (loading) return <div className="text-white text-center p-4">Loading menu...</div>;
	if (error) return <div className="text-white text-center p-4">Error: {error}</div>;

	const wontons = items.filter((item) => item.type === "wonton");
	const dips = items.filter((item) => item.type === "dip");
	const drinks = items.filter((item) => item.type === "drink");

	return (
		<div className="bg-[#605858] h-[700px] rounded-sm">
			<h1 className="flex justify-start mx-5 mt-7 mb-4 text-4xl text-white font-bold">MENY</h1>
			<div className="w-[350px] overflow-y-auto h-[615px] no-scrollbar">
				{wontons.map((item) => (
					<Items
						key={item.id}
						item={item}
					/>
				))}

				{dips.length > 0 && <DipsContainer dips={dips} />}

				{drinks.map((item) => (
					<Items
						key={item.id}
						item={item}
					/>
				))}
			</div>
		</div>
	);
};

export default MenuItems;
