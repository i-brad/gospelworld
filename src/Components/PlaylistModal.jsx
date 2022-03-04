import Input from "./Input";
import AddIcon from "@mui/icons-material/Add";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../Styles/Playlist.css";

function PlaylistModal() {
  let handle = (e) => {
    console.log(e.target);
  };

  let close = () => {
    let PLM = document.querySelector(".playlist__modal");
    PLM.style.display = "none";
  };

  return (
    <form action="" className="playlist__modal">
      <HighlightOffIcon className="close" onClick={close} />
      <div className="dvd">
        <h1>Playlists</h1>
        <button>
          <PlaylistPlayOutlinedIcon />
          Smooth songs
        </button>
        <button>
          <PlaylistPlayOutlinedIcon />
          Smooth songs
        </button>
      </div>
      <div className="form">
        <h1>New Playlist</h1>
        <Input
          details={{
            label: "PLY",
            type: "text",
            name: "playlist",
            placeholder: "Create new playlist",
            handle,
            Svg: PlaylistPlayOutlinedIcon,
          }}
        />
        <button>
          <AddIcon />
          New Playlist
        </button>
      </div>
    </form>
  );
}

export default PlaylistModal;
