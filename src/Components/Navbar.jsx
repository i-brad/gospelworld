import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { useSelector } from "react-redux";

import "../Styles/Navbar.css";
import Logo from "../Assets/gospelworld.png";

function Navbar() {
  const playData = useSelector((state) => state.play.song);
  let menu = () => {
    let app = document.querySelector(".app");
    let player = "";
    if (Object.keys(playData).length > 0) {
      player = document.querySelector(".playerC");
    }
    if (app.classList.contains("closed")) {
      app.classList.remove("closed");
      if (Object.keys(playData).length > 0) {
        player.classList.remove("closed");
      }
    } else {
      app.classList.add("closed");
      if (Object.keys(playData).length > 0) {
        player.classList.add("closed");
      }
    }
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar__lohu">
          <button onClick={menu}>
            <MenuIcon className="nav__icon" />
          </button>
          <img src={Logo} alt="logo" className="navbar__logo" />
        </div>
        <ul>
          <li>
            <NavLink to="/" activeclassname="active">
              <HomeIcon className="nav__icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/musics">
              <HeadphonesOutlinedIcon className="nav__icon" />
              Musics
            </NavLink>
          </li>
          <li>
            <NavLink to="/videos">
              <VideoLibraryOutlinedIcon className="nav__icon" />
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink to="/recent">
              <HistoryOutlinedIcon className="nav__icon" />
              Recent
            </NavLink>
          </li>
          <li>
            <NavLink to="/playlist">
              <QueueMusicOutlinedIcon className="nav__icon" />
              PlayList
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourite">
              <FavoriteBorderOutlinedIcon className="nav__icon" />
              Favourite
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/settings">
              <SettingsOutlinedIcon className="nav__icon" />
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback">
              <FeedbackOutlinedIcon className="nav__icon" />
              Send feedback
            </NavLink>
          </li>
        </ul>
        <ul></ul>
      </nav>
    </>
  );
}

export default Navbar;
