import { Link } from "react-router-dom";
import "../Styles/Home.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PlayAction } from "../Redux/Actions/PlayAction";

function Featured() {
	let dispatch = useDispatch();
	let { name, artist, img, id } = useSelector(
		(state) => state.featured.featured
	);
	let song = useSelector((state) => state.featured.featured);
	return (
		<div className={Object.keys(song).length > 0 ? "ftsC" : "ftsC skeleton"}>
			<div className="fts" style={{ background: `url(${img})` }}>
				<div>
					<h1 className="fts__name">{name}</h1>
					<h4 className="fts__artist">{artist}</h4>
					{name && (
						<span className="fts__links">
							<button onClick={() => dispatch(PlayAction(song))}>
								Play Now
							</button>
							<Link to={`/download/${name}?id=${id}`}>Download</Link>
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default Featured;
