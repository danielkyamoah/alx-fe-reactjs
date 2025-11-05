import ProfilePage from "./components/ProfilePage";
import UserContext from './UserContext';
import UserProfile from  "./components/UserProfile"
import UserInfo from "./components/UserInfo";
import UserDetails from './components/UserDetails';


function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
