import axios from "axios";

export const getLatLngFromPincode = async (pincode) => {
  const API_URL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    pincode
  )}`;

  try {
    const response = await axios.get(API_URL);
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: lat, longitude: lon };
    } else {
      throw new Error("No results found for the provided pin code");
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    throw new Error(
      "An error occurred while fetching the location. Please try again later."
    );
  }
};
