import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../redux/menuSlice";
import Items from "./Items";

const MenuItems = () => {
	const dispatch = useDispatch();
	const { items, loading, error } = useSelector((state) => state.menu);

	useEffect(() => {
		dispatch(fetchMenu());
	}, [dispatch]);

	if (loading) return <div className="text-white text-center p-4">Loading menu...</div>;
	if (error) return <div className="text-white text-center p-4">Error: {error}</div>;

	return (
		<div className=" bg-[#605858] h-[700px] rounded-sm ">
		<h1 className=" flex justify-start mx-5 mt-7 mb-4 text-4xl text-white font-bold">MENY</h1>
			<div className="w-[380px]   overflow-y-auto h-[615px] no-scrollbar">
				{items.map((item) => (
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
