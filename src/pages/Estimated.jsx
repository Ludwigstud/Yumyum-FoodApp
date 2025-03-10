import React from "react";
import Header from "../components/Header";
import boxtop from "../assets/boxtop.png";

const Estimated = () => {
	return (
		<div className="bg-[#605858] h-full text-[#F4F3F1F0]">
			<Header />
			<div className="flex flex-col justify-center items-center">
				<img
					src={boxtop}
					alt="Picture of a foodbox"
				/>
				<h1 className="text-[32px] w-[300px] text-center font-bold">DINA WONTONS TILLAGAS!</h1>
				<h2 className="text-[26px] font-medium">ETA 5 MIN</h2>
				<h5 className="text-[15px] font-medium">#4KJWSDF234K</h5>
				<div className="flex flex-col mt-8">
					<button className=" w-[358px] h-[77px] bg-[#353131] mb-2 text-[24px] font-bold rounded-sm">
						GÖR EN NY BESTÄLLNING
					</button>
					<button className="w-[358px] h-[77px] border-2 mt-2 text-[24px] font-bold rounded-sm">
						SE KVITTO
					</button>
				</div>
			</div>
		</div>
	);
};

export default Estimated;
