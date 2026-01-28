// import { useState } from "react";
// import { api } from "./api";

// export default function DeleteAccount({ onDeleted, onBack }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }

//     const confirmDelete = window.confirm(
//       "This action is permanent. Are you sure you want to delete your account?"
//     );

//     if (!confirmDelete) return;

//     try {
//       setLoading(true);

//       const res = await api.post("/delete-account", {
//         email,
//         password
//       });

//       alert(res.data.message || "Account deleted successfully");

//       // 🔴 logout + go to login
//       onDeleted();

//     } catch (err) {
//       alert(err.response?.data?.detail || "Delete failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//     return(

//         <div className="container">
//       <div className="card">
//         <h2>Hi {user.name} ! are you really sure you want to delete your account?</h2>
//       <button
//         style={{ marginTop: "20px" }}
//         onClick={onProfile}
//       >
//         Back to Profile
//       </button>
      

//       </div>

//     </div>
    
//     )
// }