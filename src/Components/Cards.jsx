import Card from "./Card";
import "../Styles/Cards.css";

function Cards({ data = [] }) {
	return (
		<div className="cards">
			{data.length > 0 &&
				data.map((cd, id) => {
					return <Card key={id} data={cd} />;
				})}
		</div>
	);
}

export default Cards;
