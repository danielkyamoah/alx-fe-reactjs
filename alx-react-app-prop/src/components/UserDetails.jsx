import { useContext } from "react";

function UserDetails() {
  const userData = { name: "Jane Doe", email: "jane.doe@gmail.com"};

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default UserDetails;
