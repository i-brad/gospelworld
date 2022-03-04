import "../Styles/Music.css";
import MusicTable from "./MusicTable";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import MusicVideoOutlinedIcon from "@mui/icons-material/MusicVideoOutlined";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { SongsAction } from "../Redux/Actions/SongsAction";
import { Clear_SelectedAction } from "../Redux/Actions/SelectedAction";
import ArtistSection from "./ArtistSection";
import AlbumSection from "./AlbumSection";
import { Link, useLocation } from "react-router-dom";

function Music() {
  let dispatch = useDispatch();
  let songs = useSelector((state) => state.songs.songs);
  let selected = useSelector((state) => state.selected.selectedItems);
  let sort = () => {
    let opts = document.querySelector(".sort__opts");
    if (opts.classList.contains("show")) {
      opts.classList.remove("show");
      opts.classList.add("hide");
    } else {
      opts.classList.remove("hide");
      opts.classList.add("show");
    }
  };

  let path = useLocation();
  useEffect(() => {
    let hash = path.hash.replace("#", "");
    if (hash === "song") {
      setS(true);
      setAts(false);
      setAl(false);
    } else if (hash === "artists") {
      setS(false);
      setAts(true);
      setAl(false);
    } else if (hash === "albums") {
      setS(false);
      setAts(false);
      setAl(true);
    }
  }, [path]);

  let [s, setS] = useState(true);
  let [ats, setAts] = useState(false);
  let [al, setAl] = useState(false);

  const Os = () => {
    setS(true);
    setAts(false);
    setAl(false);

    let sortbtn = document.querySelector(".sortC");
    let avs = document.querySelector(".avs");
    let sel = document.querySelector(".as .s");

    sortbtn.style.display = "flex";
    avs.style.opacity = "1";
    sel.classList.remove("selected");
    document.querySelector(".pa").classList.remove("ready");
    dispatch(Clear_SelectedAction());
  };

  const Oas = () => {
    setAts(true);
    setAl(false);
    setS(false);

    let sortbtn = document.querySelector(".sortC");
    let avs = document.querySelector(".avs");
    let sel = document.querySelector(".as .s");

    sortbtn.style.display = "none";
    avs.style.opacity = "0";
    sel.classList.remove("selected");
    document.querySelector(".pa").classList.remove("ready");
    dispatch(Clear_SelectedAction());
  };

  const Oal = () => {
    setAl(true);
    setAts(false);
    setS(false);

    let sortbtn = document.querySelector(".sortC");
    let avs = document.querySelector(".avs");
    let sel = document.querySelector(".as .s");

    sortbtn.style.display = "none";
    avs.style.opacity = "0";
    sel.classList.remove("selected");
    document.querySelector(".pa").classList.remove("ready");
    dispatch(Clear_SelectedAction());
  };

  const sorting = async (by, dir = "asc") => {
    const q = query(collection(db, "songs"), orderBy(by, dir));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    dispatch(SongsAction(data));
  };

  return (
    <div className="music">
      <div className="music__sap">
        <ul>
          <li>
            <Link to="#song" className={s ? "bti active" : "bti"} onClick={Os}>
              <MusicNoteOutlinedIcon />
              Songs
            </Link>
          </li>
          <li>
            <Link
              to="#artists"
              className={ats ? "bti active" : "bti"}
              onClick={Oas}
            >
              <PeopleAltOutlinedIcon />
              Artists
            </Link>
          </li>
          <li>
            <Link
              to="#albums"
              className={al ? "bti active" : "bti"}
              onClick={Oal}
            >
              <AlbumOutlinedIcon />
              Albums
            </Link>
          </li>
        </ul>
        <ul className={selected.length > 0 ? "pa ready" : "pa"}>
          <li>
            <button className="bti">
              <FileDownloadOutlinedIcon />
              Download Selected
            </button>
          </li>
          <li>
            <button className="bti">
              <PlaylistAddOutlinedIcon />
              Add to Playlist
            </button>
          </li>
        </ul>
      </div>
      <ul className="sortC">
        <button onClick={sort} style={{ zIndex: "1" }} className="bti sort">
          <SortOutlinedIcon /> Sort
        </button>
        <ul className="sort__opts hide">
          <li>
            <button onClick={() => sorting("name")}>A-Z</button>
          </li>
          <li>
            <button onClick={() => sorting("name", "desc")}>Z-A</button>
          </li>
          <li>
            <button onClick={() => sorting("duration")}>Duration</button>
          </li>
          <li>
            <button onClick={() => sorting("size")}>Size</button>
          </li>
        </ul>
      </ul>
      <div className="as">
        <h5 className="avs">
          <MusicVideoOutlinedIcon />
          {songs.length} songs
        </h5>
        <h5 className={selected.length > 0 ? "s selected" : "s"}>
          <CheckBoxOutlinedIcon />
          {selected.length} selected
        </h5>
      </div>
      {s && (
        <>
          <MusicTable songs={songs} />

          <h5 className="hd">More songs coming soon</h5>
        </>
      )}
      {ats && <ArtistSection />}
      {al && <AlbumSection />}
    </div>
  );
}

export default Music;
