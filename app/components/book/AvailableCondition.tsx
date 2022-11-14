import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";
import { IBook } from "../../assets/Interfaces";

interface Props {
  book: IBook;
}

const getOtherConditions = async (queryKey: any) => {
  const id = queryKey.queryKey[1];
  const { data } = await axios.get(
    `https://localhost:7147/books/conditions/${id}`
  );
  return data;
};

export const AvailableConditions: React.FC<Props> = ({ book }) => {
  const { id } = book;
  const { data, isSuccess } = useQuery(["books", id], getOtherConditions);
  const [veryGoodBook, setVeryGoodBook] = useState<IBook>();
  const [goodBook, setGoodBook] = useState<IBook>();
  const [newBook, setNewBook] = useState<IBook>();
  const [wellReadBook, setWellReadBook] = useState<IBook>();

  useEffect(() => {
    if (isSuccess)
      data.map((book: IBook) => {
        if (book.quality === "N") {
          setNewBook(book);
        } else if (book.quality === "VG") {
          setVeryGoodBook(book);
        } else if (book.quality === "G") {
          setGoodBook(book);
        } else if (book.quality === "WR") {
          setWellReadBook(book);
        }
      });
  }, [isSuccess]);

  return (
    <div className="mt-3 flex flex-wrap">
      {book.quality !== "N" && newBook && (
        <Link
          className="border-[1px] px-1 py-2 mx-1 my-1 hover:bg-gray-300"
          href={`/books/${newBook?.id}`}
        >
          New
        </Link>
      )}
      {book.quality !== "VG" && veryGoodBook && (
        <Link
          className="border-[1px]  px-2 py-2 mx-1 my-1 hover:bg-gray-300"
          href={`/books/${veryGoodBook?.id}`}
        >
          Very Good
        </Link>
      )}
      {book.quality !== "G" && goodBook && (
        <Link
          className="border-[1px]  px-2  py-2 mx-1 my-1 hover:bg-gray-300"
          href={`/books/${goodBook?.id}`}
        >
          Good
        </Link>
      )}
      {book.quality !== "WR" && wellReadBook && (
        <Link
          className="border-[1px] px-2 py-2 mx-1 my-1 hover:bg-gray-300"
          href={`/books/${wellReadBook?.id}`}
        >
          Well Read
        </Link>
      )}
    </div>
  );
};
