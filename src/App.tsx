import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/scrollToTop/ScrollToTop";
import { CartProvider } from "./context/cart/cartContext";
import Home from "./store/blocks/home/Home";
import Products from "./store/blocks/plp/ProductsList";
import ProductPage from "./pages/ProductPage"
import Cart from "./checkout/Cart";
import CheckoutLayout from "./checkout/checkoutLayout/CheckoutLayout";
import About from "./pages/About-us";

function App() {
  return (
    
      <CartProvider>
        <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/about" element={<About/>} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={<Navigate to="/checkout/profile" replace />}
          />
          <Route path="/checkout/profile" element={<CheckoutLayout />} />
          <Route path="/checkout/shipping" element={<CheckoutLayout />} />
          <Route path="/checkout/payment" element={<CheckoutLayout />} />
          <Route path="/checkout/confirmation" element={<CheckoutLayout />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
  
  );
}

export default App;
