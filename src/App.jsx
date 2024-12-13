import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import Payment from "./components/Payment";
import Aboutus from "./components/Aboutus";
import ConversationInterface from "./components/ConversationInterface";
import Login from "./components/Login";
import ElevenLabsWidget from "./components/ElevenLabsWidget";
import SandeepMaheshwari from "./components/SandeepMaheshwari";
import Checkout from "./components/Checkout";
import TnC from "./components/TnC";
import Privacy from "./components/Privacy";
import Homepage from "./components/Homepage";
import Contact from "./components/contact";
import Refund from "./components/refund";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/update" element={<ConversationInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interact" element={<ElevenLabsWidget />} />
        <Route path="/artofconversation" element={<AudioPlayer />} />
        <Route path="/SandeepMaheshwari" element={<SandeepMaheshwari />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/terms" element={<TnC />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
    </Router>
  );
}

export default App;
