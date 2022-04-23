import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./Components/Loader";
import SUI from "./Components/SUI";
import Player from "./Components/Player";
import { useSelector } from "react-redux";
import Video from "./Pages/Video";
import Navbar from "./Components/Navbar";

const Home = lazy(() => import("./Pages/Home"));
const Musics = lazy(() => import("./Pages/Musics"));
const Videos = lazy(() => import("./Pages/Videos"));
const Song = lazy(() => import("./Pages/Song"));
const Download = lazy(() => import("./Pages/Download"));
const Recent = lazy(() => import("./Pages/Recent"));
const Playlist = lazy(() => import("./Pages/Playlist"));
const Favourite = lazy(() => import("./Pages/Favourite"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Settings = lazy(() => import("./Pages/Settings"));
const Feedback = lazy(() => import("./Pages/Feedback"));
const Search = lazy(() => import("./Pages/Search"));

function App() {
	const playData = useSelector((state) => state.play.song);
	return (
		<div className="app">
			<Navbar />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route index element={<Home />} />
					<Route path="musics" element={<Musics />} />
					<Route path="/musics/:song" element={<Song />} />
					<Route path="videos" element={<Videos />} />
					<Route path="/videos/:video" element={<Video />} />
					<Route path="/download/:song" element={<Download />} />
					<Route path="/recent" element={<Recent />} />
					<Route path="/playlist" element={<Playlist />} />
					<Route path="/favourite" element={<Favourite />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/feedback" element={<Feedback />} />
					<Route path="/search" element={<Search />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
			{Object.keys(playData).length > 0 && <Player />}
			<SUI />
		</div>
	);
}

export default App;
