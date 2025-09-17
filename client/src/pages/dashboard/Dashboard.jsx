import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from "../../components/UI/Header";
import { Map } from "../../components/Map";
import Footer from "../../components/Footer/Footer";
import { UserProfileNew } from "../../components/UserProfile/UserProfileNew";
import { BACKEND_URL } from "../../components/configs/envConfig";

const Dashboard = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [action, setAction] = useState("");
  const [requests, setRequests] = useState([]);
  const [protectedData, setProtectedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeRequest, setActiveRequest] = useState(0);
  const [completedRequest, setCompletedRequest] = useState(0);

  const onClickHandler = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      logout({ returnTo: window.location.origin });
    }
  };

  useEffect(() => {
    setAction(isAuthenticated ? "Log Out" : "Sign In/Up");
  }, [isAuthenticated]);

  const filterUserRequestData = useCallback((data) => {
    const active = data?.requests.filter((r) => r.isActive).length || 0;
    const completed = data?.requests.filter((r) => r.isCompleted).length || 0;
    setActiveRequest(active);
    setCompletedRequest(completed);
    setRequests(data?.requests || []);
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();

      const [userRes, requestRes] = await Promise.all([
        fetch(`${BACKEND_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BACKEND_URL}/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const userData = await userRes.json();
      const requestData = await requestRes.json();

      setProtectedData(userData?.user);
      filterUserRequestData(requestData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [getAccessTokenSilently, filterUserRequestData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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
        console.log("Contact number updated:", number);
        fetchUserData();
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
        console.log("Contact number deleted");
        fetchUserData();
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
          {protectedData && (
            <UserProfileNew
              showModal={showModal}
              setShowModal={setShowModal}
              setRequests={setRequests}
              requests={requests}
              data={protectedData}
              sendUpdateUserContactNumber={handleUpdateUserContactNumber}
              sendDeleteRequestOfUserContactNumber={handleDeleteUserContactNumber}
              activeBeeHivesFound={activeRequest}
              completedBeeHivesSaved={completedRequest}
            />
          )}
        </div>

        <section className="flex justify-center p-2">
          <Map requests={requests} setRequests={setRequests} />
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default Dashboard;
