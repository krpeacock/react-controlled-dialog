import React from "react";
import ReactDOM from "react-dom";
import Dialog from "../lib/ReactControlledDialog";
import Simple from "./simple";
import SimpleModal from "./simpleModal";
import FancyModal from "./fancyModal";

const App = () => {
  return (
    <main>
      <Simple />
      <SimpleModal />
      <FancyModal />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
