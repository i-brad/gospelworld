import Header from "../Components/Header";
import Favourites from "../Components/Favourites";

function RefinedFavourites() {
  return <Favourites pg={"Recent"} />;
}

function Recent() {
  return (
    <div className="main">
      <Header />
      <RefinedFavourites />
    </div>
  );
}

export default Recent;
