import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CartBook } from "./CartBook";
import { IBook } from "../../assets/Interfaces";
import Link from "next/link";

interface Props {
  handleClick: () => void;
}

export const Cart: React.FC<Props> = ({ handleClick }) => {
  const cart = useSelector((state: RootState) => state.cart.value);

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

  return (
    <div className="w-[50vw] overflow-y-scroll sm:w-[60vw] bg-white absolute h-[100vh] z-10 right-0 shadow-lg top-0">
      <header className="bg-teal-600 h-12 text-white flex">
        <button className="ml-2" onClick={handleClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="mx-auto text-2xl font-bold my-auto">Your cart</h1>
      </header>
      {cart.length > 0 ? (
        <div>
          <section className="h-24 border-b-[1px] border-blue-900">
            <button
              className="text-lg font-bold w-[92%] ml-[4%] my-auto mt-4 bg-blue-900 h-12 text-white
             rounded-md px-5 hover:brightness-[60%]"
            >
              <Link href="/cart">
                <div onClick={handleClick}>
                  {" "}
                  <FontAwesomeIcon icon={faLock} className="mr-2" />
                  Continue to Checkout
                </div>
              </Link>
            </button>
          </section>
          <section className="ml-8 font-bold mt-4  text-green-800">
            <h2 className=" text-xl">Your Order</h2>
            <h4 className="flex text-sm mt-3 -mb-1 justify-between font-normal">
              Subtotal
              <div className="text-teal-600 mr-8">£{cartTotal.toFixed(2)}</div>
            </h4>
            <h3 className="text-lg flex justify-between">
              Total
              <div className="text-xl text-teal-600 mr-8">
                £{cartTotal.toFixed(2)}
              </div>
            </h3>
          </section>
          <section>
            {cartWithUniqueBooks.map((book: IBook) => (
              <CartBook key={book.id} book={book} />
            ))}
          </section>
        </div>
      ) : (
        <div className="text-lg text-gray-500 font-bold mx-auto mt-5 w-max border-b-[1px] pb-5 border-gray-500">
          You have no items in your cart
        </div>
      )}
    </div>
  );
};

export default Cart;
