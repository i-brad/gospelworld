import "../Styles/Album.css";
import AlbumCard from "./AlbumCard";

function Album() {
  return (
    <div className="single__album">
      <h1>Glory Cast - Mercy Chinwo</h1>
      <div className="line">
        {
          <>
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />

            <AlbumCard />
            <AlbumCard />
            <AlbumCard />

            <AlbumCard />
          </>
        }
      </div>
    </div>
  );
}

export default Album;
