import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayAction } from "../Redux/Actions/PlayAction";
import Loader from "./Loader";

function Player() {
  let dispatch = useDispatch();
  const playData = useSelector((state) => state.play.song);
  let songs = useSelector((state) => state.songs.songs);

  const { id, audio: audioSrc, name, size, artist, img, duration } = playData;

  //play func
  let playing = useCallback(() => {
    let loader = document.getElementById("player__loader");
    let playBtn = document.getElementById("play");
    let pauseBtn = document.getElementById("pause");

    playBtn.classList.remove("pp");
    pauseBtn.classList.add("pp");
    loader.style.display = "flex";

    let audio = document.querySelector("#adsrc");

    audio.src = audioSrc;
    audio.autoplay = true;

    audio.addEventListener("playing", () => {
      loader.style.display = "none";
    });

    const duration = document.getElementById("duration");
    const current__time = document.getElementById("current__time");
    const volume = document.getElementById("volume__slider");
    const slider = document.getElementById("seek__slider");

    let seekSliderMax = () => {
      slider.max = Math.floor(audio.duration);
    };

    let interval = "";

    let showRangeProgress = () => {
      slider.value = Math.floor(audio.currentTime);
      current__time.textContent = calculatedTime(audio.currentTime);
      interval = setInterval(showRangeProgress, 1000);
    };

    audio.addEventListener("ended", () => {
      if (audio.currentTime === audio.duration) {
        clearInterval(interval);
        playBtn.classList.add("pp");
        pauseBtn.classList.remove("pp");
      }
    });

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
  }, [audioSrc]);

  useEffect(() => {
    playing();
  }, [playing]);

  let pause = () => {
    let playBtn = document.getElementById("play");
    let pauseBtn = document.getElementById("pause");

    playBtn.classList.add("pp");
    pauseBtn.classList.remove("pp");

    let audioP = document.querySelector("#adsrc");

    audioP.pause();
    audioP.autoplay = false;
  };

  let play = () => {
    let playBtn = document.getElementById("play");
    let pauseBtn = document.getElementById("pause");

    playBtn.classList.remove("pp");
    pauseBtn.classList.add("pp");

    let audioP = document.querySelector("#adsrc");

    audioP.play();
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

  const getIndex = () => {
    let index = songs.findIndex((song) => song.id === id);
    return index;
  };

  let gotoNextSong = () => {
    let currentSongIndex = getIndex();
    let data;
    if (currentSongIndex + 1 === songs.length) {
      data = songs[0];
      return dispatch(PlayAction(data));
    }
    data = songs[currentSongIndex + 1];
    return dispatch(PlayAction(data));
  };

  let gotoPreviousSong = () => {
    let currentSongIndex = getIndex();
    let data;
    if (currentSongIndex === 0) {
      data = songs[songs.length - 1];
      return dispatch(PlayAction(data));
    }
    data = songs[currentSongIndex - 1];
    return dispatch(PlayAction(data));
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
              <SkipPreviousOutlinedIcon
                className="enabled"
                onClick={gotoPreviousSong}
              />
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
              <SkipNextOutlinedIcon
                className="enabled"
                onClick={gotoNextSong}
              />
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
              <p id="duration">{`${duration[0]}:${duration[1]}` || "00:00"}</p>
            </span>
          </div>
          <audio src="" style={{ display: "none" }} id="adsrc"></audio>
        </div>
        <span className="volud__icons">
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
    </div>
  );
}

export default Player;
