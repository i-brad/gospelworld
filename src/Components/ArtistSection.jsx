import MusicArtists from "./MusicArtists";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  ArtistsAction,
  RefinedArtistsAction,
} from "../Redux/Actions/LFTAction";

function ArtistSection() {
  const arts = useSelector((state) => state.artists.artists);
  let default_artists = ["A", "B", "C", "D"];

  const Artists = useSelector((state) => state.artists.refined);
  let dispatch = useDispatch();
  useEffect(() => {
    if (arts.length === 0) {
      async function getArtists() {
        let ref = collection(db, "artists");

        let q = query(ref, orderBy("name"));

        let querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        shuffle(data);
        dispatch(ArtistsAction(data));
      }

      getArtists();

      let pack = [];
      let letters = [];
      function shuffle(data) {
        if (data.length > 0) {
          data.forEach((item) => {
            let first_letter = item.name.split("")[0];

            if (pack.length > 0) {
              for (let i = 0; i < pack.length; i++) {
                if (pack[i].tag === first_letter) {
                  pack[i].artists = [...pack[i].artists, item];
                  break;
                } else if (i === pack.length - 1) {
                  letters.push(first_letter);
                  pack.push({ tag: first_letter, artists: [item] });
                  break;
                }
              }
            } else {
              letters.push(first_letter);
              pack.push({ tag: first_letter, artists: [item] });
            }
          });
          dispatch(RefinedArtistsAction(pack));
        }
      }
    }
  }, [dispatch, arts]);

  return (
    <div>
      {Artists.length > 0
        ? Artists.map((ats, index) => {
            return <MusicArtists key={index} ats={ats.tag} data={ats} />;
          })
        : default_artists.map((ats, index) => {
            return <MusicArtists key={index} ats={ats} />;
          })}
    </div>
  );
}

export default ArtistSection;
