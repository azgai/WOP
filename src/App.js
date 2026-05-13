import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import AppRoutes from "./routes/AppRoutes";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <AppRoutes />
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;