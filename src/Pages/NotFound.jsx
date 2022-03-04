import "../Styles/Not.css";
import notfound from "../Assets/notfound.png";

function NotFound() {
  return (
    <div className="ntf">
      <img src={notfound} alt="Page Not Found" />
      <h1>Page not found</h1>
    </div>
  );
}

export default NotFound;
