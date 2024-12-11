import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import Payment from "./components/Payment";
import PaymentAOC from "./components/PaymentAOC";
import ConversationInterface from "./components/ConversationInterface";
import Login from "./components/Login";
import ElevenLabsWidget from "./components/ElevenLabsWidget";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AudioPlayer />} />
        <Route path="/update" element={<ConversationInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interact" element={<ElevenLabsWidget />} />
        <Route path="/artofconversation" element={<AudioPlayer />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<PaymentAOC />} />
      </Routes>
    </Router>
  );
}

export default App;
