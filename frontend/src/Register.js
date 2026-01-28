import { useState } from "react";
import { api } from "./api";

export default function Register({onBack}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register", form);

      alert(
        res.data.message +
        "\nYour Unique ID is: " +
        res.data.unique_id
      );

    } catch (err) {
      alert(err.response?.data?.detail || "Server error");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <button type="submit">Register</button>
          <button type="button"  onClick={onBack}>Back to Login</button>
          
        </form>
      </div>
    </div>
  );
}
