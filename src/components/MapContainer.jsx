import React, { useState } from 'react';
import axios from 'axios';

const MapContainer = ({ onLocationSelect }) => {
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePinCodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const handleSearch = async () => {
    if (pinCode.trim() !== '') {
      setLoading(true);
      try {
        const { latitude, longitude } = await getLatLngFromPincode(pinCode);
        onLocationSelect(`${latitude},${longitude}`);
      } catch (error) {
        console.error('Error fetching location:', error.message);
        alert('An error occurred while fetching the location. Please try again later.');
      } finally {
        setLoading(false);
        setPinCode(''); // Clear the input box after search
      }
    } else {
      alert('Please enter a valid pin code');
    }
  };
  

  const getLatLngFromPincode = async (pincode) => {
    const API_URL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(pincode)}`;

    try {
      const response = await axios.get(API_URL);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { latitude: lat, longitude: lon };
      } else {
        throw new Error('No results found for the provided pin code');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      throw new Error('An error occurred while fetching the location. Please try again later.');
    }
  };

  return (
    <div>
      <input type="text" value={pinCode} onChange={handlePinCodeChange} placeholder="Enter pin code" />
      <button onClick={handleSearch} disabled={loading}>{loading ? 'Loading...' : 'Search'}</button>
    </div>
  );
};

export default MapContainer;
