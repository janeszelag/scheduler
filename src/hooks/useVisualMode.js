
import { useState} from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (!replace) {
      setHistory(prevHistory => [...prevHistory, newMode]);
    } else {
      setHistory(prevHistory => {
        prevHistory.splice(-1, 1, newMode)
        return prevHistory;
      });
    }
  }

  function back() {
    if (history.length > 1) {
      const currentIndex = history.indexOf(mode);
      const prevIndex = (currentIndex - 1);
      setMode(history[prevIndex]);
     
    } 
    return; 
  }

  return { mode, transition, back, history };


}

