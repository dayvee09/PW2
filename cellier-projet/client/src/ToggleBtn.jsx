import "./ToggleBtn.scss";
import { useState } from "react";

export default function ToggleBtn(props) {
  /**
   * État de bouton, false- importer , true- créer
   */
  const [btnState, setBtnState] = useState(false);

  function handleClickBtn() {
    if (btnState) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  }

  return (
    <div className="ToggleBtn">
      <div className="container">
        <div className="button" id="button-container" onClick={handleClickBtn}>
          <div
            id="my-button"
            className={[
              "button-element",
              btnState === true ? "tfx100 br1" : "tfx0 br2",
            ].join(" ")}
          >
            <p id="importer">{btnState === true ? "CRÉER" : "IMPORTER"}</p>
          </div>
          <p id="creer" className={btnState === true ? "tfxn100" : "tfx0"}>
            {btnState === true ? "IMPORTER" : "CRÉER"}
          </p>
        </div>
        <label>
          Preffered Contact method:
          <input
            id="for-button"
            type="text"
            name="method"
            value={btnState === true ? "CRÉER" : "IMPORTER"}
          />
        </label>
      </div>
    </div>
  );
}

