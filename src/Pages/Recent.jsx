import Header from "../Components/Header";
import Favourites from "../Components/Favourites";
import { useSelector } from "react-redux";

function RefinedFavourites() {
  return <Favourites pg={"Recent"} />;
}

function Recent() {
  const { Logged } = useSelector((state) => state.signReducer);

  return (
    <div className="main">
      <Header />
      {Logged ? (
        <>
          <RefinedFavourites />
        </>
      ) : (
        <p
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: "10px",
            opacity: "0.7",
          }}
        >
          You must be logged in to see your recently played songs and video.
        </p>
      )}
    </div>
  );
}

export default Recent;
