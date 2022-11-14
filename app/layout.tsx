"use client";

import "./globals.css";

import Link from "next/link";
import React, { useState, lazy, Suspense } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import store from "./store/store";
import { Provider } from "react-redux";
import { SearchBar } from "./components/nav/SearchBar";
import { GenreFilter } from "./components/nav/GenreFilter";
import { TopNav } from "./components/nav/TopNav";
import { CartNavQuantity } from "./components/cart/CartNavQuantity";

const Login = lazy(() => import("./components/nav/Login"));
const Cart = lazy(() => import("./components/cart/Cart"));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleClick = () => {
    setIsCartOpen((prevState) => !prevState);
  };
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const setLogin = () => setIsLoggingIn((prevState) => !prevState);

  const closeCartAndLogin = () => {
    if (isLoggingIn || isCartOpen) {
      setIsLoggingIn(false);
      setIsCartOpen(false);
    }
  };
  const darknessStyle =
    isLoggingIn || isCartOpen ? "brightness-[60%] bg-white" : "";

  return (
    <Provider store={store}>
      <html>
        <head></head>
        <body>
          <main className="box-border overflow-x-hidden">
            <div onClick={closeCartAndLogin} className={darknessStyle}>
              <TopNav setLogin={setLogin} />
            </div>
            <div onClick={closeCartAndLogin} className={darknessStyle}>
              <nav className="flex justify-center h-[82px] border-b-[1px] border-gray-200 w-[100vw]">
                <div className="flex">
                  <Link href="/">
                    <img
                      className="h-20 w-20"
                      src="https://media.istockphoto.com/id/1349688040/vector/hand-book-logo-design-education-logo-with-hand-concept-vector-hand-and-book-logo-design.jpg?b=1&s=612x612&w=0&k=20&c=ZUbty4wIBFifyvATL1AXUX7SwGagbC1KAqHH606I8eU="
                    />
                  </Link>
                  <SearchBar />
                  <div
                    className="text-blue-900 font-bold ml-3 my-auto cursor-pointer"
                    onClick={handleClick}
                  >
                    <FontAwesomeIcon
                      className="h-6 w-6 block ml-3"
                      icon={faCartShopping}
                    />
                    <CartNavQuantity />
                  </div>
                </div>
              </nav>
              <GenreFilter />
            </div>
            <QueryClientProvider client={client}>
              <div className=" z-10  left-[50%] -ml-[240px] absolute">
                {isLoggingIn && (
                  <Suspense>
                    <Login
                      setLogin={setLogin}
                      closeCartAndLogin={closeCartAndLogin}
                    />
                  </Suspense>
                )}
              </div>
              {isCartOpen && (
                <Suspense>
                  <Cart handleClick={handleClick} />
                </Suspense>
              )}
              <div
                onClick={closeCartAndLogin}
                className={`${darknessStyle} min-h-[82vh]`}
              >
                {children}
              </div>
            </QueryClientProvider>
          </main>
        </body>
      </html>
    </Provider>
  );
}
