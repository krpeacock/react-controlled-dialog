import React from "react";
import { createRoot } from "react-dom/client";
import Dialog from "../src/components/Dialog";
import Simple from "./simple.jsx";
import SimpleModal from "./simpleModal.jsx";
import FancyModal from "./fancyModal.jsx";

const App = () => {
  return (
    <main>
      <Simple />
      <Dialog isOpen={false} setOpen={() => {}}>
        <h2>Dialog Component</h2>
        <p>This is a simple dialog example.</p>
      </Dialog>
      <SimpleModal />
      <FancyModal />
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
