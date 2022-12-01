import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Artists from "../Components/Artists";
import Featured from "../Components/Featured";
import Header from "../Components/Header";
import Latest from "../Components/Latest";
import Popular from "../Components/Popular";
import { db } from "../firebase";
import { FeaturedAction } from "../Redux/Actions/LFTAction";
import { SongsAction } from "../Redux/Actions/SongsAction";
import "../Styles/Home.css";

function Home() {
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
    <div className="main">
      <Header />
      <Featured />
      <Artists />
      <Latest />
      <Popular />
    </div>
  );
}

export default Home;
