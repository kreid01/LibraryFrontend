"use client";
import Link from "next/link";
import { useQuery } from "react-query";
import { useState } from "react";
import "../globals.css";

async function getBooks() {
  const res = await fetch("https://localhost:7147/books");
  return res.json();
}
export default function BooksPage() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["books", page], getBooks);

  return (
    <div>
      <h1>Books</h1>
      <div>
        {data?.map((book: any) => {
          return <Book key={book.id} book={book} />;
        })}
      </div>
    </div>
  );
}

const Book = ({ book }: any) => {
  const { id, title, author, cover, publisher, pages } = book || {};
  return (
    <Link href={`/books/${id}`}>
      <div>
        <h2>{title}</h2>
        <h5>{author}</h5>
        <img src={cover} alt="" />
      </div>
    </Link>
  );
};
