import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from "../../components/UI/Header";
import { Map } from "../../components/Map";
import Footer from "../../components/Footer/Footer";
import { UserProfileNew } from "../../components/UserProfile/UserProfileNew";
import { useLogout } from "../../hooks/useLogout";
// import { BACKEND_URL } from "../../components/configs/envConfig";
import useAuthStore from "../../stores/useAuthStore";
import useRequestStore from "../../stores/useRequestStore";
import useUserStore from "../../stores/useUserStore";
import useProfileStore from "../../stores/useProfileStore";

const Dashboard = () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const { isAuthenticated } = useAuthStore();
  const { requests, fetchRequests } = useRequestStore();
  const { fetchUserData } = useUserStore();
  // const { fetchUserData, updateUserData } = useUserStore();
  const profileStore = useProfileStore();

  const logout = useLogout();
  const [action, setAction] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      logout();
    }
  };

  useEffect(() => {
    setAction(isAuthenticated ? "Log Out" : "Sign In/Up");
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          await Promise.all([fetchUserData(token), fetchRequests(token)]);
        } catch (error) {
          console.error("Error fetching initial data:", error);
        }
      }
    };
    fetchInitialData();
  }, [isAuthenticated, fetchUserData, fetchRequests, getAccessTokenSilently]);

  const handleUpdateUserContactNumber = async (number) => {
    try {
      const token = await getAccessTokenSilently();
      await profileStore.updateContactNumber(token, number, fetchUserData);
    } catch (error) {
      console.error("Error updating contact number:", error);
    }
  };

  const handleDeleteUserContactNumber = async () => {
    try {
      const token = await getAccessTokenSilently();
      await profileStore.deleteContactNumber(token, fetchUserData);
    } catch (error) {
      console.error("Error deleting contact number:", error);
    }
  };

  return (
    <section>
      <section className="bg-[#9BC25B]">
        <div className="max-w-7xl mx-auto">
          <Header action={action} onClickHandler={onClickHandler} />
        </div>
      </section>

      <main className="dark:bg-black dark:text-white border-2 border-transparent">
        <div className="max-w-7xl mx-auto">
          <UserProfileNew
            showModal={showModal}
            setShowModal={setShowModal}
            sendUpdateUserContactNumber={handleUpdateUserContactNumber}
            sendDeleteRequestOfUserContactNumber={handleDeleteUserContactNumber}
          />
        </div>

        <section className="flex justify-center p-2">
          <Map requests={requests} />
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default Dashboard;
