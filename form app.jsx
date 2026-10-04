import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // saari fields check karta hai, errors ka object return karta hai
  function validate() {
    const err = {};

    if (form.name.trim() === "") {
      err.name = "Name is required";
    } else if (form.name.trim().length < 3) {
      err.name = "Name must be at least 3 characters";
    }

    if (form.email.trim() === "") {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Enter a valid email";
    }

    if (form.phone.trim() === "") {
      err.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      err.phone = "Phone must be exactly 10 digits";
    }

    if (form.password === "") {
      err.password = "Password is required";
    } else if (form.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    if (form.confirm !== form.password) {
      err.confirm = "Passwords do not match";
    }

    return err;
  }

  function handleSubmit(e) {
    e.preventDefault(); // page refresh rokta hai
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", password: "", confirm: "" });
    } else {
      setSuccess(false);
    }
  }

  return (
    <div className="app">
      <h2>Form Validation</h2>

      <form onSubmit={handleSubmit} noValidate>
        <p>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </p>

        <p>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          {errors.email && <span className="error">{errors.email}</span>}
        </p>

        <p>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (10 digits)" />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </p>

        <p>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
          {errors.password && <span className="error">{errors.password}</span>}
        </p>

        <p>
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Confirm password" />
          {errors.confirm && <span className="error">{errors.confirm}</span>}
        </p>

        <button>Register</button>
      </form>

      {success && <p style={{ color: "green" }}>Form submitted successfully!</p>}
    </div>
  );
}

export default App;
