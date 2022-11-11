"use client";

import "./globals.css";

import Link from "next/link";
import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import store from "./store/store";
import { Provider } from "react-redux";
import { SearchBar } from "./components/SearchBar";
import { GenreFilter } from "./components/GenreFilter";
import { Cart } from "./components/Cart";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Provider store={store}>
      <html>
        <head></head>
        <body>
          <main>
            <div>
              <nav className="w-[100vw] h-10 text-white font-medium bg-blue-400 flex justify-items-start">
                <div className="ml-auto text-md mr-3">
                  <Link className="mx-1" href="/newbook">
                    New Book |
                  </Link>
                  <Link className="mx-1" href="/admin">
                    Admin |
                  </Link>
                  <Link className="mx-1" href="/account">
                    Account |
                  </Link>
                  <Link className="mx-1" href="/registration">
                    Create Account
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
                  <SearchBar />
                  <div className="text-blue-900 font-bold ml-3 my-auto">
                    <FontAwesomeIcon
                      onClick={handleClick}
                      className="h-6 w-6 block"
                      icon={faCartShopping}
                    />
                    Cart
                  </div>
                  {open && <Cart handleClick={handleClick} />}
                </div>
              </nav>
              <GenreFilter />
            </div>
            <QueryClientProvider client={client}>
              {children}
            </QueryClientProvider>
          </main>
        </body>
      </html>
    </Provider>
  );
}
