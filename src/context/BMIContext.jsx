/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth"; // your current user hook

export const BMIContext = createContext();

export const BMIProvider = ({ children }) => {
  const { user } = useAuth(); // current logged-in user
  const [bmi, setBmi] = useState(null);

  // Load BMI for current user on mount or when user changes
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`bmi_${user.uid}`);
      setBmi(saved ? JSON.parse(saved) : null);
    } else {
      setBmi(null); // no user → reset BMI
    }
  }, [user]);

  const saveBMI = (value) => {
    setBmi(value);
    if (user) {
      localStorage.setItem(`bmi_${user.uid}`, JSON.stringify(value));
    }
  };

  const resetBMI = () => {
    setBmi(null);
    if (user) {
      localStorage.removeItem(`bmi_${user.uid}`);
    }
  };

  return (
    <BMIContext.Provider value={{ bmi, saveBMI, resetBMI }}>
      {children}
    </BMIContext.Provider>
  );
};

export const useBMI = () => useContext(BMIContext);