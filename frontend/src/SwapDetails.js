import { useState } from "react";
import SwappieForm from "./SwappieForm";
import SwappieMatches from "./SwappieMatches";

function SwapDetails() {
  const [view, setView] = useState(null);

  return (
    <div>
      <h2>Swap Details</h2>

      {/* Action buttons */}
      <button onClick={() => setView("form")}>
        Add / Update Your Details
      </button>

      <button onClick={() => setView("matches")}>
        Match Available
      </button>

      <hr />

      {/* Conditional rendering */}
      {view === "form" && <SwappieForm />}
      {view === "matches" && <SwappieMatches />}
    </div>
  );
}

export default SwapDetails;
