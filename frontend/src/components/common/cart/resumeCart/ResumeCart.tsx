import ButtonPay from "../../cart/buttonsCart/ButtonPay";
import ButtonBuy from "../../cart/buttonsCart/ButtonBuy";
function ResumeCart() {
  return (
    <div className="d-flex flex-column align-items-end p-3" >
      <ul className="list-group list-group-flush">
        <div className="list-group-item">
          <div>Total productos</div>
          <div>(3)</div>
        </div>
        <li className="list-group-item">
          <div>SubTotal</div>
          <div> $40.256</div>
        </li>
        <li className="list-group-item">
          <div>Descuentos</div>
          <div>$3.560</div>
        </li>
        <li className="list-group-item">
          <div>Total</div>
          <div>$36.456</div>
        </li>
      </ul>

      <div className="d-flex flex-column">
        <ButtonBuy />
        <ButtonPay />
      </div>
    </div>
  );
}

export default ResumeCart;
