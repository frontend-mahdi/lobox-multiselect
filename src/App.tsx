import loboxLogo from './assets/lobox.svg'
import reactLogo from './assets/react.svg'
import './App.scss'
import MultiSelect from './components/MultiSelect'
import ThemeToggle from './components/ToggleTheme'

function App() {

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
      <ThemeToggle/>
      <h1>React Multi Select</h1>
      <MultiSelect/>
      <p className="read-the-docs">
        Click on the Lobox and React logos to learn more
      </p>
    </>
  )
}

export default App
