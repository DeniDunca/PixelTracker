"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const PixelContext = createContext();

export const PixelProvider = ({ children, boardId }) => {
  const [showModal, setShowModal] = useState(false);

  const storageKey = `board-${boardId}-pixels`;


  const [colors, setColors] = useState(() =>
    Array.from({ length: 4 }, (_, index) => ({
      id: index + 1,
      value: "#f3fafb",
    }))
  );


  const [pixels, setPixels] = useState({});


  // Load pixels for this specific board
  useEffect(() => {
    if (!boardId) return;

    const savedPixels = localStorage.getItem(storageKey);

    if (savedPixels) {
      setPixels(JSON.parse(savedPixels));
    } else {
      setPixels({});
    }

  }, [boardId]);


  // Save pixels for this specific board
  useEffect(() => {
    if (!boardId) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify(pixels)
    );

  }, [pixels, boardId]);


  const [selectedPixel, setSelectedPixel] = useState(null);


  const toggleModal = (pixelId = null) => {
    setSelectedPixel(pixelId);
    setShowModal((prev) => !prev);
  };


  return (
    <PixelContext.Provider
      value={{
        showModal,
        toggleModal,

        colors,
        setColors,

        pixels,
        setPixels,

        selectedPixel,
      }}
    >
      {children}
    </PixelContext.Provider>
  );
};


export const usePixelStore = () => useContext(PixelContext);