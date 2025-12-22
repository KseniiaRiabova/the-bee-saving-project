const FetchLocationData = async (latitude, longitude, setFormData) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
    );
    const data = await res.json();

    // Extract detailed address components
    const address = data.address || {};

    setFormData((prevData) => ({
      ...prevData,
      latitude: latitude,
      longitude: longitude,
      city: address.city || address.town || address.village || '',
      country: address.country || '',
      street: address.road || '',
      houseNumber: address.house_number || '',
      postalCode: address.postcode || '',
      fullAddress: data.display_name || '',
    }));
  } catch (err) {
    console.log('Error fetching location data:', err);
  }
};
export default FetchLocationData;
