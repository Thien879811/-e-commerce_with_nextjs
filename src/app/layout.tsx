"use client"
import "./globals.css";
import axios from "axios";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { useState } from 'react';

//tự động gửi cookie, Authorization header khi gọi api
axios.defaults.withCredentials = true;



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient[0]}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
