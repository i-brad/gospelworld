import "../Styles/Album.css";
import Album from "./Album";

function AlbumSection() {
  return (
    <div>
      {
        <>
          <Album />
          <Album />
          <Album />
        </>
      }
    </div>
  );
}

export default AlbumSection;
