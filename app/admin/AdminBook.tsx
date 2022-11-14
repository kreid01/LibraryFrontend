import React from "react";
import { IBook, IOrder } from "../assets/Interfaces";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";

interface Props {
  book: IBook;
}

const getOrder = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `https://localhost:7147/orders/fromBook?id=${queryKey[1]}`
  );
  return data;
};

const getOrderDays = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `https://localhost:7147/orders/created?date=${queryKey[1].created}`
  );
  return data;
};

export const AdminBook: React.FC<Props> = ({ book }) => {
  const { data: order } = useQuery<IOrder>(["order", book.id], getOrder);
  const { data: orderDate } = useQuery(["days", order], getOrderDays, {
    enabled: !!order,
  });
  return (
    <div>
      {" "}
      <Link href={`/books/${book.id}`}>
        <div className="ml-5 my-3 py-3 border-y-[1px] border-gray-300 grid grid-cols-2">
          <div className="">
            {book.stockNumber}: {book.title} by {book.author}
            <div>
              Currently owned by user:{" "}
              {book.currentOwnerId === 0 ? (
                <span className="font-bold">Library</span>
              ) : (
                <span className="font-bold">{book.currentOwnerId}</span>
              )}
            </div>
          </div>{" "}
          <div className="ml-5">
            {order?.isBorrowing
              ? `Borrowed, due in ${Math.floor(orderDate + 21)} days`
              : book.currentOwnerId != 0 && order?.created != null
              ? `Bought on ${order?.created.substring(0, 10)}`
              : null}
          </div>
        </div>
      </Link>
    </div>
  );
};
