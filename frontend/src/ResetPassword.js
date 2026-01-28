import { useState } from "react";
import { api } from "./api";

export default function ResetPassword({ email, onBack }) {
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (pass !== confirm) {
      alert("Enter same password");
      return;
    }

    try {
      const res = await api.post("/reset-password", null, {
        params: {
          email,
          new_password: pass,
          confirm_password: confirm
        }
      });

      alert(res.data.message);
      onBack();
    } catch (err) {
      alert(err.response?.data?.detail || "Reset failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Reset Password</h2>

        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPass(e.target.value)}
          />
       
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit">Reset Password</button>

          <br /><br />

          <button
            type="button"
            // className="secondary-btn"
            onClick={onBack}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
