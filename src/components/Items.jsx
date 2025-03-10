import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Items = ({ item }) => {
	const dispatch = useDispatch();
	const handleAddToCart = () => {
		dispatch(addToCart(item));
	};

	const getBadgeColor = (type) => {
		switch (type) {
			case "wonton":
				return "bg-orange-500";
			case "dip":
				return "bg-green-500";
			case "drink":
				return "bg-blue-500";
			default:
				return "bg-gray-500";
		}
	};

	return (
		<div
			onClick={handleAddToCart}
			className="text-white  hover:bg-[#706868] active:bg-[#807878] 
                     transition-colors rounded-md p-3  cursor-pointer 
                     border border-dotted border-gray-400 shadow-sm">
			<div className="flex justify-between items-center mb-1">
				<div className="flex items-center gap-2">
					<h1 className="text-[22px] font-bold">{item.name}</h1>
					<span
						className={`${getBadgeColor(item.type)} text-xs px-2 py-0.5 rounded-full uppercase`}>
						{item.type}
					</span>
				</div>
				<p className="text-[22px] font-bold">{item.price} SEK</p>
			</div>

			{item.description && (item.type === "drink" || item.description.indexOf("Lorem ipsum") === -1) && (
                <p className="text-gray-300 text-sm mb-1">{item.description}</p>
            )}

			{Array.isArray(item.ingredients) && item.ingredients.length > 0 && (
				<p className="font-[400] text-[14px] text-gray-200">
					<span className="text-xs text-gray-400">Innehåller: </span>
					{item.ingredients.join(", ")}
				</p>
			)}

			<div className="flex justify-end mt-1">
				<span className="text-xs text-gray-400">Klicka för att lägga till +</span>
			</div>
		</div>
	);
};

export default Items;
