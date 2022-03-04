import Related from "../Components/Related";
import Header from "../Components/Header";
import { useParams, useLocation } from "react-router-dom";
import "../Styles/Download.css";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function Thanks() {
  let param = useParams();
  let id = useLocation().search.split("=")[1];
  const [Lnk, setLnk] = useState("");

  useEffect(() => {
    if (id) {
      async function dwl() {
        const docRef = doc(db, "songs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLnk(docSnap.data().audio);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

        if (Lnk) {
          let dl = document.createElement("a");
          dl.download = docSnap.data().name;
          dl.href = docSnap.data().audio;
          if (dl.href) {
            dl.click();
          }
        }
      }
      dwl();
    }
  }, [id, Lnk]);

  return (
    <div className="thk">
      <h1>
        Thanks for downloading "<em>{param.song}</em>"
      </h1>
      <p>
        If your download hasn't started, click here{" "}
        <a href={Lnk ? `${Lnk}` : "/"} download>
          Download
        </a>
      </p>
    </div>
  );
}

function Download() {
  return (
    <div className="main">
      <Header />
      <Thanks />
      <Related />
    </div>
  );
}

export default Download;
