import Artist from "./Artist";
import "../Styles/Artists.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Top_ArtistsAction } from "../Redux/Actions/LFTAction";

function Artists() {
  const arts = useSelector((state) => state.artists.topArtists);
  let dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(arts).length === 0) {
      const fetchData = async () => {
        let q = query(collection(db, "artists"), where("top", "==", true));

        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        dispatch(Top_ArtistsAction(data));
      };

      fetchData();
    }
  }, [dispatch, arts]);

  return (
    <div className="artists">
      <h1>Popular Artists</h1>
      <div className="slide">
        {Object.keys(arts).length > 0 ? (
          arts.map((a, id) => {
            return <Artist key={id} data={a} />;
          })
        ) : (
          <>
            {Array(10)
              .fill()
              .map((i, id) => {
                return (
                  <Link to="/" className="artist" key={id}>
                    <div className="skeleton skD"></div>
                    <div className="artist__name skeleton skeleton__text"></div>
                    <div className="artist__songs skeleton skeleton__text"></div>
                  </Link>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}

export default Artists;
