import { useState } from "react";

const RepoList = ({ repos }) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("");

  if (!repos || repos.length === 0) {
    return <p className="text-center text-gray-500">No repositories found.</p>;
  }

  const filteredRepos = repos
    .filter((repo) => repo.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      let result = 0;
      if (sortBy === "stars") {
        result = b.stargazers_count - a.stargazers_count;
      } else {
        result = a.name.localeCompare(b.name);
      }
      return sortOrder === "asc" ? result : -result;
    });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by repo name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow"
          >
            <option value="name">Sort by Name</option>
            <option value="stars">Sort by Stars</option>
          </select>

          {sortBy === "name" && (
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="bg-gray-200 px-3 py-2 rounded-lg shadow hover:bg-gray-300"
            >
              {sortOrder === "asc" ? "A → Z" : "Z → A"}
            </button>
          )}
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <p className="text-center text-gray-500">
          No repositories match your search.
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {filteredRepos.map((repo) => (
            <li
              key={repo.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {repo.name}
              </a>
              <p className="text-gray-600 text-sm">
                {repo.description || "No description"}
              </p>
              <p className="text-sm text-gray-500">
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepoList;
