import React from "react";
import { IBook } from "../../assets/Interfaces";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementFromCart } from "../../slices/cartSlice";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  book: IBook;
}

export const CartBook: React.FC<Props> = ({ book }) => {
  const { author, title, cover, price, quality, genre, id } = book;
  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  const handleRemove = () => {
    cart.map((book) => {
      if (cart.includes(book)) {
        dispatch(decrementFromCart(book));
      }
    });
  };

  const handleIncrement = (book: IBook) => {
    dispatch(addToCart(book));
  };

  const handleDecrement = (book: IBook) => {
    dispatch(decrementFromCart(book));
  };

  let quantity = 0;
  cart.map((cartBook: IBook) => {
    if (
      book.title === cartBook.title &&
      book.quality === cartBook.quality &&
      book.price === cartBook.price
    )
      quantity++;
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
    <div className="ml-4 mt-4 flex border-b-[1px] pb-6 border-gray-300">
      <Link href={`/books/${id}`}>
        <img
          src={cover}
          alt=""
          className="h-56 w-40 hidden md:visible rounded-md hover:brightness-60"
        />
      </Link>
      <div className="ml-4 text-sm font-medium -mr-4 w-[80%]  text-blue-900">
        <h2 className="font-bold text-base mb-3 w-[80%]">
          {title} By {author}
        </h2>
        <div className="mr-8">
          <div className="flex justify-between">
            Price<div className="font-bold text-base">£{price}</div>
          </div>
          <div className="flex justify-between">
            Condition<div className="text-teal-600">{condition}</div>
          </div>
          <div className="flex justify-between">
            Category<div className="text-teal-600">{genre}</div>
          </div>
          {book?.isBorrowing ? (
            <div className="text-blue-500">Borrowing</div>
          ) : null}
        </div>
        <div className="mt-4 flex">
          Qty{" "}
          <div className="font-bold ml-3 flex">
            <button onClick={() => handleDecrement(book)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="mx-3">{quantity}</div>
            <button onClick={() => handleIncrement(book)}>
              {" "}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <button className="mt-4 text-red-500" onClick={handleRemove}>
          Remove Item
        </button>
      </div>
    </div>
  );
};
