import React from "react";
import ReactDOM from "react-dom";
import history from "../history";
import "./styles.css";

const Popup = (props) => {
  return ReactDOM.createPortal(
    <div className="popup" onClick={() => history.push("/pathfinding")}>
      <div className="popup__content">
        <div className="popup__content--text">
          <h3>Welcome!</h3>
          <p>
            You can create walls and move start/finish by clicking or dragging.
          </p>
        </div>
        <a href="/pathfinding" class="popup__close">
          &times;
        </a>
      </div>
    </div>,
    document.querySelector("#popup")
  );
};

export default Popup;
