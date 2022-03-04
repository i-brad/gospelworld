import Header from "../Components/Header";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { SearchAction } from "../Redux/Actions/SearchAction";
import "../Styles/Search.css";
import Cards from "../Components/Cards";
import Artist from "../Components/Artist";

function Search() {
	let results = useSelector((state) => state.search.searchData);
	let term = useSelector((state) => state.search.term);
	term = term.toLowerCase();

	let dispatch = useDispatch();

	useEffect(() => {
		async function getResult() {
			let songsRef = collection(db, "songs");
			let artistsRef = collection(db, "artists");

			let q1 = query(songsRef, where("name", "==", `${term}`));
			let q2 = query(artistsRef, where("name", "==", `${term}`));

			let data = [];
			let songs = [];
			let artists = [];
			const querySnapshot1 = await getDocs(q1);
			querySnapshot1.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				songs.push(doc.data());
			});

			const querySnapshot2 = await getDocs(q2);
			querySnapshot2.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				artists.push(doc.data());
			});

			data.push(songs, artists);
			dispatch(SearchAction(data));
		}
		getResult();
	}, [dispatch, term]);
	return (
		<div className="main">
			<Header />
			<div className="results">
				<h1>
					Results for <q style={{ textTransform: "capitalize" }}>{term}</q>
				</h1>
				{results[0].length > 0 && (
					<>
						<h2>Songs</h2> <Cards data={results[0]} />
					</>
				)}
				{results[1].length > 0 && (
					<div className="artists">
						<h2>Artists</h2>
						<div className="slide">
							{results[1].map((data, ind) => {
								return <Artist key={ind} data={data} />;
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Search;
