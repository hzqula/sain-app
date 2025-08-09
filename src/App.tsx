import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatbotPage from "./pages/chatbot";
import Botazel from "./pages/botazel";
import Botaci from "./pages/botaci";
import AlQuran from "./pages/al-quran";
import Landing from "./pages/landing";
import Botain from "./pages/botain";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/chatbot/botazel" element={<Botazel />} />
          <Route path="/chatbot/botaci" element={<Botaci />} />
          <Route path="/chatbot/botazel" element={<Botazel />} />
          <Route path="/chatbot/botain" element={<Botain />} />
          <Route path="/al-quran" element={<AlQuran />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
