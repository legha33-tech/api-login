import { useState, useEffect } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState("");

  // POST API (Login)
  const handleLogin = async (e) => {
    e.perventDefault();

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Data:", data);

    if (response.ok) {
      setToken(data.token);
      alert("Login Successful");
    } else {
      alert("Login Failed");
    }
  };

  //GET USERS API
  useEffect(() => {
    if (token) {
      fetch("https://dummyjson.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data.users));
    }
  }, [token]);

  // Lohin Page
  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Login Page</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />

          <input
            type="password"
            placeholder="Enter Passwaord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // User Page After Login
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Users List</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.firstName}
            {user.lastName}
          </p>
        </div>
      ))}
    </div>
  );
}
