import { useState } from "react";

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition to a new mode
  const transition = function (current, replace = false) {
    replace && back()
    let newHistory = [...history];
    newHistory.push(current);
    setHistory(newHistory);
    setMode(current)
  };

  //return to the previous page
  const back = function () {
   let newHistory = [...history];
   newHistory.pop();
   setHistory(newHistory);
   setMode(newHistory[newHistory.length - 1]);
  };

  return {
    mode,
    transition,
    back,
  };
}
export default useVisualMode;
