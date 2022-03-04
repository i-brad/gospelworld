import Cards from "./Cards";
import "../Styles/Cards.css";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { LatestAction } from "../Redux/Actions/LFTAction";

function Latest() {
	const lts = useSelector((state) => state.latest.latest);
	let dispatch = useDispatch();
	useEffect(() => {
		if (lts.length === 0) {
			const fetchData = async () => {
				let q = query(
					collection(db, "songs"),
					orderBy("name"),
					where("latest", "==", true)
				);

				const querySnapshot = await getDocs(q);
				let data = [];
				querySnapshot.forEach((doc) => {
					data.push({ id: doc.id, ...doc.data() });
				});
				dispatch(LatestAction(data));
			};

			fetchData();
		}
	}, [dispatch, lts]);

	return (
		<div className="latest">
			<h1>Latest Songs</h1>
			{lts.length > 0 ? (
				<Cards data={lts} />
			) : (
				<div className="cards">
					{Array(6)
						.fill()
						.map((i, id) => {
							return (
								<div className="card skeleton skeleton__card" key={id}></div>
							);
						})}
				</div>
			)}
		</div>
	);
}

export default Latest;
