import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from "../../components/UI/Header";
import { Map } from "../../components/Map";
import Footer from "../../components/Footer/Footer";
import { UserProfileNew } from "../../components/UserProfile/UserProfileNew";
import { BACKEND_URL } from "../../components/configs/envConfig";
import { useLogout } from '../../hooks/useLogout';
import useAuthStore from "../../stores/useAuthStore";
import useRequestStore from "../../stores/useRequestStore";
import useUserStore from "../../stores/useUserStore";

const Dashboard = () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const { isAuthenticated } = useAuthStore();
  const { requests, fetchRequests } = useRequestStore();
  const { fetchUserData } = useUserStore();

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

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          await Promise.all([
            fetchUserData(token),
            fetchRequests(token)
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchInitialData();
  }, [isAuthenticated, fetchUserData, fetchRequests, getAccessTokenSilently]);

  const handleUpdateUserContactNumber = async (number) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${BACKEND_URL}/user/metadata`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata: { contactNumber: number } }),
      });

      if (res.ok) {
        const updatedData = await res.json();
        useUserStore.getState().updateUserData(updatedData.user);
      } else {
        const err = await res.json();
        console.error("Update failed:", err);
      }
    } catch (error) {
      console.error("Error updating number:", error);
    }
  };

  const handleDeleteUserContactNumber = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${BACKEND_URL}/user/metadata`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata: { contactNumber: null } }),
      });

      if (res.ok) {
        const updatedData = await res.json();
        useUserStore.getState().updateUserData(updatedData.user);
      } else {
        const err = await res.json();
        console.error("Delete failed:", err);
      }
    } catch (error) {
      console.error("Error deleting number:", error);
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
