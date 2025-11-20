import { useState } from "react";
import { fetchGitHubUser } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = (e.target.elements.username.value || "").trim();
    if (!name) return;

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await fetchGitHubUser(name);
      setUser(data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          placeholder="GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && user && (
        <div style={{ marginTop: 16 }}>
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            style={{ width: 96, borderRadius: 8 }}
          />
          <h3>{user.login}</h3>
          <p>{user.name}</p>
          <p>{user.bio}</p>
        </div>
      )}

      {!loading && !error && !user && <p>Looks like we cant find the user</p>}
    </div>
  );
};

export default Search;
