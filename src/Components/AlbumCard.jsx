import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import Default from "../Assets/featured.jpg";

function AlbumCard({ data }) {
  let check = (e) => {
    let parent = e.target.parentElement;
    if (e.target.checked) {
      parent.classList.add("selected");
      show__pa();
    } else {
      parent.classList.remove("selected");
      show__pa();
    }
  };

  let show__pa = () => {
    let selected = document.querySelector(".as .s");
    let ln = document.querySelectorAll(".ln");

    let selectedln = [];

    ln.forEach((inpt) => {
      if (inpt.checked) {
        //add a functionality to push selected to store
        selectedln.push(inpt);
      }
    });

    if (selectedln.length > 0) {
      document.querySelector(".pa").classList.add("ready");
      selected.classList.add("selected");
    } else {
      document.querySelector(".pa").classList.remove("ready");
      selected.classList.remove("selected");
    }
  };
  return (
    <div className="album__line">
      <input type="checkbox" className="ln" onChange={(e) => check(e)} />
      <img src={Default} alt="" />
      <span className="album__dts">
        <h2>Excess Love</h2>
        <h4>Mercy Chinwo</h4>
      </span>
      <span className="album__icons">
        <PlayArrowOutlinedIcon />
        <FileDownloadOutlinedIcon />
        <AddIcon />
      </span>
    </div>
  );
}

export default AlbumCard;
