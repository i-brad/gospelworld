import Header from "../Components/Header";
import Latest from "../Components/Latest";
import Popular from "../Components/Popular";
import Artists from "../Components/Artists";
import "../Styles/Home.css";
import Featured from "../Components/Featured";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { FeaturedAction } from "../Redux/Actions/LFTAction";

function Home() {
  let song = useSelector((state) => state.featured.featured);
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
  }, [dispatch, song]);

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
