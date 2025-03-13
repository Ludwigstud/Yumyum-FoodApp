import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const DipsContainer = ({ dips }) => {
	const dispatch = useDispatch();

	const handleAddDip = (dip) => {
		dispatch(addToCart(dip));
	};

	return (
		<div
			className="text-white hover:bg-[#706868] 
                    transition-colors rounded-md p-3 my-3 cursor-pointer 
                    border border-dotted border-gray-400 shadow-sm">
			<div className="flex justify-between items-center mb-3">
				<div className="flex items-center gap-2">
					<h1 className="text-[22px] font-bold">Dipsåser</h1>
					<span className="bg-green-500 text-xs px-2 py-0.5 rounded-full uppercase">dip</span>
				</div>
				<p className="text-[22px] font-bold">19 SEK</p>
			</div>

			<p className="text-gray-300 text-sm mb-3">Välj en eller flera dipsåser till dina wontons</p>

			<div className="grid grid-cols-2 gap-2">
				{dips.map((dip) => (
					<button
						key={dip.id}
						onClick={() => {
							handleAddDip(dip);
						}}
						className="bg-[#505050] hover:bg-[#606060] active:bg-[#707070] 
                                py-1.5 px-2 rounded text-sm flex justify-between items-center">
						<span>{dip.name}</span>
						<span className="ml-1 text-green-400">+</span>
					</button>
				))}
			</div>

			<div className="flex justify-end mt-3">
				<span className="text-xs text-gray-400">Klicka på en dipsås för att lägga till</span>
			</div>
		</div>
	);
};

export default DipsContainer;
