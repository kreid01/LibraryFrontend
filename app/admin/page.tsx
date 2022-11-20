"use client";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";
import { User } from "../registration/page";
import { useState, useEffect } from "react";
import { OrderList } from "../components/orders/OrderList";
import { Button } from "@material-ui/core";
import { IBook } from "../assets/Interfaces";
import { AdminBook } from "./AdminBook";
async function getUsers() {
  const { data } = await axios.get<User[]>(`https://localhost:7147/users`);
  return data;
}

async function getBooks(pageParam: number) {
  const { data } = await axios.get("https://localhost:7147/books/all", {
    params: {
      PageNumber: pageParam,
      PageSize: 30,
    },
  });
  return data as IBook[];
}

export default function AdminPage() {
  const [isViewingUsers, setIsViewingUsers] = useState(true);
  const {
    data: users,
    status,
    isSuccess,
  } = useQuery<User[]>("users", getUsers);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const {
    data: books,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: ({ pageParam = 1 }) => getBooks(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="mx-8 md:mx-16">
      <div className="ml-5 flex justify-around font-bold text-2xl text-blue-900 mb-5">
        <button onClick={() => setIsViewingUsers(true)}>User</button>
        <button onClick={() => setIsViewingUsers(false)}>Books</button>
      </div>
      <div className="ml-5">
        {isSuccess &&
          isViewingUsers &&
          users.map((user: User) => {
            return (
              <div key={user.id}>
                <div className="mb-3 flex justify-between border-b-[1px] border-blue-900 pb-3 w-96">
                  <div>
                    <h2>
                      {user.firstName} {user.lastName}
                    </h2>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <Button style={{ marginTop: "-4px" }}>Delete User</Button>
                    <button className="mx-2" onClick={handleClick}>
                      {open ? "-" : "+"}
                    </button>
                  </div>
                </div>
                {open && (
                  <div>
                    {" "}
                    <OrderList user={user} />
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {books &&
        !isViewingUsers &&
        books?.pages.map((page) =>
          page.map((book) => {
            return <AdminBook key={book.id} book={book} />;
          })
        )}
    </div>
  );
}