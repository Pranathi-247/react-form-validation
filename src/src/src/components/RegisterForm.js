import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhaar: ""
};

export default function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const errors = {
    firstName: !form.firstName,
    lastName: !form.lastName,
    username: !form.username,
    email: !/^\S+@\S+\.\S+$/.test(form.email),
    password: form.password.length < 6,
    phone: !/^\+\d{1,3}\d{10}$/.test(form.phone),
    country: !form.country,
    city: !form.city,
    pan: !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan),
    aadhaar: !/^\d{12}$/.test(form.aadhaar)
  };

  const isValid = !Object.values(errors).includes(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) navigate("/details", { state: form });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Registration Form</h2>

      {Object.keys(initialState).map((field) => (
        <div key={field}>
          <input
            type={
              field === "password"
                ? showPassword ? "text" : "password"
                : "text"
            }
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={form[field]}
            onChange={handleChange}
            className={errors[field] ? "error" : ""}
          />
          {errors[field] && (
            <small className="error-text">Invalid {field}</small>
          )}
        </div>
      ))}

      <label className="checkbox">
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
        />
        Show Password
      </label>

      <button disabled={!isValid}>Submit</button>
    </form>
  );
}
