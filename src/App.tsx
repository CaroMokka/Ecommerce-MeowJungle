import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/scrollToTop/ScrollToTop";
import Home from "./store/blocks/home/Home";
import Products from "./store/blocks/plp/ProductsList";
import ProductPage from "./pages/ProductPage"
import Checkout from "./checkout/Checkout";
import Shipping from "./checkout/Shipping";
import About from "./pages/About-us";
import "./App.css";

function App() {
  return (
    
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/about" element={<About/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;
