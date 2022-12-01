import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TermAction } from "../Redux/Actions/SearchAction";
import "../Styles/Header.css";

import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  let [term, setTerm] = useState("");
  let [OpenNotify, setOpenNotify] = useState(false);
  let [searchState, setSearchState] = useState(false);
  let push = useNavigate();
  const user = useSelector((state) => state.signReducer);
  let dispatch = useDispatch();
  const open = () => {
    document.querySelector(".sc").style.display = "flex";
  };
  const playData = useSelector((state) => state.play.song);

  let pv = (e) => {
    //let int = document.querySelector(".int").value;
    e.preventDefault();
  };
  let handle = (e) => {
    setTerm(e.target.value);
  };
  let search = () => {
    dispatch(TermAction(term));
    push(`/search?t=${term}`);
  };

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

  let notify = () => {
    setOpenNotify(!OpenNotify);
  };

  let searchHandle = () => {
    setSearchState(!searchState);
  };

  return (
    <header>
      <nav className="header__nav">
        <button onClick={menu}>
          <MenuIcon className="nav__icon" />
        </button>
        <form
          action=""
          className={`header__search ${searchState ? "mobile__active" : ""}`}
          onSubmit={(e) => pv(e)}
        >
          <input
            type="search"
            name="search"
            placeholder="Search for your favourite songs"
            className="int"
            onFocus={() => {
              document.querySelector(".header__search").classList.add("active");
              document
                .querySelector(".header__search svg")
                .classList.add("s__active");
            }}
            onBlur={() => {
              document
                .querySelector(".header__search")
                .classList.remove("active");
              document
                .querySelector(".header__search svg")
                .classList.remove("s__active");
            }}
            onChange={handle}
            onKeyPress={(e) => {
              if (e.code === "Enter") {
                search();
              }
            }}
            autoComplete="off"
          />
          <SearchIcon onSubmit={search} />
        </form>
        {OpenNotify && <div className="header__notifications"></div>}
        <div className="header__spC">
          <span
            className="header__searchBtn"
            style={{ cursor: "pointer" }}
            onClick={searchHandle}
          >
            <SearchIcon />
          </span>
          <span className="header__notify" onClick={notify}>
            <NotificationsOutlinedIcon className="header__icon" />
            {/* <span></span> */}
          </span>
          <span
            className="header__sp"
            onClick={open}
            style={{ cursor: "pointer" }}
          >
            <AccountCircleOutlinedIcon className="header__icon" />
            {user?.user?.username && (
              <p>
                <strong>{user?.user?.username.split(" ")[0]}</strong>
              </p>
            )}
          </span>
        </div>
      </nav>
      {/* {path === "/musics" && (
        <div className="header__list">
          <ul>
            <li>
              <NavLink to="/musics" activeclassname="active">
                All
              </NavLink>
            </li>
            <li>
              <NavLink to="/">Benin</NavLink>
            </li>
            <li>
              <NavLink to="/">Igbo</NavLink>
            </li>
            <li>
              <NavLink to="/">Orobo</NavLink>
            </li>
            <li>
              <NavLink to="/">Esan</NavLink>
            </li>
            <li>
              <NavLink to="/">English</NavLink>
            </li>
            <li>
              <NavLink to="/">Mixed</NavLink>
            </li>
            <li>
              <NavLink to="/">Praise</NavLink>
            </li>
            <li>
              <NavLink to="/">Worship</NavLink>
            </li>
            <li>
              <NavLink to="/">Highlife</NavLink>
            </li>
            <li>
              <NavLink to="/">Traditional</NavLink>
            </li>
            <li>
              <NavLink to="/">Ancient</NavLink>
            </li>
            <li>
              <NavLink to="/">GUC</NavLink>
            </li>
            <li>
              <NavLink to="/">Mercy Chinwo</NavLink>
            </li>
            <li>
              <NavLink to="/">Hezekiel</NavLink>
            </li>
            <li>
              <NavLink to="/">Steve Crown</NavLink>
            </li>
          </ul>
        </div>
      )} */}
    </header>
  );
}

export default Header;
