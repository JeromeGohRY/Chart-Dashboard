// pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app'
import "@/styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="app-container">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
