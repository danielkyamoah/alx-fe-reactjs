import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    navigate(`/user/${encodeURIComponent(trimmed)}`);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>GitHub User Search</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 8, maxWidth: 480 }}
      >
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ flex: 1, padding: "8px 10px" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Search
        </button>
      </form>
      <p style={{ marginTop: 12, color: "#555" }}>
        Enter a GitHub username and press Search to view the public profile.
      </p>
    </main>
  );
};

export default SearchPage;
