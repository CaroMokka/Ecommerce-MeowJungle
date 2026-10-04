import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCheckout from "../../context/checkout/useCheckout";

interface ProfileFormData {
  name: string;
  lastName: string;
  email: string;
}

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const { completeStep } = useCheckout();
  const navigate = useNavigate();

  const onSubmit = () => {
    completeStep("profile");
    void navigate("/checkout/shipping");
  };

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} style={{ maxWidth: "400px" }}>
        {/* nombre */}
        <div>
        <label htmlFor="name">Nombre:</label><br/>
        <input 
          id="name"
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
      </div>
       {/* Apellido */}
       <div>
        <label htmlFor="lastName">Apellido:</label><br/>
        <input 
          id="lastName"
          {...register("lastName", { required: "El apellido es obligatorio" })}
        />
        {errors.lastName && <p style={{color:"red"}}>{errors.lastName.message}</p>}
      </div>
      {/* Email */}
      <div>
        <label htmlFor="email">Email:</label><br/>
        <input 
          id="email"
          {...register("email", { 
            required: "El email es obligatorio",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "El formato del email no es válido"
            }
          })}
        />
        {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
      </div>

      <button type="submit">Guardar Perfil</button>
    </form>
  );
};
