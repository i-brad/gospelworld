import Artists from "../Components/Artists";
import Featured from "../Components/Featured";
import Header from "../Components/Header";
import Latest from "../Components/Latest";
import Popular from "../Components/Popular";
import "../Styles/Home.css";

function Home() {
  return (
    <div className="main">
      <Header />
      <Featured />
      <Artists />
      <Latest />
      <Popular />
    </div>
  );
}

export default Home;
