import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dashboard from "./views/Dashboard";
import Signup from "./views/Signup";
import Login from "./views/Login";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";

function App() {
  const [screen, setScreen] = useState("loader");
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        console.log(user);
        setUser(user);
        setScreen("dashboard");
      } else {
        console.log("no user found");
        setScreen("signup");
      }
    });
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          {screen === "login" && <Login setScreen={setScreen} />}
          {screen === "dashboard" && <Dashboard user={user} />}
          {screen === "signup" && <Signup setScreen={setScreen} />}
          {screen === "loader" && <div>Loading</div>}
        </header>
      </div>
    </>
  );
}
export default App;

// {todoData.map((item) => {
//   return item.title;
// })}

// <TextField
//               id="outlined-basic"
//               label="Email"
//               variant="outlined"
//             />
