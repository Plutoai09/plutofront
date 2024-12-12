import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import Payment from "./components/Payment";
import PaymentAOC from "./components/PaymentAOC";
import ConversationInterface from "./components/ConversationInterface";
import Login from "./components/Login";
import ElevenLabsWidget from "./components/ElevenLabsWidget";
import SandeepMaheshwari from "./components/SandeepMaheshwari";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AudioPlayer />} />
        <Route path="/update" element={<ConversationInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interact" element={<ElevenLabsWidget />} />
        <Route path="/artofconversation" element={<AudioPlayer />} />
        <Route path="/SandeepMaheshwari" element={<SandeepMaheshwari />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
