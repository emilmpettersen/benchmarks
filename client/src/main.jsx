import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactionTime from './features/ReactionTime/ReactionTime.jsx';
import MouseAim from './features/MouseAim/MouseAim.jsx';
import ChimpTest from './features/ChimpTest/ChimpTest.jsx';
import NumberMemory from './features/NumberMemory/NumberMemory.jsx';
import VerbalMemory from './features/VerbalMemory/VerbalMemory.jsx';
import TypingSpeed from './features/TypingSpeed/TypingSpeed.jsx';
import Dashboard from './features/Dashboard/Dashboard.jsx';
import Layout from './ui/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/reactiontime" element={<ReactionTime />} />
          <Route path="/chimptest" element={<ChimpTest />} />
          <Route path="/mouseaim" element={<MouseAim />} />
          <Route path="/numbermemory" element={<NumberMemory />} />
          <Route path="/verbalmemory" element={<VerbalMemory />} />
          <Route path="/typingspeed" element={<TypingSpeed />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
