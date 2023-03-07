"use client";

import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

export function LayoutHome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
