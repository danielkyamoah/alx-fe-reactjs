function UserProfile() {
  return (
    <div class="bg-gray-100 p-8 max-w-sm mx-aut my-20 rounded-lg shadow-lg" className="user-profile">
      <img class="rounded-full w-36 h-36 mx-auto" src="https://via.placeholder.com/150" alt="User" />
      <h1 class="text-xl my-4 text-blue-800">John Doe</h1>
      <p class="text-gray-600 text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;