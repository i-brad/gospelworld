import Youtube from "react-youtube";
import Header from "../Components/Header";
import VideoCard from "../Components/VideoCard";
import { useLocation } from "react-router-dom";
import "../Styles/Videos.css";

function Single() {
  let id = useLocation().search.split("=")[1];
  return (
    <div>
      {id ? (
        <Youtube
          videoId={id}
          className="yt skeleton"
          opts={{
            playerVars: {
              autoplay: 1,
            },
          }}
          onReady={(e) => {
            e.target.h.classList.remove("skeleton");
          }}
        />
      ) : (
        <div className="yt skeleton"></div>
      )}
      <>
        <h1 className="hdV">Related</h1>
        <div className="videos">
          {Array(8)
            .fill()
            .map((i, id) => {
              return <VideoCard key={id} />;
            })}
        </div>
      </>
    </div>
  );
}

function Video() {
  return (
    <div className="main">
      <Header />
      <Single />
    </div>
  );
}

export default Video;
