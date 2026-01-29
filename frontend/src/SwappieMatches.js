import { useEffect, useState } from "react";
import { getSwappieMatches } from "./api";

function SwappieMatches() {
  const uniqueId = Number(sessionStorage.getItem("unique_id"));
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uniqueId) return;

    const fetchMatches = async () => {
      try {
        const res = await getSwappieMatches(uniqueId);
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching matches", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [uniqueId]);


  if (loading) return <p>Loading matches...</p>;

  // ✅ FILTER OUT SELF MATCHES
  const validMatches = matches.filter(
    (m) => m.user1_unique_id !== m.user2_unique_id
  );

  return (
    <div>
      <h2>Your Matches</h2>

      {validMatches.length === 0 && <p>No matches found</p>}

      {validMatches.map((m) => (
        <div key={m.id}>
          ✨Congratulations Match with{" "}
          {m.user1_unique_id === uniqueId
            ? m.user2_name
            : m.user1_name} ✨.
        </div>
      ))}
    </div>
  );
}

export default SwappieMatches;
