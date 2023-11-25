import React, { useEffect, useState } from 'react'
import { Parking } from '../models/parkings';

export const useParkingData = () => {
  const [parkings, setParkings] = useState<Parking[]>();

  const getParkingData = () => {
    fetch('http://172.232.44.175/api/parkings?format=json')
      .then(response => response.json())
      .then((json) => {
        setParkings(json);
      });
  };

  useEffect(() => {
    getParkingData();
  }, []);

  return parkings; 
}
