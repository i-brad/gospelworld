import { Radio } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import Header from "../Components/Header";
import "../Styles/Settings.css";

function Settings() {
  let [checked, setChecked] = useState(false);
  let [checkedO, setCheckedO] = useState(false);
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };
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
          <span>
            <Radio
              sx={{
                color: "#fff",
              }}
              checked={selectedValue === "a"}
              onChange={handleChangeRadio}
              value="a"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
            Default
          </span>
          <span>
            <Radio
              sx={{
                color: "#fff",
              }}
              checked={selectedValue === "b"}
              onChange={handleChangeRadio}
              value="b"
              name="radio-buttons"
              inputProps={{ "aria-label": "B" }}
            />
            Light
          </span>
          <span>
            <Radio
              sx={{
                color: "#fff",
              }}
              checked={selectedValue === "c"}
              onChange={handleChangeRadio}
              value="c"
              name="radio-buttons"
              inputProps={{ "aria-label": "C" }}
            />
            Dark
          </span>
        </div>
      </div>
    </div>
  );
}

export default Settings;
