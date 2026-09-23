import { useForm } from "react-hook-form";

interface FormData {
  fullName: string
  address: string
  city: string
  zipCode: string
  country: string
}
export default function ShippingForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData): void => {
    console.log("Shipping Info:", data);
    reset()
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Datos de Envío</h4>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} className="border p-4 rounded">

        {/* Nombre Completo */}
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            {...register("fullName", { required: "El nombre completo es obligatorio" })}
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            placeholder="Ingresa tu nombre completo"
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
        </div>

        {/* Dirección */}
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            {...register("address", { required: "La dirección es obligatoria" })}
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            placeholder="Ingresa tu dirección"
          />
          {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
        </div>

        {/* Ciudad */}
        <div className="mb-3">
          <label className="form-label">Ciudad</label>
          <input
            {...register("city", { required: "La ciudad es obligatoria" })}
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            placeholder="Ingresa tu ciudad"
          />
          {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
        </div>

        {/* Código Postal */}
        <div className="mb-3">
          <label className="form-label">Código postal</label>
          <input
            {...register("zipCode", { required: "El código postal es obligatorio", pattern: { value: /^[0-9]{5}$/, message: "Código postal no válido" } })}
            className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
            placeholder="Ingresa tu código postal"
          />
          {errors.zipCode && <div className="invalid-feedback">{errors.zipCode.message}</div>}
        </div>

        {/* País */}
        <div className="mb-3">
          <label className="form-label">País</label>
          <select
            {...register("country", { required: "Por favor selecciona un país" })}
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
          >
            <option value="">Seleccionar país</option>
            <option value="USA">Estados Unidos</option>
            <option value="CAN">Canadá</option>
            <option value="MEX">México</option>
            <option value="CHL">Chile</option>
          </select>
          {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  );
}

