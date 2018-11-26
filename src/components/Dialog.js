import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const defaultCloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Close">
      x
    </button>
  );
};

const BaseDialog = React.forwardRef((props, ref) => (
  <dialog ref={ref} {...props} />
));

function isMouseEventInClientArea(event) {
  var element = event.currentTarget;
  var rect = element.getBoundingClientRect();
  var minX = rect.left + element.clientLeft;
  var x = event.clientX;
  if (x < minX || x >= minX + element.clientWidth) return false;
  var minY = rect.top + element.clientTop;
  var y = event.clientY;
  if (y < minY || y >= minY + element.clientHeight) return false;
  return true;
}

const Dialog = ({
  children,
  isOpen,
  setOpen,
  type = "dialog",
  CloseButton = defaultCloseButton,
  DialogComponent = BaseDialog,
  closeOnBackdropClick = false,
  onClick
}) => {
  const ref = React.createRef();
  let [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      // Register the dialog with dialog-polyfill once, if available
      if (window.dialogPolyfill) {
        window.dialogPolyfill.registerDialog(ref);
      }
      setInit(true);
    }
  });
  let dialog;
  useEffect(() => {
    dialog = ref.current || {};
    if (isOpen && !dialog.open) {
      if (type === "modal") {
        return dialog.showModal();
      }
      return dialog.show();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  });

  const handleBackdropClick = event => {
    function decideToClose() {
      if (!isMouseEventInClientArea(event)) {
        dialog.close();
      }
    }
    if (typeof closeOnBackdropClick === "function") {
      if (closeOnBackdropClick()) {
        decideToClose();
      } else if (closeOnBackdropClick) {
        decideToClose();
      }
    }
  };

  return (
    <DialogComponent
      ref={ref}
      role={type}
      onClick={event => {
        if (onClick) onClick(event);
        handleBackdropClick(event);
      }}
    >
      <CloseButton onClick={() => setOpen(false)} aria-label="Close" />
      {children}
    </DialogComponent>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  type: PropTypes.oneOf(["dialog", "modal"]),
  closeOnBackdropClick: PropTypes.bool || PropTypes.func,
  DialogComponent: PropTypes.node,
  closeButton: PropTypes.node,
  onClick: PropTypes.func
};

export default Dialog;
