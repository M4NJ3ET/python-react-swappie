import {useState} from "react";
import SwapDetails from "./SwapDetails";

function Workspace({ user, onLogout, onProfile, onSwappieDetails}) {
  const [showSwapDetails, setShowSwapDetails] = useState(false);
  const handleLogout = () => {
    sessionStorage.clear();
    onLogout();
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
    </div>
  );
}
export default Workspace;
