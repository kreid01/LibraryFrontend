import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementFromCart } from "../../slices/cartSlice";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IBook } from "../../assets/Interfaces";

interface Props {
  book: IBook;
}

export const CheckoutBook: React.FC<Props> = ({ book }) => {
  const { author, title, cover, price, quality, genre, id, stockNumber } = book;
  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  const handleRemove = () => {
    cart.map((book) => {
      if (cart.includes(book)) {
        dispatch(decrementFromCart(book));
      }
    });
  };

  const handleIncrement = () => {
    dispatch(addToCart(book));
  };

  const handleDecrement = () => {
    dispatch(decrementFromCart(book));
  };

  let quantity = 0;
  let subtotal = 0;
  cart.map((cartBook: IBook) => {
    if (
      book.title === cartBook.title &&
      book.quality === cartBook.quality &&
      book.price === cartBook.price
    ) {
      subtotal += book.price;
      quantity++;
    }
  });

  const condition =
    quality === "VG"
      ? "Very good"
      : quality === "G"
      ? "Good"
      : quality === "N"
      ? "New"
      : quality === "WR"
      ? "Well read"
      : null;

  return (
    <div className="mt-4 flex border-b-[1px] pb-6 border-gray-300 justify-between">
      <div className="flex justify-between 300 w-full">
        <div className="flex">
          <Link href={`/books/${id}`}>
            <img
              src={cover}
              alt=""
              className="h-56 rounded-md hover:brightness-60"
            />
          </Link>
          <div className="ml-4 text-sm font-medium -mr-4  text-blue-900">
            <h2 className="font-bold text-base mb-3 w-[80%]">
              {title} By {author}
            </h2>
            <div className="mr-8">
              <div className="flex">
                SKU<div className="text-teal-600 ml-2">{stockNumber}</div>
              </div>
              <div className="flex">
                Condition<div className="text-teal-600 ml-2">{condition}</div>
              </div>
              <div className="flex">
                Category<div className="text-teal-600 ml-2">{genre}</div>
              </div>
              {book?.isBorrowing ? (
                <div className="text-blue-500">Borrowing</div>
              ) : null}
              <button className="mt-4 text-red-500" onClick={handleRemove}>
                Remove Item
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex text-sm">
            <p>£{price}</p>
            <div className="mx-10 w-12 flex">
              <button onClick={handleDecrement}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div className="mx-3">{quantity}</div>
              <button onClick={handleIncrement}>
                {" "}
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <p className="mx-4 w-10">£{subtotal.toFixed(2)} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
