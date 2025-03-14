import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { placeOrder } from "../redux/orderSlice";
import { getOrCreateTenant } from "../services/apiData";
import Header from "../components/Header";

const Order = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { items, total } = useSelector((state) => state.cart);

	const handleCheckout = async () => {
		const orderItems = items.map((item) => ({
			id: item.id,
			quantity: item.quantity,
			
		}));

		try {
			const tenantName = await getOrCreateTenant();

			dispatch(
				placeOrder({
					tenantName,
					items: orderItems.map((item) => item.id),
				}),
			);

			navigate("/estimated");
		} catch (error) {
			console.error("Failed to place order:", error);
		}
	};



	const handleRemoveItem = (id) => {
		dispatch(removeFromCart(id));
	};

	return (
		<div className="bg-[#EEEEEE] h-full flex flex-col">
			<Header />

			<div className="flex-1 flex flex-col w-full max-h-[740px] justify-center">
				{items.length === 0 ? (
					<div className="text-[#353131] text-center p-8 w-full">
						<p className="mb-4 ">Your cart is empty</p>
					</div>
				) : (
					<>
						<div className="flex-1 overflow-y-auto no-scrollbar w-full px-3">
							{items.map((item) => (
								<div
									key={item.id}
									className=" border-gray-500 p-3 mb-3 w-full text-[#353131] font-bold">
									<div className="flex items-baseline">
										<div className="flex-shrink-0 mr-2">
											<h3 className="text-xl text-[24px]">{item.name}</h3>
										</div>
										<div className="flex-grow border-b-2 border-dotted border-[#000000] mx-2"></div>
										<div className="flex-shrink-0 flex items-center gap-4">
											<span className="text-sm">{item.quantity}x</span>
											<span className="font-bold text-[24px]">
												{item.quantity * item.price} SEK
											</span>
											<button
												onClick={() => handleRemoveItem(item.id)}
												className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600">
												×
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-4 bg-opacity-30 p-4 rounded text-white w-full">
							<div className="flex justify-between items-center h-16 p-2 rounded-sm bg-[#C2C1C1]">
								<span className="text-xl font-bold text-[#353131]">TOTAL:</span>
								<span className="text-xl font-bold text-[#353131]">{total} SEK</span>
							</div>

							<button
								onClick={handleCheckout}
								className="w-full bg-[#353131] text-white h-16 rounded-sm p-0.5 font-bold text-lg mt-4">
								TAKE MY MONEY!
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Order;
