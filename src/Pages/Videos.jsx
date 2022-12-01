import Header from "../Components/Header";
import VideoCard from "../Components/VideoCard";
import "../Styles/Videos.css";

function Vc() {
  return (
    <>
      <h1 className="hdV">Videos</h1>
      <div className="videos">
        {Array(9)
          .fill()
          .map((i, id) => {
            return <VideoCard key={id} />;
          })}
      </div>
    </>
  );
}

//awexlghI7gM

function Videos() {
  return (
    <div className="main">
      <Header />
      <Vc />
    </div>
  );
}

export default Videos;
