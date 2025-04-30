const FetchLocationData = async (latitude, longitude,setFormData) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();
      setFormData((prevData) => ({
        ...prevData,
        latitude: latitude,
        longitude: longitude,
        city: data.address.city || '',
        country: data.address.country || '',
      }));
    } catch (err) {
      console.log('Error fetching location data:', err);
    }
  };
  export default FetchLocationData
