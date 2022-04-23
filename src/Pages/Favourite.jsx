import Header from "../Components/Header";
import Favourites from "../Components/Favourites";
import { useSelector } from "react-redux";

function RefinedFavourites() {
  return <Favourites pg={"Favorite"} />;
}

function Favourite() {
  const { Logged } = useSelector((state) => state.signReducer);
  return (
    <div className="main">
      <Header />
      {Logged ? (
        <RefinedFavourites />
      ) : (
        <p
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: "10px",
            opacity: "0.7",
            fontSize: ".8rem",
          }}
        >
          You must be logged in to see your faourite songs and video.
        </p>
      )}
    </div>
  );
}

export default Favourite;
