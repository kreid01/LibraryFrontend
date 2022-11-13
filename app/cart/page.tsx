"use client";
import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IBook } from "../assets/Interfaces";
import { CheckoutBook } from "../components/checkout/CheckoutBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Checkout = lazy(() => import("../components/checkout/Checkout"));

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.value);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartTotal = cart.reduce((acc, book) => {
    return acc + book.price;
  }, 0);

  const cartWithUniqueBooks = cart.reduce((acc: any, book) => {
    if (
      !acc.find(
        (u: IBook) =>
          u.title === book.title &&
          u.quality === book.quality &&
          u.price === book.price
      )
    ) {
      acc.push(book);
    }
    return acc;
  }, []);

  const continueCheckout = () => {
    setIsCheckingOut(true);
  };

  return (
    <div className="mx-24">
      {!isCheckingOut ? (
        <>
          <h1 className="font-bold ml-5 my-5 text-2xl text-center text-blue-900">
            Shopping Cart{" "}
          </h1>
          <div className="border-y-[1px] py-4 text-xs flex border-gray-300 justify-between">
            PRODUCT
            <div className="flex">
              <p className="mx-6">PRICE</p>
              <p className="mx-6">QTY</p>
              <p className="mx-6">SUBTOTAL</p>
            </div>
          </div>
          <section>
            {cart &&
              cartWithUniqueBooks.map((book: IBook) => (
                <CheckoutBook key={book.id} book={book} />
              ))}
          </section>
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Checkout />
        </Suspense>
      )}
      <section className="border-blue-900 border-[1px] text-blue-900 mb-5">
        <div className="mx-6 my-3">
          <h2 className="font-bold text-lg">Your Order</h2>
          <p className="text-sm border-b-[1px] py-2 border-blue-900">
            {cart.length} items
          </p>
          <div className="text-sm border-b-[1px] py-2 border-blue-900 justify-between flex">
            <p>Subtotal</p>
            <p className="font-bold text-teal-600">£{cartTotal.toFixed(2)}</p>
          </div>
          <div className="border-b-[1px] py-2 font-bold border-blue-900 justify-between text-lg flex">
            <h4>Total</h4>
            <p className=" text-teal-600">£{cartTotal.toFixed(2)}</p>
          </div>
        </div>
        {!isCheckingOut && (
          <button
            onClick={continueCheckout}
            className="text-lg font-bold w-[92%] ml-[4%] my-auto mb-4 mt-4 bg-blue-900 h-12 text-white
             rounded-md px-4 hover:brightness-[60%]"
          >
            <FontAwesomeIcon icon={faLock} /> Continue to Checkout
          </button>
        )}
      </section>
    </div>
  );
}
