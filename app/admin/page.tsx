"use client";
import axios from "axios";
import { useQuery } from "react-query";
import { User } from "../registration/page";
import { useState } from "react";
import { OrderList } from "../components/orders/OrderList";
import { Button } from "@material-ui/core";

async function getUsers() {
  const { data } = await axios.get<User[]>(`https://localhost:7147/users`);
  return data;
}

export default function AdminPage() {
  const { data, status, isSuccess } = useQuery<User[]>("users", getUsers);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div className="mx-16">
      <h1 className="font-bold ml-5 my-5 text-2xl text-blue-900">Admin</h1>
      <div className="ml-5">
        {isSuccess &&
          data.map((user: User) => {
            return (
              <div key={user.id}>
                <div className="mb-3 flex justify-between border-b-[1px] border-blue-900 pb-3 w-[50vw]">
                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>
                  <p>{user.email}</p>
                  <Button style={{ marginTop: "-4px" }}>Delete User</Button>
                  <button onClick={handleClick}>{open ? "-" : "+"}</button>
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
    </div>
  );
}
