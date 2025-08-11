'use client'
import React, { createContext, useContext, useState } from 'react';

const PixelContext = createContext();

export const PixelProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false); 

  const toggleModal = () => {
    setShowModal((prevModal) => (prevModal === false ? true : false));
  };

  return (
    <PixelContext.Provider value={{ showModal, toggleModal }}>
      {children}
    </PixelContext.Provider>
  );
};

export const usePixelStore = () => useContext(PixelContext);