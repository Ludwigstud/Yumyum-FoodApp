import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import Header from "../components/Header";
import boxtop from "../assets/boxtop.png";

const Estimated = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [imageLoaded, setImageLoaded] = useState(false);
	const { currentOrder } = useSelector((state) => state.order);

	useEffect(() => {
		const img = new Image();
		img.src = boxtop;
		img.onload = () => setImageLoaded(true);
	}, []);

	const getEta = () => {
		if (!currentOrder) {
			return "";
		}

		if (typeof currentOrder.eta === "string" && currentOrder.eta.includes("T")) {
			const timestamp = new Date(currentOrder.eta).getTime();
			return (5 + (timestamp % 10)).toString();
		}

		return "";
	};

	const displayEta = getEta();
	const displayOrderId = currentOrder?.id;

	const handleNewOrder = () => {
		dispatch(clearCart());
		navigate("/menu");
	};

	const handleViewReceipt = () => {
		navigate("/receipt");
	};

	return (
		<div className="bg-[#605858] h-full text-[#F4F3F1F0]">
			<Header />

			{!imageLoaded ? (
				<div className="flex h-full justify-center items-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center">
					<img
						src={boxtop}
						alt="Picture of a foodbox"
					/>
					<h1 className="text-[32px] w-[300px] text-center font-bold">DINA WONTONS TILLAGAS!</h1>
					<h2 className="text-[26px] font-medium">{displayEta ? `ETA ${displayEta} MIN` : ""}</h2>
					<h5 className="text-[15px] font-medium">{displayOrderId ? `#${displayOrderId}` : ""}</h5>
					<div className="flex flex-col mt-8">
						<button
							onClick={handleNewOrder}
							className="w-[358px] h-[77px] bg-[#353131] mb-2 text-[24px] font-bold rounded-sm">
							GÖR EN NY BESTÄLLNING
						</button>
						<button
							onClick={handleViewReceipt}
							className="w-[358px] h-[77px] border-2 mt-2 text-[24px] font-bold rounded-sm">
							SE KVITTO
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Estimated;
