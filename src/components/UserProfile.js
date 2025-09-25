const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white shadow rounded-xl p-6 text-center mb-6">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold">{user.login}</h2>
      <p className="text-gray-600">{user.bio || "No bio available"}</p>
      <p className="mt-2 text-sm text-gray-500">
        Public Repos: {user.public_repos}
      </p>
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserProfile;
