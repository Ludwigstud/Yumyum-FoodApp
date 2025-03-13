import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { fetchReceipt } from "../services/apiData";
import logo from "../assets/receiptLogo.png";

const ReceiptInfo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [receipt, setReceipt] = useState(null);
	const [imageLoaded, setImageLoaded] = useState(false);

	const { currentOrder } = useSelector((state) => state.order);
	const { items: cartItems } = useSelector((state) => state.cart);

	const orderId = currentOrder?.id;

	useEffect(() => {
		const getReceipt = async () => {
			if (!orderId) {
				setLoading(false);
				return;
			}

			try {
				const receiptData = await fetchReceipt(orderId);
				if (receiptData) {
					setReceipt(receiptData);
				}
			} finally {
				setLoading(false);
			}
		};

		getReceipt();
	}, [orderId]);

	useEffect(() => {
		const img = new Image();
		img.src = logo;
		img.onload = () => setImageLoaded(true);
	}, []);

	const handleNewOrder = () => {
		dispatch(clearCart());
		navigate("/menu");
	};

	const items = receipt?.items || cartItems;
	const totalValue =
		receipt?.orderValue || items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="flex flex-col h-full w-full items-center">
			{loading || !imageLoaded ? (
				<div className="flex h-full justify-center items-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
				</div>
			) : (
				<>
					<div className="w-[358px] bg-[#EEEEEE] flex flex-col items-center rounded-sm h-[630px]">
						<div className="w-full flex flex-col items-center">
							<img
								src={logo}
								alt="YYGS logo"
								className="w-[50px] mt-7"
							/>
							<h2 className="text-[24px] font-bold mt-4 tracking-widest text-[#353131]">KVITTO</h2>
							<h4 className="text-[12px] font-bold text-[#605858] tracking-widest mb-6">
								{orderId ? `#${orderId}` : ""}
							</h4>
						</div>

						<div className="flex-1 w-full px-8 overflow-y-auto no-scrollbar">
							{items.map((item) => (
								<div
									key={item.id}
									className="mb-4 text-[#353131]">
									<div className="flex items-baseline">
										<div className="flex-shrink-0 mr-2">
											<span className="font-medium">{item.name}</span>
										</div>
										<div className="flex-grow border-b border-dotted border-[#353131] mx-2"></div>
										<div className="flex-shrink-0 font-bold">{item.price * item.quantity} SEK</div>
									</div>
									<div className="text-xs text-gray-500 ml-1">{item.quantity} stycken</div>
								</div>
							))}
						</div>

						<div className="w-full px-8 mt-4 mb-6">
							<div className="border-t border-gray-400 pt-3 flex justify-between">
								<span className="font-bold text-[#353131]">TOTAL:</span>
								<span className="font-bold text-[#353131]">{totalValue} SEK</span>
							</div>
						</div>
					</div>

					<div className="mt-auto mb-4">
						<button
							onClick={handleNewOrder}
							className="w-[358px] h-[77px] bg-[#353131] text-white text-[24px] font-bold rounded-sm">
							GÖR EN NY BESTÄLLNING
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ReceiptInfo;
