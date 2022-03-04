import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import Default from "../Assets/featured.jpg";

function FavouriteCard({ data }) {
	return (
		<div className="album__line">
			<input type="checkbox" className="ln" />
			<img src={Default} alt="" />
			<span className="album__dts">
				<h2>Excess Love</h2>
				<h4>Mercy Chinwo</h4>
			</span>
			<span className="album__icons">
				<PlayArrowOutlinedIcon />
				<FileDownloadOutlinedIcon />
				<AddIcon />
			</span>
		</div>
	);
}

export default FavouriteCard;
