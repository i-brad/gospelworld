import FavouriteCard from "./FavouriteCard";
import "../Styles/Cards.css";
import "../Styles/Album.css";

function Favourites({ pg }) {
	return (
		<div style={{ marginTop: "20px" }}>
			<div className="single__album">
				<h1>{pg} Songs</h1>
				<div className="line">
					{
						<>
							<FavouriteCard />
							<FavouriteCard />
							<FavouriteCard />

							<FavouriteCard />
							<FavouriteCard />
							<FavouriteCard />

							<FavouriteCard />
							<FavouriteCard />
						</>
					}
				</div>
			</div>
			<div className="rlt">
				<h1>{pg} Videos</h1>
				<div className="songs">
					{Array(5)
						.fill()
						.map((i, id) => {
							return (
								<div className="card skeleton skeleton__card" key={id}></div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default Favourites;
