import Artist from "./Artist";
import "../Styles/Artists.css";
import { Link } from "react-router-dom";

function MusicArtists({ ats = "A", data = [] }) {
  return (
    <div className="artists">
      <h1 style={{ textTransform: "capitalize" }}>{ats}</h1>
      <div className="slide">
        {Object.keys(data).length > 0
          ? data.artists.map((it, ind) => {
              return <Artist key={ind} data={it} />;
            })
          : Array(10)
              .fill()
              .map((i, id) => {
                return (
                  <Link to="/musics" className="artist" key={id}>
                    <div className="skeleton skD"></div>
                    <div className="artist__name skeleton skeleton__text"></div>
                    <div className="artist__songs skeleton skeleton__text"></div>
                  </Link>
                );
              })}
      </div>
    </div>
  );
}

export default MusicArtists;
