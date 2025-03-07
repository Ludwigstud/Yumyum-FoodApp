import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../redux/menuSlice";
import Header from "../components/Header";
import MenuItems from "../components/MenuItems";

const Menu = () => {
	return (
		<div className="bg-[#8ED8BF] h-full bg-[url(./assets/leafbg.png)] flex flex-col items-center">	
			<Header />
			<MenuItems />
			
		</div>
	);
};

export default Menu;
