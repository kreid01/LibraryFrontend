import React from "react";
import { IBook } from "../consts/Interfaces";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../slices/cartSlice";

interface Props {
  book: IBook;
}

export const CartBook: React.FC<Props> = ({ book }) => {
  const { author, title, cover, price, quality, genre, id } = book;
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteFromCart(book));
  };

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
          className="w-36 h-56 rounded-md hover:brightness-60"
        />
      </Link>
      <div className="ml-4 text-sm  font-medium  text-blue-900">
        <h2 className="font-bold text-base mb-3">
          {title} By {author}
        </h2>
        <p className="flex justify-between">
          Price<div className="font-bold text-base">£{price}</div>
        </p>
        <p className="flex justify-between">
          Condition<div className="text-teal-600">{condition}</div>
        </p>
        <p className="flex justify-between">
          Category<div className="text-teal-600">{genre}</div>
        </p>
        <div className="mt-4">
          Qty{" "}
          <input
            className="border-[1px] w-12 ml-4 text-lg"
            type="number"
          ></input>
        </div>
        <button className="mt-4 text-red-500" onClick={handleRemove}>
          Remove Item
        </button>
      </div>
    </div>
  );
};
