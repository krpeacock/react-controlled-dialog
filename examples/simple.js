import React, { useState } from "react";
import Dialog from "../lib/ReactControlledDialog";

const Simple = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div id="simple">
      <h2>Simple Dialog</h2>
      <p>Click below to open!</p>
      <button onClick={() => setOpen(true)}>Simple Dialog</button>
      <Dialog isOpen={isOpen} setOpen={setOpen}>
        foobar
      </Dialog>
      <p>
        The native dialog component can be activated by passing an{" "}
        <code>open</code> attribute, or by invoking the <code>show()</code>{" "}
        method from the native API.
      </p>
    </div>
  );
};

export default Simple;
