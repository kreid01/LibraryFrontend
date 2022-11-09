"use client";

import "./globals.css";

import Link from "next/link";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import SearchBar from "./components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

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
          <div>
            <nav className="w-[100vw] h-12 text-white font-medium bg-blue-400 flex justify-items-start">
              <div className="ml-auto text-md mr-3">
                <Link className="mx-1" href="/newbook">
                  New Book |
                </Link>
                <Link className="mx-1" href="/admin">
                  Admin |
                </Link>
                <Link className="mx-1" href="/account">
                  Account
                </Link>
              </div>
            </nav>
          </div>
          <div>
            <nav className="flex justify-center h-[82px] border-b-[1px] border-gray-200 w-[100vw]">
              <div className="flex">
                <Link href="/">
                  <img
                    className="h-20 w-20"
                    src="https://media.istockphoto.com/id/1349688040/vector/hand-book-logo-design-education-logo-with-hand-concept-vector-hand-and-book-logo-design.jpg?b=1&s=612x612&w=0&k=20&c=ZUbty4wIBFifyvATL1AXUX7SwGagbC1KAqHH606I8eU="
                  />
                </Link>
                <input className="w-[60vw] rounded-l-md border-[1px] h-10 my-auto border-gray-300"></input>
                <button className="my-auto w-[10vw] rounded-md bg-blue-800 h-10 -ml-2 text-white font-bold text-lg">
                  <Link href="/books">Search</Link>
                </button>
                <div className="text-blue-900 font-bold ml-3 my-auto">
                  <FontAwesomeIcon
                    className="h-6 w-6 block"
                    icon={faCartShopping}
                  />
                  Cart
                </div>
              </div>
            </nav>
          </div>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
