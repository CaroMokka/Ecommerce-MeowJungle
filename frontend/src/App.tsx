import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/scrollToTop/ScrollToTop";
import Home from "./pages/Home";
import Products from "./pages/Products";
import "./App.css";
import Checkout from "./pages/checkout/Checkout";
import Shipping from "./pages/checkout/Shipping";

function App() {
  return (
    
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;
