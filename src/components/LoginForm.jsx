import { useState } from "react";
import Notification from "./Notification";

const LoginForm = ({ handleLogin, message, messageType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2>Log In To Application</h2>
      <Notification message={message} messageType={messageType} />
      <form onSubmit={login}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required={true}
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
