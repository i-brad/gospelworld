import Header from "../Components/Header";
import Music from "../Components/Music";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { SongsAction } from "../Redux/Actions/SongsAction";
import { useDispatch, useSelector } from "react-redux";

function Musics() {
  let dispatch = useDispatch();
  let songs = useSelector((state) => state.songs.songs);

  useEffect(() => {
    async function fetchSongs() {
      if (Object.keys(songs).length === 0) {
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
  }, [dispatch, songs]);
  return (
    <div className="main">
      <Header />
      <Music />
    </div>
  );
}

export default Musics;
