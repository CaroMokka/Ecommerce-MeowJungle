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
      <h2 className="mb-3">Shipping Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded">
        
        {/* Nombre Completo */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input 
            {...register("fullName", { required: "Full name is required" })} 
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`} 
            placeholder="Enter your full name"
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
        </div>

        {/* Dirección */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input 
            {...register("address", { required: "Address is required" })} 
            className={`form-control ${errors.address ? "is-invalid" : ""}`} 
            placeholder="Enter your address"
          />
          {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
        </div>

        {/* Ciudad */}
        <div className="mb-3">
          <label className="form-label">City</label>
          <input 
            {...register("city", { required: "City is required" })} 
            className={`form-control ${errors.city ? "is-invalid" : ""}`} 
            placeholder="Enter your city"
          />
          {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
        </div>

        {/* Código Postal */}
        <div className="mb-3">
          <label className="form-label">Zip Code</label>
          <input 
            {...register("zipCode", { required: "Zip code is required", pattern: { value: /^[0-9]{5}$/, message: "Invalid zip code" } })} 
            className={`form-control ${errors.zipCode ? "is-invalid" : ""}`} 
            placeholder="Enter your zip code"
          />
          {errors.zipCode && <div className="invalid-feedback">{errors.zipCode.message}</div>}
        </div>

        {/* País */}
        <div className="mb-3">
          <label className="form-label">Country</label>
          <select 
            {...register("country", { required: "Please select a country" })} 
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
          >
            <option value="">Select Country</option>
            <option value="USA">United States</option>
            <option value="CAN">Canada</option>
            <option value="MEX">Mexico</option>
            <option value="CHL">Chile</option>
          </select>
          {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
}

