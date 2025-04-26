import { BACKEND_URL } from '../components/configs/envConfig';


const SubmitRequestForm= async (e,formData,setRequests,setShowModal,setErrors,getAccessTokenSilently,user) => {
    
    e.preventDefault();
    const { longitude, latitude, city, country, ...restFormData } = formData;
 
    const validationData = {
      ...restFormData,
      location: {
        type: 'Point',
        coordinates: [parseFloat(latitude), parseFloat(longitude)],
        city: city,
        country: country,
      },
      beefinderId: user.sub



    };
    console.log("hellooo")
    

    try {
        
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${BACKEND_URL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(validationData),
      });
     

      if (!response.ok) {
        throw new Error('Failed to post REQUESTS');
      }

      const createdRequest = await response.json();
      setRequests((prev) => [...prev, createdRequest.request]);


      setShowModal(false);
    } catch (error) {
      let validationErrors = {};
      if (error) {
        console.log(error);
        validationErrors = error;
      }
      setErrors(validationErrors);
    }
  };
  export default SubmitRequestForm
