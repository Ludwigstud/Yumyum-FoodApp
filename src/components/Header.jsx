import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import menuY from "./../assets/YYGS.svg";
import menuCart from "./../assets/cart.svg";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { items } = useSelector((state) => state.cart);
	const itemCount = items.reduce((total, item) => total + item.quantity, 0);

	const isOrderPage = location.pathname === "/order";
	const isEstimatedOrReceiptPage =
		location.pathname === "/estimated" || location.pathname === "/receipt";

	const handleCartClick = () => {
		navigate("/order");
	};

	return (
		<div className="flex w-full justify-between p-5 place-items-center">
			{!isOrderPage && (
				<img
					src={menuY}
					alt="YYGS"
				/>
			)}

			{!isEstimatedOrReceiptPage && (
				<div
					className={`relative ${isOrderPage ? "ml-auto" : ""} cursor-pointer`}
					onClick={handleCartClick}>
					<img
						src={menuCart}
						alt="Cart image"
						className="bg-white w-16 h-16 p-3.5 rounded-sm"
					/>
					{itemCount > 0 && (
						<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
							{itemCount}
						</div>
					)}
				</div>
			)}

			{isEstimatedOrReceiptPage && <div></div>}
		</div>
	);
};

export default Header;
