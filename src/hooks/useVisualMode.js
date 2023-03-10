import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (!replace) {
      setMode(mode);
      setHistory([...history, mode]);
    } else {
      setMode(mode);
    }
  };

  const back = () => {
    if (history.length === 1) {
      setMode(initial);
    } else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  };
  return { mode, transition, back };
}
