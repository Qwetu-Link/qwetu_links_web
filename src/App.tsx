import "./App.css";
import qwetuLogo from "./assets/qwetu_logo.png";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img src={qwetuLogo} alt="Qwetu Links Logo" className="mb-4" />
        <h1 className="text-3xl font-bold">Qwetu links Website</h1>
      </div>
    </>
  );
}

export default App;
