"use client";

import { use } from "react";
import { PixelProvider } from "../../hooks/PixelContext";

export default function Layout({ children, params }) {

  const { id } = use(params);

  return (
    <PixelProvider boardId={id}>
      {children}
    </PixelProvider>
  );
}