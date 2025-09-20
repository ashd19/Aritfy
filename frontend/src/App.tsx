import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Form from './components/ui/ContactForm';
import AuthForm from './pages/auth';
import Community from './components/Community';
import Buy from './components/Buy';
import ProfilePage from './pages/ProfilePage';
import Explore from "./components/Explore";
import CreateArt from "./pages/CreateArt";
import AboutUs from "./pages/AboutUsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/contact" element={<Form />} />
      <Route path="/explore" element={<Community />} />
      <Route path="/buy/:artworkId" element={<Buy />} />
      <Route path="/buy/:artworkId" element={<Buy />} />
      <Route path="/profilePage" element={<ProfilePage />} />
      <Route path="/community" element={<Explore />} />
      <Route path="/createArt" element={<CreateArt />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
