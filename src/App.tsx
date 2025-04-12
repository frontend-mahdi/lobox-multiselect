import loboxLogo from "./assets/lobox.svg";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import ThemeToggle from "./components/themeToggle";
import MultiSelect from "./components/multiSelect";
import { useState } from "react";
import { OptionT } from "./components/multiSelect/MultiSelect.types";

function App() {
  const [selected, setSelected] = useState<OptionT[]>([]);

  return (
    <>
      <div>
        <a href="https://lobox.com/" target="_blank">
          <img src={loboxLogo} className="logo" alt="Lobox logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <ThemeToggle />
      <h1>React Multi Select</h1>
      <MultiSelect value={selected} onChange={setSelected} />
      <p className="read-the-docs">
        Click on the Lobox and React logos to learn more
      </p>
    </>
  );
}

export default App;
