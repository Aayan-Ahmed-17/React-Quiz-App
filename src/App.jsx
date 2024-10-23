import { useState } from "react";
import Quiz from "./components/quiz";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>App.jsx</h1>
      <Quiz />
    </>
  );
}

export default App;
