import { useState } from "react";

  function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
  
  const transition = function (updateMode, replace = false) {
    if (replace) {
      setMode(updateMode)
    } else {
      setMode(updateMode)
      setHistory((prev) => [...prev, updateMode]) //[...history]
    }
  }

  const back = function () {
    history.pop()
    setHistory([...history])
    if (history.length >= 1) {
    setMode(history[history.length - 1])
    }
  }
  return { mode, transition, back } ;
}



export default useVisualMode