import { useState } from "react";
import { api } from "./api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });

  // onLogin(res.data);
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      sessionStorage.setItem("unique_id",res.data.unique_id);
      sessionStorage.setItem("name",res.data.name);
      alert(res.data.message);
      onLogin(res.data);
    } catch (err) {
      alert(err.response?.data?.detail || "Server error");
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
}
