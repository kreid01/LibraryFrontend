import { useState } from "react";
import { IBook, IOrder } from "../assets/Interfaces";
import axios from "axios";
import { useQuery } from "react-query";
import Link from "next/link";

interface Props {
  order: IOrder;
}

const getBooks = async (queryKey: any) => {
  const ids = queryKey.queryKey[1];
  const bookIds = ids.map((id: number, i: number) => {
    if (i === 1) {
      return `bookIds=${id}`;
    }
    return `bookIds=${id}&`;
  });
  const { data } = await axios.get(
    `https://localhost:7147/books/multiple?${bookIds.join("")}`
  );
  return await data;
};

export const Order: React.FC<Props> = ({ order }) => {
  const orders = order.bookIds.toString().split(",");
  const { data, isSuccess } = useQuery<IBook[]>(["book", orders], getBooks);
  let currentDate = new Date().getTime();
  let dateOfOrder = new Date(order.created).getTime();

  return (
    <div className="ml-10 mb-3 border-b-[1px] border-blue-900 pb-3 w-[50vw]">
      <h1 className="font-semibold underline">
        Order from {order.created.substring(0, 7)}:
      </h1>
      {isSuccess &&
        data.map((book, index) => {
          return (
            <div key={index}>
              <h2>{order.isBorrowing ? "Borrowed" : undefined}</h2>
              <h2>Return in</h2>
              <Link href={`/books/${book.id}`}>
                {" "}
                <span className="text-blue-900 font-bold">
                  {book.title}
                </span>{" "}
              </Link>{" "}
              <span className="text-blue-500 font-bold">by {book.author}</span>{" "}
              for <span className=" font-bold">£{book.price}</span>
            </div>
          );
        })}
    </div>
  );
};
