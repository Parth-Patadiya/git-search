import React, { useContext } from "react";
import { UserProvider, UserContext } from "./context/UserContext";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import RepoList from "./components/RepoList";

const MainContent = () => {
  const { userData, repos, loading, error } = useContext(UserContext);

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchBar />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {userData && <UserProfile user={userData} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-4 text-center text-xl font-bold">
          GitHub User Search
        </header>
        <MainContent />
      </div>
    </UserProvider>
  );
}

export default App;
