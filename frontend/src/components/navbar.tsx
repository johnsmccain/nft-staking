import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="container mx-auto">
			<div className="">
				<span className="text-3xl font-bold">Nft stacking Pool</span>
			</div>
			<div className="">
				<Link to="/">Home</Link>
				<Link to="/create">Create NFT</Link>
			</div>
		</div>
	);
};
