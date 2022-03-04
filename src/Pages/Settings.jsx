import Header from "../Components/Header";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import "../Styles/Settings.css";

function Settings() {
  let [checked, setChecked] = useState(false);
  let [checkedO, setCheckedO] = useState(false);
  let handleChange = (event) => {
    setChecked(event.target.checked);
  };
  let handleChangeO = (event) => {
    setCheckedO(event.target.checked);
  };
  return (
    <div className="main">
      <Header />
      <div className="settings">
        <h1>General settings</h1>
        <div className="settings__display">
          <h3>Display artist art</h3>
          <span>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            Set now playing artist art as background
          </span>
          <span>
            <Switch
              checked={checkedO}
              onChange={handleChangeO}
              inputProps={{ "aria-label": "controlled" }}
            />
            Set now playing artist art as current page background
          </span>
        </div>
        <div className="settings__mode">
          <h3>Mode</h3>
          <label htmlFor="light">
            <span>
              <input type="radio" name="mode" id="light" />
            </span>
            Light
          </label>
          <label htmlFor="dark">
            <span>
              <input type="radio" name="mode" id="dark" />
            </span>
            Dark
          </label>
          <label htmlFor="system">
            <span>
              <input type="radio" name="mode" id="system" />
            </span>
            Default
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
