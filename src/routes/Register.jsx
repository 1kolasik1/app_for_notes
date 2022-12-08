import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handleSetEmail = useCallback((e) => setEmail(e.target.value), []);

  const [name, setName] = useState("");
  const handleSetName = useCallback((e) => setName(e.target.value), []);

  const [password, setPassword] = useState("");
  const handleSetPassword = useCallback((e) => setPassword(e.target.value), []);

  const [repeat, setRepeat] = useState("");
  const handleSetRepeat = useCallback((e) => setRepeat(e.target.value), []);

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toLocaleString(),
    };
    password === repeat && email !== "" && password !== ""
      ? fetch("http://localhost:5000/users", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          navigate("/login");
        })
      : alert("Пожалуйста,перепроверьте введенные данные");
  };
  return (
    <div className="flex flex-col items-center gap-2 mt-20">
      <h1 className="text-2xl font-medium">Registration</h1>
      <input
        placeholder="email"
        value={email}
        onChange={handleSetEmail}
        className="mt-3 bg-neutral-200 border-2 border-black"
      />
      <input
        placeholder="name"
        value={name}
        onChange={handleSetName}
        className="mt-3 bg-neutral-200 border-2 border-black"
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={handleSetPassword}
        className="mt-3 bg-neutral-200 border-2 border-black"
      />
      <input
        placeholder="repeat password"
        type="password"
        value={repeat}
        onChange={handleSetRepeat}
        className="mt-3 bg-neutral-200 border-2 border-black"
      />
      <button onClick={handleRegister}>Sign up</button>
    </div>
  );
}

export default Register;
