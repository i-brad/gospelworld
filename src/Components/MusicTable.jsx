import TableRow from "./TableRow";
import "../Styles/Music.css";

function MusicTable({ songs = {} }) {
  return (
    <div className="music__table">
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Artist</td>
            <td>Duration</td>
            <td>Size</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(songs).length > 0
            ? songs.map((cd, id) => {
                return <TableRow key={id} data={cd} />;
              })
            : Array(5)
                .fill()
                .map((i, id) => {
                  return (
                    <tr className="skeleton skeleton__row" key={id}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
        </tbody>
      </table>
    </div>
  );
}

export default MusicTable;
