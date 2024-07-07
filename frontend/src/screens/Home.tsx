import { useState } from "react";
import { Card } from "../components/card";
import { Switch } from "../components/switch";

export const Home = () => {
	const [isSwitch, setIsSwitch] = useState(false);
	return (
		<div>
			<div className="">
				<div className="">
					<h1 className="text-xl font-bold ">My NFTs</h1>
				</div>
				<div className="flex justify-between">
					<span className="">Current Block 1232342</span>
					<div className="">
						<Switch isSwitch={isSwitch} setIsSwitch={setIsSwitch} />
					</div>
				</div>
			</div>
			<div className="flex flex-wrap mx-auto justify-center">
				{Array(10)
					.fill(0)
					.map(() => (
						<Card />
					))}
			</div>
		</div>
	);
};
