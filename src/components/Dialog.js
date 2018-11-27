import React, { useEffect, useState } from "react";
import PropTypes, {
  oneOf,
  oneOfType,
  bool,
  func,
  node,
  component,
  arrayOf,
  object
} from "prop-types";

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
        return true;
      }
      return false;
    }
    let closeEnabled =
      typeof closeOnBackdropClick === "function"
        ? closeOnBackdropClick()
        : closeOnBackdropClick;
    if (closeEnabled) decideToClose();
  };

  return (
    <DialogComponent
      ref={ref}
      role={type}
      onClick={event => {
        if (onClick) {
          onClick();
        }
        handleBackdropClick(event);
      }}
    >
      <CloseButton onClick={() => setOpen(false)} aria-label="Close" />
      {children}
    </DialogComponent>
  );
};

Dialog.propTypes = {
  isOpen: bool.isRequired,
  setOpen: func.isRequired,
  children: oneOfType([arrayOf(node), node]),
  type: oneOf(["dialog", "modal"]),
  closeOnBackdropClick: bool || func,
  DialogComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),
  closeButton: node,
  onClick: func
};

export default Dialog;
