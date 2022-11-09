"use client";

import "./globals.css";

import Link from "next/link";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();
  return (
    <html>
      <head></head>
      <body>
        <main>
          <nav className="flex  pl-10 justify-between">
            <Link href="/">Home</Link>
            <Link href="/books">Catalogue</Link>
            <Link href="/newbook">New Book</Link>
            <Link href="/account">Account</Link>
            <Link href="/admin">Admin</Link>
          </nav>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
