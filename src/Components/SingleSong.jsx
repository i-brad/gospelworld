import { Link } from "react-router-dom";
import Related from "./Related";
import "../Styles/Home.css";

function SingleSong() {
  return (
    <>
      <div className="ftsC">
        <div className="fts">
          <div>
            <h1 className="fts__name">Excess Love</h1>
            <h4 className="fts__artist">Mercy Chinwo</h4>
            <span className="fts__links">
              <button>Play Now</button>
              <Link to="/">Download</Link>
            </span>
          </div>
        </div>
        <div className="fts__lyric">
          <div className="fts__details">
            <span className="fts__text">
              <h2 className="fts__heading">Lyric</h2>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique ipsum dolor mollitia animi officiis sit optio modi
                sapiente veritatis id accusantium exercitationem dolore facilis
                officia, quos odit! Debitis, modi facilis!
              </p>
            </span>

            <span className="fts__text">
              <h2 className="fts__heading">Release Date</h2>
              <p>Released on march 30, 2020</p>
              <p>All &copy;copywright reserved</p>

              <h2 className="fts__heading">About Author</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                molestias architecto quia perspiciatis cumque nisi consectetur
                fugiat, animi eos. Nesciunt officia ex, dicta nobis quo quos
                impedit quam recusandae cupiditate.
              </p>
            </span>
          </div>
        </div>
      </div>
      <Related />
    </>
  );
}

export default SingleSong;
