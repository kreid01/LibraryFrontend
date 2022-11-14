import { IBook, IOrder } from "../../assets/Interfaces";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import Link from "next/link";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

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

const deleteOrder = async (id: number) => {
  const { data } = await axios.delete(`https://localhost:7147/orders/${id}`);
  return data;
};

const getOrderDays = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `https://localhost:7147/orders/created?date=${queryKey[1]}`
  );
  return data;
};

export const Order: React.FC<Props> = ({ order }) => {
  const orders = order.bookIds.toString().split(",");
  const user = useSelector((state: RootState) => state.user.value);
  const { data, isSuccess } = useQuery<IBook[]>(["book", orders], getBooks);
  const { mutate, isLoading } = useMutation(deleteOrder, {
    onSuccess: (data) => {},
    onError: () => {
      alert("there was an error");
    },
  });
  const handleOrderCancel = () => {
    mutate(order.id);
  };
  const { data: orderDate } = useQuery(["days", order.created], getOrderDays);

  return (
    <div className="mb-3 border-b-[1px] border-blue-900 pb-3 w-96 md:w-[50vw]">
      <header className="flex justify-between">
        <div className="font-semibold underline">
          {" "}
          Order from {order.created.substring(0, 10)}:
        </div>
        {user.isAdmin && (
          <button onClick={handleOrderCancel}>Cancel Order</button>
        )}
      </header>
      <h2>
        {order.isBorrowing
          ? `Borrowed, return in ${Math.floor(orderDate - 21)} days`
          : null}{" "}
      </h2>
      {isSuccess &&
        data.map((book, index) => {
          return (
            <div key={index}>
              <Link href={`/books/${book.id}`}>
                {" "}
                <span className="text-blue-900 font-bold">
                  {book.title}
                </span>{" "}
              </Link>{" "}
              <span className="text-blue-500 font-bold">by {book.author}</span>{" "}
              for{" "}
              <span className=" font-bold">
                £{order.isBorrowing ? 1 : book.price}
              </span>
            </div>
          );
        })}
    </div>
  );
};
