import { Link } from "react-router-dom";
import "../Styles/Cards.css";
import { useDispatch } from "react-redux";
import { PlayAction } from "../Redux/Actions/PlayAction";

function Card({ data }) {
	let dispatch = useDispatch();
	let { img, name, artist, id } = data;
	return (
		<div className="card">
			<img src={img} alt={name} />
			<h3 className="song__name">{name}</h3>
			<h5 className="artist__nameS">{artist}</h5>
			<span className="card__links">
				<button onClick={() => dispatch(PlayAction(data))}>Play</button>
				<Link to={`/download/${name}?id=${id}`}>Download</Link>
			</span>
		</div>
	);
}

export default Card;
