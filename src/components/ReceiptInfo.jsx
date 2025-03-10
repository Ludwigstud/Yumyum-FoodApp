import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import logo from "../assets/receiptLogo.png";

const ReceiptInfo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { currentOrder } = useSelector((state) => state.order);
	const { items } = useSelector((state) => state.cart);

	const orderId = currentOrder?.id || currentOrder?.orderId || "";

	const handleNewOrder = () => {
		dispatch(clearCart());
		navigate("/menu");
	};

	return (
		<div className="flex flex-col h-full w-full items-center ">
			<div className="w-[358px] bg-[#EEEEEE] flex flex-col items-center rounded-sm overflow-y-auto max-h-[630px] no-scrollbar">
				<img
					src={logo}
					alt="YYGS logo"
					className="w-[50px] mt-7"
				/>
				<h2 className="text-[24px] font-bold mt-4 tracking-widest text-[#353131]">KVITTO</h2>
				<h4 className="text-[12px] font-bold text-[#605858] tracking-widest">
					{orderId ? `#${orderId}` : ""}
				</h4>

				<div className="w-full px-8 mt-8 ">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex justify-between mb-4 text-[#353131]">
							<div className="flex flex-col">
								<span className="font-medium">{item.name}</span>
								<span className="text-xs text-gray-500">{item.quantity} stycken</span>
							</div>
							<div className="font-bold">{item.price * item.quantity} SEK</div>
						</div>
					))}

					<div className="border-t border-gray-400 pt-3 mt-4 flex justify-between mb-6">
						<span className="font-bold text-[#353131]">TOTAL:</span>
						<span className="font-bold text-[#353131]">
							{items.reduce((sum, item) => sum + item.price * item.quantity, 0)} SEK
						</span>
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
		</div>
	);
};

export default ReceiptInfo;
