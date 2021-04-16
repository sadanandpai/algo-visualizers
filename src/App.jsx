import React from "react";
import { Header } from "./components/header";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Home />
    </div>
  );
}

export default App;
