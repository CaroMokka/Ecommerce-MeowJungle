import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/scrollToTop/ScrollToTop";
import Home from "./pages/Home";
import Products from "./pages/Products";
import "./App.css";
import CartView from "./pages/CartView";
import Checkout from "./pages/Checkout";

function App() {
  return (
    
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;
