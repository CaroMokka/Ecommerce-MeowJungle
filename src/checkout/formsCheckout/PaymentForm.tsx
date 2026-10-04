import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCart from "../../context/cart/useCart";
import useCheckout from "../../context/checkout/useCheckout";

type PaymentMethodFormData = {
  paymentMethod: string;
};

export function PaymentMethodForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentMethodFormData>({
    defaultValues: {
      paymentMethod: "credit-card",
    },
  });

  const { dispatch } = useCart();
  const { completeStep } = useCheckout();
  const navigate = useNavigate();

  const onSubmit = () => {
    const orderId = `order-${Date.now()}`;
    completeStep("payment");
    dispatch({ type: "CLEAR_CART" });
    void navigate("/checkout/confirmation", { state: { orderId } });
  };

  const selectedMethod = watch("paymentMethod");

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} className="space-y-4">
      <h2 className="text-xl font-bold">Selecciona un método de pago</h2>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="credit-card"
          {...register("paymentMethod", { required: true })}
          checked={selectedMethod === "credit-card"}
        />
        Tarjeta de Crédito
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="paypal"
          {...register("paymentMethod", { required: true })}
          checked={selectedMethod === "paypal"}
        />
        PayPal
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="bank-transfer"
          {...register("paymentMethod", { required: true })}
          checked={selectedMethod === "bank-transfer"}
        />
        Transferencia Bancaria
      </label>

      {errors.paymentMethod && (
        <p className="text-red-600">Selecciona un método de pago.</p>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Confirmar método de pago
      </button>
    </form>
  );
}
