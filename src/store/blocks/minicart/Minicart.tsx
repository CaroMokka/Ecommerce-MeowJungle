import ListCart from "./listCart/ListCart"
import ResumeCart from "./resumeCart/ResumeCart"
import EmptyCartMessage from "./emptyCartMessage/EmptyCartMessage"
import useCart from "../../../context/cart/useCart";
function Minicart() {
  const { state } = useCart();
  const { cart } = state;
 

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item)=> acc + item.quantity * (item.price ?? 0), 0)

  return (
    <>
      <a
        href="#"
        className="icons-cart"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 6h15l-2 8H8"></path>
          <circle cx="9" cy="20" r="2"></circle>
          <circle cx="18" cy="20" r="2"></circle>
          <path d="M6 6L4 2H1"></path>
        </svg>
      </a>

      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{width: "60vh"}}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Carrito de compras
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body" style={{width:"60vh"}}>
          {
            cart.length === 0 ? (
              <EmptyCartMessage/>
            ) :
            (
              <>
              < ListCart cart={cart}/>
              <ResumeCart totalItems={totalItems} totalAmount={totalAmount} />
              </>
            )
          }
           
          
        </div>
        
      </div>
    </>
  );
}

export default Minicart;
