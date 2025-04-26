import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
import { Header } from "../../components/UI/Header";
import { Map } from "../../components/Map";
import Footer from "../../components/Footer/Footer";
import { UserProfileNew } from "../../components/UserProfile/UserProfileNew";
import { BACKEND_URL } from "../../components/configs/envConfig";

const Dashboard = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { logout } = useAuth0();
  const [protectedData, setProtectedData] = useState({});
  const [action, setAction] = useState("");
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // const navigate = useNavigate();

  const onClickHandler = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  function handleUpdateUserContactNumber(data) {
    handleAddOrUpdateUserContactNumber(data);
  }

  function handleRequestToDeleteUserContactNumber() {
    handleDeleteUserContactNumber();
  }

  const handleAddOrUpdateUserContactNumber = async (data) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${BACKEND_URL}/user/metadata`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata: { contactNumber: data },
        }),
      });

      if (response.ok) {
        console.log("Contact number updated successfully:", data);
        const responseData = await response.json();
        console.log("Updated user data:", responseData?.user);
      } else {
        const errorData = await response.json();
        console.error("Failed to add/update contact number", errorData);
      }
    } catch (error) {
      console.error("Error updating contact number:", error);
    }
  };

  const handleDeleteUserContactNumber = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${BACKEND_URL}/user/metadata`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata: { contactNumber: null },
        }),
      });

      if (response.ok) {
        console.log("Contact number deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete contact number:", errorData);
      }
    } catch (error) {
      console.error("Error deleting contact number:", error);
    }
  };

  useEffect(() => {
    setAction(isAuthenticated ? "Log Out" : "Sign In/Up");
  }, [isAuthenticated]);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate("/");
    //   return;
    // }

    const fetchProtectedData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
          `${BACKEND_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setProtectedData(data?.user);
      } catch (e) {
        console.log(e);
      }
    };

    fetchProtectedData();
  }, [getAccessTokenSilently]);


  return (
    <section>
      <section className="bg-[#9BC25B]">
        <section className="max-w-7xl mx-auto">
          <Header action={action} onClickHandler={onClickHandler} />
        </section>
      </section>

      <main className="dark:bg-black dark:text-white border-2 border-transparent">
        <section className="max-w-7xl mx-auto">
          {protectedData && (
            <UserProfileNew
            showModal={showModal}
            setShowModal={setShowModal}
            setRequests={setRequests}
            requests={requests}
              data={protectedData}
              sendUpdateUserContactNumber={handleUpdateUserContactNumber}
              sendDeleteRequestOfUserContactNumber={handleRequestToDeleteUserContactNumber}
            />
          )}
        </section>

        <section className="flex justify-center p-2">
          <Map requests={requests} setRequests={setRequests} />
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default Dashboard;
