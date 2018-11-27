import React, { useState } from "react";
import Dialog from "../lib/ReactControlledDialog";
import styled from "styled-components";
import close from "./close.svg";

const StyledModal = styled.dialog`
  height: 50vh;
  width: 60vw;
  padding: 1em;
  border-radius: 10px;
  border-color: #acacac;
  &::backdrop,
  &.backdrop {
    background-color: rgba(0, 0, 0, 0.65);
  }
  button[aria-label="Close"] {
    position: absolute;
    top: 1em;
    right: 1em;
    height: 1.5em;
    width: 1.5em;
    background-image: url(${close});
    background-repeat: no-repeat;
    background-position: center;
    border: none;
  }
`;

let CloseButton = ({ onClick }) => (
  <button onClick={onClick} aria-label="Close" />
);
const FancyModal = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div id="fancy">
      <h2>Fancy Modal Example</h2>
      <button onClick={() => setOpen(true)}>Fancy Modal</button>
      <Dialog
        isOpen={isOpen}
        setOpen={setOpen}
        type="modal"
        closeOnBackdropClick
        DialogComponent={StyledModal}
        CloseButton={CloseButton}
      >
        foobar
      </Dialog>
    </div>
  );
};

export default FancyModal;
