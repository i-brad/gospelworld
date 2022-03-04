import Header from "../Components/Header";
import "../Styles/Feedback.css";

function Feedback() {
  return (
    <div className="main">
      <Header />
      <div className="feedback">
        <h1>Send a feedback</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="feedback">
            Describe your issue or suggest an improvement
            <textarea
              name="feedback"
              id="feedback"
              cols="30"
              rows="10"
            ></textarea>
          </label>
          <div>
            <h5>Additional info (optional)</h5>
            <span>
              Page URL
              <input type="url" />
            </span>
            <span>
              Email
              <input type="email" name="email" id="" />
            </span>
            <span>
              Attach a file
              <input type="file" name="file" id="" />
            </span>
          </div>
          <div className="feedback__btns">
            <button type="reset" className="feedback__cancel">
              Cancel
            </button>
            <button type="submit" className="feedback__send">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
