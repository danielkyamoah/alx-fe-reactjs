import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const SearchPage = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(trimmed);
      setUser(data);
    } catch (err) {
      // For this exercise, show the same message for any error state
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
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

      {loading && <p style={{ marginTop: 16 }}>Loading...</p>}

      {error && !loading && (
        <p style={{ marginTop: 16, color: "red" }}>{error}</p>
      )}

      {user && !loading && !error && (
        <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            style={{ width: 96, height: 96, borderRadius: 8 }}
          />
          <div>
            <h2>{user.name || user.login}</h2>
            {user.bio && <p style={{ marginTop: 4 }}>{user.bio}</p>}
            <p style={{ marginTop: 8 }}>
              <a href={user.html_url} target="_blank" rel="noreferrer">
                View GitHub Profile
              </a>
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default SearchPage;
