"use client";
import Link from "next/link";
import { useQuery } from "react-query";
import { useState } from "react";
import "../globals.css";
import { IBook } from "../consts/Interfaces";

async function getBooks() {
  const res = await fetch("https://localhost:7147/books");
  return res.json();
}
export default function BooksPage() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["books", page], getBooks);

  const books = data?.reduce((acc: any, book: IBook) => {
    if (!acc.find((u: IBook) => u.title === book.title)) {
      acc.push(book);
    }
    return acc;
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 mx-auto mt-5">
        {books?.map((book: any) => {
          return <Book key={book.id} book={book} />;
        })}
      </div>
    </div>
  );
}

const Book = ({ book }: any) => {
  const { id, title, author, cover, price, quality } = book || {};

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
    <div className="w-36 h-[45vh] mx-5 my-3 text-center font-medium relative">
      <Link href={`/books/${id}`}>
        {" "}
        <img
          className="w-36 h-56 rounded-md hover:brightness-60"
          src={cover}
          alt=""
        />
      </Link>
      <h2 className="mb-3">{title}</h2>
      <h5 className="text-gray-500">{author}</h5>
      <p className="text-xs text-gray-400">{condition}</p>
      <p className="text-2xl text-blue-500">£{price}</p>
      <button
        className="bottom-1 left-0 absolute hover:brightness-60 h-10 w-36 mt-auto bg-blue-900
       rounded-md text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};
