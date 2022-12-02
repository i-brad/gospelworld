import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
import SUI from "./Components/SUI";
import { db } from "./firebase";
import Video from "./Pages/Video";
import { FeaturedAction } from "./Redux/Actions/LFTAction";
import { SongsAction } from "./Redux/Actions/SongsAction";

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
  let song = useSelector((state) => state.featured.featured);
  let songs = useSelector((state) => state.songs.songs);
  let dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(song).length === 0) {
      const fetchData = async () => {
        let q = query(collection(db, "songs"), where("featured", "==", true));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          dispatch(FeaturedAction({ id: doc.id, ...doc.data() }));
        });
      };

      fetchData();
    }

    async function fetchSongs() {
      if (songs.length === 0) {
        const q = query(collection(db, "songs"), orderBy("name"));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        dispatch(SongsAction(data));
      }
    }

    fetchSongs();
  }, [dispatch, song, songs]);
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
