import React from "react";
import ReactDOM from "react-dom";
import Dialog from "../lib/ReactControlledDialog";
import Simple from "./simple";
import SimpleModal from "./simpleModal";

const App = () => {
  return (
    <main>
      <Simple />
      <SimpleModal />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
