import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/userContext";

function Login() {
  const userContext = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handleSetEmail = useCallback((e) => setEmail(e.target.value), []);

  const [password, setPassword] = useState("");
  const handleSetPassword = useCallback((e) => setPassword(e.target.value), []);

  const handleLogin = useCallback(() => {
    fetch(
      `https://my-json-server.typicode.com/1kolasik1/dbfornotes/users?email=${email}&password=${password}`
    )
      .then((r) => r.json())
      .then((users) => {
        if (users.length === 1) {
          userContext.setUser(users[0]);
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          alert("User is invalid");
        }
      });
  }, [email, navigate, password, userContext]);

  useEffect(() => {
    if (userContext.user?.email) {
      navigate("/");
    }
  }, [navigate, userContext.user]);

  return (
    <div className="flex flex-col items-center gap-2 mt-20">
      <input
        placeholder="email"
        type="email"
        value={email}
        onChange={handleSetEmail}
        className="bg-neutral-200  border-2 border-black"
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={handleSetPassword}
        className="mt-3 bg-neutral-200  border-2 border-black"
      />
      <button onClick={handleLogin}>Log in</button>
      <Link to="/register">Если вы не зарегестрированы,то нажмите сюда</Link>
    </div>
  );
}
export default Login;
