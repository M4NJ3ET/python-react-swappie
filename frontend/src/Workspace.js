import {useState} from "react";
import SwapDetails from "./SwapDetails";
import { deleteAccount } from "./api";


function Workspace({ user, onLogout, onProfile, onSwappieDetails}) {
  const [showSwapDetails, setShowSwapDetails] = useState(false);
  const handleLogout = () => {
    sessionStorage.clear();
    onLogout();
  };

const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this account?\nYou will lose all your data."
  );

  if (!confirmDelete) return;

  const uniqueId = Number(
    sessionStorage.getItem("unique_id") ||
    localStorage.getItem("unique_id")
  );

  console.log("DELETE ACCOUNT unique_id =", uniqueId);

  if (!uniqueId || isNaN(uniqueId)) {
    alert("Session expired. Please login again.");
    return;
  }

  try {
    await deleteAccount(uniqueId);
    alert("Account deleted successfully");
    sessionStorage.clear();
    localStorage.clear();
    onLogout();
  } catch (err) {
    console.error("DELETE ERROR:", err.response?.data || err.message);
    alert("Failed to delete account");
  }
};

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Hi {user.name} 👋</h2>
      <p>This is your workspace!</p>
      <p>Lets Rock it!! 🔥🔥</p>

      <button
        style={{ marginTop: "20px" }}
        onClick={handleLogout}
      >
        Logout
      </button>

      <button
        style={{ marginTop: "20px" }}
        onClick={onProfile}
      >
        View Profile
      </button>
      <button
        style ={{ marginTop:"20px"}}
        onClick={() =>setShowSwapDetails(true)}
        > Swap Details

        </button>
        {showSwapDetails && <SwapDetails/>}
      <button
        style={{ marginTop: "20px", backgroundColor: "red", color: "black" }}
        onClick={handleDeleteAccount}
      >
      Delete Account
      </button>
    </div>
  );
}
export default Workspace;
