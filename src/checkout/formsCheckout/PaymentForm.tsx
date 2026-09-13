import { useForm } from "react-hook-form";

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

  const onSubmit = (data: PaymentMethodFormData) => {
    console.log("Método de pago seleccionado:", data.paymentMethod);
    // Aquí podrías enviarlo a tu backend o contexto
  };

  const selectedMethod = watch("paymentMethod");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
