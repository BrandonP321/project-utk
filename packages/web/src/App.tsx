import React from "react";
import "./App.module.scss";
import { test } from "@project-utk/shared/src/myTest";

function App() {
  return (
    <div className="App">
      <h1>{test}</h1>
    </div>
  );
}

export default App;
