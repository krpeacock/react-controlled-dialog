import React, { useEffect } from "react";
import PropTypes from "prop-types";

const defaultCloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Close">
      <svg
        aria-hidden="true"
        data-prefix="far"
        data-icon="times"
        className="svg-inline--fa fa-times fa-w-10"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
        />
      </svg>
    </button>
  );
};

const BaseDialog = React.forwardRef((props, ref) => (
  <dialog ref={ref} {...props} />
));

const Dialog = ({
  children,
  isOpen,
  setOpen,
  type = "dialog",
  CloseButton = defaultCloseButton,
  DialogComponent = BaseDialog
}) => {
  const ref = React.createRef();

  useEffect(() => {
    let dialog = ref.current || {};
    if (isOpen && !dialog.open) {
      if (type === "modal") {
        return dialog.showModal();
      }
      return dialog.show();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  });

  return (
    <DialogComponent ref={ref} role={type}>
      <CloseButton onClick={() => setOpen(false)} aria-label="Close" />
      {children}
    </DialogComponent>
  );
};

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["dialog", "modal"]),
  closeButton: PropTypes.node,
  DialogComponent: PropTypes.node
};

export default Dialog;
