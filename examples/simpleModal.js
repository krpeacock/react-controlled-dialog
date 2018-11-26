import React, { useState } from "react";
import Dialog from "../lib/ReactControlledDialog";

const SimpleModal = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div id="simple-modal">
      <h2>Simple Modal</h2>
      <p>Click below to open!</p>
      <button onClick={() => setOpen(true)}>Simple Modal</button>
      <Dialog
        isOpen={isOpen}
        setOpen={setOpen}
        type="modal"
        closeOnBackdropClick
      >
        foobar
      </Dialog>
    </div>
  );
};

export default SimpleModal;
