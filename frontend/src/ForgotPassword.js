
import { useState } from "react";
import { api } from "./api";

export default function ForgotPassword({ onVerified ,onBack}) {
  const [email, setEmail] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/verify-forgot", null, {
        params: { email, unique_id: uniqueId }
      });
      onVerified(email);
    } catch (err) {
      alert(err.response?.data?.detail || "Verification failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Verify Account</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Unique ID"
            onChange={(e) => setUniqueId(e.target.value)}
          />

          <button type="submit">Verify</button>

          <button type="button" onClick={onBack}>
              Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}
