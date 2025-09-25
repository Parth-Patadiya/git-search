import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async (username) => {
    setLoading(true);
    setError("");
    setUserData(null);
    setRepos([]);

    try {
      const resUser = await fetch(`https://api.github.com/users/${username}`);
      if (!resUser.ok) throw new Error("User not found");
      const user = await resUser.json();

      const resRepos = await fetch(user.repos_url);
      const reposData = await resRepos.json();

      setUserData(user);
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, repos, loading, error, fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
