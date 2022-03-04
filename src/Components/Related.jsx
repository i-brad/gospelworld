import "../Styles/Cards.css";

function Related() {
	return (
		<div className="rlt">
			<h1>Others by Mercy Chinwo</h1>
			<div className="songs">
				{Array(5)
					.fill()
					.map((i, id) => {
						return (
							<div className="card skeleton skeleton__card" key={id}></div>
						);
					})}
			</div>
		</div>
	);
}

export default Related;
