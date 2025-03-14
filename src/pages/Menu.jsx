import React from "react";
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
