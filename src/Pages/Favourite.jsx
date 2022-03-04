import Header from "../Components/Header";
import Favourites from "../Components/Favourites";

function RefinedFavourites() {
  return <Favourites pg={"Favorite"} />;
}

function Favourite() {
  return (
    <div className="main">
      <Header />
      <RefinedFavourites />
    </div>
  );
}

export default Favourite;
