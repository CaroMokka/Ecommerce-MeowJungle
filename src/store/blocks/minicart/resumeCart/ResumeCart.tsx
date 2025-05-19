import ButtonPay from "../buttonsCart/ButtonPay";
import ButtonBuy from "../buttonsCart/ButtonBuy";

type ResumeCartProps = {
  totalItems: number;
  totalAmount: number;
}
function ResumeCart({ totalItems, totalAmount }: ResumeCartProps) {
  return (
    <div className="d-flex flex-column align-items-end p-3" >
      <ul className="list-group list-group-flush">
        <div className="list-group-item">
          <div>Total productos</div>
          <div>{totalItems}</div>
        </div>
        <li className="list-group-item">
          <div>SubTotal</div>
          <div>$ {totalAmount}</div>
        </li>
        {/* <li className="list-group-item">
          <div>Descuentos</div>
          <div>$3.560</div>
        </li> */}
        <li className="list-group-item">
          <div>Total</div>
          <div>$ {totalAmount}</div>
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
