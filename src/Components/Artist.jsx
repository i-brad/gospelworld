import "../Styles/Artists.css";
import { Link } from "react-router-dom";

function Artist({ data }) {
	let { name, songs, img } = data;
	return (
		<Link to={`/artists/${name}`} className="artist">
			<img src={img} alt={name} />
			<h4 className="artist__name">{name}</h4>
			<h5 className="artist__songs">{songs} songs</h5>
		</Link>
	);
}

export default Artist;
