import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useDispatch } from "react-redux";
import { PlayAction } from "../Redux/Actions/PlayAction";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux";

function Player() {
  let dispatch = useDispatch();
  const playData = useSelector((state) => state.play.song);
  const { id: idS, audio: audioSrc, name, size, artist, img } = playData;
  let [id, setId] = useState(idS);

  let play = () => {
    let loader = document.getElementById("player__loader");
    let playBtn = document.getElementById("play");
    let pauseBtn = document.getElementById("pause");

    playBtn.classList.remove("pp");
    pauseBtn.classList.add("pp");
    loader.style.display = "flex";

    let audio = document.querySelector("#adsrc");

    if (id !== "") {
      audio.src = audioSrc;
      audio.autoplay = true;
    } else {
      audio.play();
    }

    const duration = document.getElementById("duration");
    const current__time = document.getElementById("current__time");
    const volume = document.getElementById("volume__slider");
    const slider = document.getElementById("seek__slider");

    let seekSliderMax = () => {
      slider.max = Math.floor(audio.duration);
    };

    let interval = "";

    //audio.loop = false

    let showRangeProgress = () => {
      slider.value = Math.floor(audio.currentTime);
      current__time.textContent = calculatedTime(audio.currentTime);
      interval = setInterval(showRangeProgress, 1000);

      audio.addEventListener("playing", () => {
        loader.style.display = "none";
      });

      audio.addEventListener("ended", () => {
        if (audio.currentTime === audio.duration) {
          clearInterval(interval);
          playBtn.classList.add("pp");
          pauseBtn.classList.remove("pp");
        }
      });
    };

    slider.addEventListener("input", (e) => {
      clearInterval(interval);
      audio.currentTime = slider.value;
      current__time.textContent = calculatedTime(slider.value);

      showRangeProgress();
    });

    let displayDuration = () => {
      duration.textContent = calculatedTime(audio.duration);
    };

    let calculatedTime = (secs) => {
      let minutes = Math.floor(secs / 60);
      let seconds = Math.floor(secs % 60);
      let returnedSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;

      return `${minutes}:${returnedSecs}`;
    };

    volume.addEventListener("input", (e) => {
      let value = e.target.value;

      audio.volume = value / 100;
    });

    let sleekVolume = () => {
      volume.value = audio.volume * 100;
    };

    if (audio.readyState > 0) {
      displayDuration();
      seekSliderMax();
      showRangeProgress();
      sleekVolume();
    } else {
      audio.addEventListener("loadedmetadata", () => {
        displayDuration();
        seekSliderMax();
        showRangeProgress();
        sleekVolume();
      });
    }
  };

  useEffect(() => {
    play(id);
  });

  let pause = () => {
    setId("");

    let playBtn = document.getElementById("play");
    let pauseBtn = document.getElementById("pause");

    playBtn.classList.add("pp");
    pauseBtn.classList.remove("pp");

    let audioP = document.querySelector("#adsrc");

    audioP.pause();
    audioP.autoplay = false;
  };

  let repeatAudio = (e) => {
    e.target.classList.toggle("like");
    let audioR = document.querySelector("#adsrc");

    if (audioR.loop) {
      audioR.loop = false;
    } else {
      audioR.loop = true;
    }
  };

  let upDown = () => {
    let el = document.querySelector(".ud");
    if (el.classList.contains("upD")) {
      el.classList.add("downD");
      el.classList.remove("upD");
    } else {
      el.classList.add("upD");
      el.classList.remove("downD");
    }
    let player = document.querySelector(".playerC");

    if (player.classList.contains("up")) {
      player.classList.remove("up");
      player.classList.add("down");
    } else {
      player.classList.remove("down");
      player.classList.add("up");
    }
  };

  let setClassName = () => {
    if (Object.keys(playData).length > 0) {
      let app = document.querySelector(".app");
      if (app.classList.contains("closed")) {
        return "playerC closed";
      }
      return "playerC";
    }
    return "playerC";
  };
  return (
    <div className={setClassName()}>
      <div className="player">
        <Loader id="player__loader" />
        <span className="details">
          <img src={img} alt={name} />
          <span>
            <h3 className="song__name">{name}</h3>
            <h5 className="artist__nameS">{artist}</h5>
            <h6>Size: {size || 0} MB</h6>
          </span>
        </span>
        <div className="audio__cover">
          <div id="audio">
            <span className="controls__pnp">
              <ReplayOutlinedIcon
                onClick={(e) => repeatAudio(e)}
                className="enabled"
              />
              <SkipPreviousOutlinedIcon className="disabled" />
              <PlayArrowOutlinedIcon
                onClick={() => play()}
                id="play"
                className="pp enabled"
                style={{ display: "none" }}
              />
              <PauseOutlinedIcon
                className="btn__sec enabled"
                id="pause"
                onClick={pause}
              />
              <SkipNextOutlinedIcon className="disabled" />
              <FavoriteBorderOutlinedIcon
                onClick={(e) => {
                  e.target.classList.toggle("like");
                }}
                className="enabled"
              />
            </span>
            <span className="controls__range">
              <p id="current__time">00:00</p>
              <input
                type="range"
                name="duration"
                id="seek__slider"
                min="0"
                max="100"
                defaultValue="0"
                className="slider"
              />
              <p id="duration">00:00</p>
            </span>
          </div>
          <audio src="" style={{ display: "none" }} id="adsrc"></audio>
        </div>
        <span className="volud__icons">
          <KeyboardArrowUpIcon onClick={upDown} className="ud" />
          <HighlightOffOutlinedIcon onClick={() => dispatch(PlayAction())} />
        </span>
        <span className="volud">
          <span className="volume">
            <VolumeOffOutlinedIcon
              onClick={() => {
                let audioM = document.querySelector("#adsrc");
                let volumeM = document.getElementById("volume__slider");

                audioM.volume = 0;
                volumeM.value = 0;
              }}
            />
            <input
              type="range"
              name="volume"
              id="volume__slider"
              min="0"
              max="100"
              defaultValue="100"
              className="slider"
            />
            <VolumeUpOutlinedIcon
              onClick={() => {
                let audioL = document.querySelector("#adsrc");
                let volumeL = document.getElementById("volume__slider");

                audioL.volume = 100 / 100;
                volumeL.value = 100;
              }}
            />
          </span>
        </span>
      </div>
      <div className="mdt__lyric">
        <div className="mdt__details">
          <span className="mdt__text">
            <h2 className="mdt__heading">Lyric</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis molestiae, ipsum, officiis sunt quis ullam fugiat
              praesentium aliquam nam itaque quo neque, ea vero obcaecati
              voluptatibus! Minima consectetur omnis asperiores.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis molestiae, ipsum, officiis sunt quis ullam fugiat
              praesentium aliquam nam itaque quo neque, ea vero obcaecati
              voluptatibus! Minima consectetur omnis asperiores.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              ipsum dolor mollitia animi officiis sit optio modi sapiente
              veritatis id accusantium exercitationem dolore facilis officia,
              quos odit! Debitis, modi facilis!
            </p>
          </span>

          <span className="mdt__text">
            <h2 className="mdt__heading">Release Date</h2>
            <p>Released on march 30, 2020</p>
            <p>All &copy;copywright reserved</p>

            <h2 className="mdt__heading">About</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              molestias architecto quia perspiciatis cumque nisi consectetur
              fugiat, animi eos. Nesciunt officia ex, dicta nobis quo quos
              impedit quam recusandae cupiditate.
            </p>
            <h2 className="mdt__heading">Chord Progression</h2>
            <p>
              Chords:{" "}
              <em>
                <strong>1 4 6 5</strong>
              </em>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Player;
