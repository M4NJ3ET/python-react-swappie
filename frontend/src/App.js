import { useState } from "react";
import "./App.css";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Workspace from "./Workspace";
import Profile from "./Profile";
// import DeleteAccount from "./DeleteAccount";
// import ChangePassword from "./ChangePassword";

function App() {
  const [screen, setScreen] = useState("login"); // login | register | forgot | reset | workspace

  const [userName, setUserName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [user, setUser] = useState(null);
  // const [deleteAccount, setDeleteAccount] = useState(null);


  if (screen === "workspace") {
    return (
      <div className="container">
        <div className="card">
          <Workspace
            user={user}
            onLogout={() => setScreen("login")}
            onProfile={() => setScreen("profile")}
          />
        </div>
      </div>
    );
  }

  if (screen === "forgot") {
    return (
      <ForgotPassword
        onVerified={(email) => {
          setResetEmail(email);
          setScreen("reset");
        }}
        onBack={() => setScreen("login")}
      />
    );
  }

  if (screen === "reset") {
    return (
      <ResetPassword
        email={resetEmail}
        onBack={() => setScreen("login")}
      />
    );
  }
  if (screen === "register") {
    return (
      <Register
        onBack={() => setScreen("login")}
      />
    );
  }
  if(screen ==="profile"){
    return (
      <Profile
        user={user}
        onBack={() => setScreen("login")}
        onWorkspace={() => setScreen("workspace")}
        onForgotPassword={() => setScreen("forgot")}
        // onDeleteAccount={()=>setScreen("DeleteAccount")}
      />
    );
  }
  // if(screen ==="DeleteAccount"){
  //   return (
  //     <DeleteAccount
  //       user={user}
  //       // onBack={() => setScreen("login")}
  //       onProfile={() => setScreen("Profile")}
  //     />
  //   );
  // }

  // if(screen ==="changePassword"){
  //   return (
  //     <ChangePassword
  //       email={user.email}
  //       onBack={() => setScreen("profile")}
  //     />
  //   );
  // }

  return (
    <div className="container">
      <div className="card">
        <h2>
          {screen === "login" ? "Login" : "Register"}
        </h2>

        {screen === "login" ? (
          <>
            <Login
              onLogin={(userData) => {
                setUserName(userData.name);
                setUser(userData);
                setScreen("workspace");
              }}
            />

            {/* REGISTER BUTTON */}
            <button onClick={() => setScreen("register")}>
              Register
            </button>

            {/* FORGOT PASSWORD BUTTON */}
            <button onClick={() => setScreen("forgot")}>
              Forgot Password
            </button>
          </>
        ) : (
          <>
            <Register />

            <button onClick={() => setScreen("login")}>
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
