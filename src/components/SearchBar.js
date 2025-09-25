import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const SearchBar = () => {
  const [username, setUsername] = useState("");
  const { fetchUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) fetchUser(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center my-6">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username..."
        className="border rounded-lg px-4 py-2 w-64 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
