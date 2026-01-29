export default function Profile({ user, onWorkspace, onForgotPassword}) {
  return (
    <div className="container">
      <div className="card">
        <h2>Hi {user.name} this is your profile.</h2>
        {/* <p>Name :{user.name}</p> */}
        <p>Email :{user.email}</p>
        <p>Phone :{user.phone}</p>
        <p>Unique ID :{user.unique_id}</p>
      <button
        style={{ marginTop: "20px" }}
        onClick={onWorkspace}
      >
        Back to Workspace
      </button>
      <button
        style={{ marginTop: "20px" }}
        // email={RestEmail}
        onClick={onForgotPassword}
      >
        Change Password
      </button>

      </div>

    </div>
  );
}