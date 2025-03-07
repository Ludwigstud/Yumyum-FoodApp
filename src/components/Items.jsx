import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Items = ({ item }) => {
	const dispatch = useDispatch();
	const handleAddToCart = () => {
		dispatch(addToCart(item));
		// Optional: Add notification that item was added
		console.log(`Added ${item.name} to cart`);
	};

	return (
		<div
			onClick={handleAddToCart}
			className="text-white text-[22px] font-bold h-[86px] w-fill p-1.5 flex flex-col 
                      justify-center border border-dotted border-gray-400 my-0.5
                      cursor-pointer hover:bg-[#706868] active:bg-[#807878] transition-colors">
			<div className="flex flex-row w-fill justify-between">
				<h1>{item.name}</h1> <p>{item.price} SEK</p>
			</div>
			<p className="font-[400] text-[14px]">
				{Array.isArray(item.ingredients) ? item.ingredients.join(", ") : item.ingredients}
			</p>
		</div>
	);
};

export default Items;
