import React from "react";
import ReactDom from "react-dom";

// temporary
const MODAL_STYLES = {
  backgroundColor: "white",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  padding: "0px",
  width: "300px",
  height: "150px",
};

const OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
};

const CLOSE_BTN_STYLES = {
  position: "relative",
  top: "0px",
  right: "0px",
  padding: "10px",
};

export const Modal = ({ children, open, onClose }) => {
  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_STYLES}>
        <button onClick={onClose} style={CLOSE_BTN_STYLES}>
          x
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};
