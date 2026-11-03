import { useEffect } from 'react';
// @ts-ignore
import { initNEETBuddy } from './neetbuddy.js';

export default function App() {
  useEffect(() => {
    initNEETBuddy();
  }, []);

  return <div className="app" id="app"></div>;
}
