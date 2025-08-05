import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import ChatbotPage from "./pages/chatbot";
import Botazel from "./pages/botazel";
import Botaci from "./pages/botaci";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/chatbot/botazel" element={<Botazel />} />
          <Route path="/chatbot/botaci" element={<Botaci />} />
          <Route path="/chatbot/botazel" element={<Botazel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
