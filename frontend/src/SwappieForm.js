import { useState } from "react";
import { saveSwappieProfile } from "./api";

function SwappieForm() {
  const uniqueId = Number(sessionStorage.getItem("unique_id"));
  // console.log("Saving Swappie profile for unique_id:", uniqueId);

  const [form, setForm] = useState({
    address: "",
    current_location: "",
    desired_location: "",
    budget: ""
  });
  
  const handleSubmit = async () => {
    if(!uniqueId){
      alert("Session expired. Please login again.");
      return;
    }

    await saveSwappieProfile({
      unique_id: uniqueId,
      address: form.address,
      current_location: form.current_location,
      desired_location: form.desired_location,
      budget: Number(form.budget)
    });

    alert("Swappie details saved");
  };

  return (
    <div>
      <h2>Swappie Details</h2>

      <input
        placeholder="Address"
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <input
        placeholder="Current Location"
        onChange={(e) =>
          setForm({ ...form, current_location: e.target.value })
        }
      />

      <input
        placeholder="Desired Location"
        onChange={(e) =>
          setForm({ ...form, desired_location: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Budget"
        onChange={(e) =>
          setForm({ ...form, budget: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default SwappieForm;
