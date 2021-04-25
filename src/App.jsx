import React, { useState } from "react";
import "./app.css";
import { Header } from "./components/header";
import { Controller } from "./components/Controller";
import { Home } from "./components/Home";
import { arrayForSorting } from "./components/config";


export default function App() {

  const [array, setArray] = useState(arrayForSorting);
  const [progress, setProgress] = useState('reset')

  return (
    <div>
      <Header />
      <Controller array={array} setArray={setArray} progress={progress} setProgress={setProgress} />
      <Home progress={progress} />
    </div>
  );
}
