
import { useState} from "react";


//changes the modes of the appointment component 

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

//replace refers to whether we want to remove the previous mode from the history  
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

//ensures you can't move back if at first index of history
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

