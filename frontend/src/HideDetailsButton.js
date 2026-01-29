function HideDetailsButton({ setScreen }) {
  return (
    <div 
      style={{
      width:"100%",
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "8px"
    }}>
      <button
        onClick={() => {
          setScreen("");            // force reset
          setTimeout(() => {
            setScreen("workspace"); // go back
          }, 0);
        }}
        style={{
          fontSize: "11px",
          padding: "3px 8px",
          cursor: "pointer"
        }}
      >
        Hide Details
      </button>
    </div>
  );
}

export default HideDetailsButton;
