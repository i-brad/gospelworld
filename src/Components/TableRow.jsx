import "../Styles/Music.css";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PlayAction } from "../Redux/Actions/PlayAction";
import {
  SelectedAction,
  Remove_SelectedAction,
} from "../Redux/Actions/SelectedAction";

function TableRow({ data }) {
  let dispatch = useDispatch();
  let { name, artist, duration, size, id } = data;
  let check = (e) => {
    let parent =
      e.target.parentElement.parentElement.parentElement.parentElement;
    if (e.target.checked) {
      parent.classList.add("selectedC");
      e.target.nextElementSibling.classList.add("selected");
      dispatch(SelectedAction(data));
    } else {
      parent.classList.remove("selectedC");
      e.target.nextElementSibling.classList.remove("selected");
      dispatch(Remove_SelectedAction(data));
    }
  };

  return (
    <tr id={id}>
      <td>
        <span className="text">
          <span className="checkboxC">
            <input
              type="checkbox"
              name="selected"
              className="cb"
              onChange={(e) => check(e)}
            />
            <span className="cbs">
              <span className="mark"></span>
            </span>
          </span>
          <Link to="/musics/excess love">{name}</Link>
        </span>
        <span className="icons">
          <PlayArrowOutlinedIcon onClick={() => dispatch(PlayAction(data))} />
          <FileDownloadOutlinedIcon />
          <AddIcon />
        </span>
      </td>
      <td>
        <Link to="/artists/mercy chinwo">{artist}</Link>
      </td>
      <td>{`${duration[0]}:${duration[1]}`}</td>
      <td>{size} MB</td>
    </tr>
  );
}

export default TableRow;
