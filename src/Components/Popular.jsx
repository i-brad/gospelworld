import Card from "./Card";
import "../Styles/Cards.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { TopAction } from "../Redux/Actions/LFTAction";

function Popular() {
  const ts = useSelector((state) => state.top.topSongs);
  let dispatch = useDispatch();
  useEffect(() => {
    if (ts.length === 0) {
      const fetchData = async () => {
        let q = query(collection(db, "songs"), where("top", "==", true));

        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        dispatch(TopAction(data));
      };

      fetchData();
    }
  }, [dispatch, ts]);
  return (
    <div className="songC">
      <h1>Popular Songs</h1>
      <div className="songs">
        {ts.length > 0
          ? ts.map((cd, id) => {
              return <Card key={id} data={cd} />;
            })
          : Array(10)
              .fill()
              .map((i, id) => {
                return (
                  <div className="card skeleton skeleton__card" key={id}></div>
                );
              })}
      </div>
      <Link to="/musics">Explore Musics For More Songs</Link>
    </div>
  );
}

export default Popular;
