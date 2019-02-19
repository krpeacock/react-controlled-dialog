import React, { useState } from "react";
import Dialog from "../lib/ReactControlledDialog";
import styled from "styled-components";
import close from "./close.svg";

const StyledModal = styled.dialog`
  #box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 200px;
    color: white;
    font-family: "Raleway";
    font-size: 2.5rem;
    background: #1a1a1a;
    border-radius: calc(2 * var(--borderWidth));
  }

  --borderWidth: 3px;
  border-color: transparent;
  position: fixed;
  padding: 0;
  border-radius: calc(2 * var(--borderWidth));

  &::after {
    content: "";
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(
      60deg,
      #f79533,
      #f37055,
      #ef4e7b,
      #a166ab,
      #5073b8,
      #1098ad,
      #07b39b,
      #6fba82
    );
    border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    background-size: 300% 300%;
  }

  &::backdrop,
  &.backdrop {
    background-color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
  }
  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  button[aria-label="Close"] {
    background: transparent;
    color: white;
    border: none;
    position: absolute;
    top: calc(2 * var(--borderWidth));
    right: calc(2 * var(--borderWidth));
    position: absolute;
    height: 1.5em;
    width: 1.5em;
    background-image: url(${close});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const CustomModal = React.forwardRef((props, ref) => {
  return (
    <StyledModal {...props} ref={ref}>
      <div id="box">{props.children}</div>
    </StyledModal>
  );
});

const CloseButton = ({ onClick }) => (
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
        DialogComponent={CustomModal}
        CloseButton={CloseButton}
      >
        fancy
      </Dialog>
    </div>
  );
};

export default FancyModal;
