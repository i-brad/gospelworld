import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";
import Default from "../Assets/featured.jpg";

function VideoCard() {
  return (
    <Link to={`/videos/excess love?id=awexlghI7gM`} className="video">
      <div className="vd">
        <PlayArrowIcon className="pyIcon" />
        <img src={Default} alt="" />
      </div>
      <h4 className="song__name">Suddenly</h4>
      <h5 className="artist__name">Mercy Chinwo</h5>
    </Link>
  );
}

export default VideoCard;
