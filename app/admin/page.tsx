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
<<<<<<< Updated upstream
    <div className="mx-8 md:mx-16">
      <h1 className="font-bold ml-5 my-5 text-2xl text-blue-900">Admin</h1>
=======
    <div className="mx-8 pt-5 md:mx-16">
      <div className="ml-5 flex justify-around font-bold text-2xl text-blue-900 mb-5">
        <button onClick={() => setIsViewingUsers(true)}>User</button>
        <button onClick={() => setIsViewingUsers(false)}>Books</button>
      </div>
>>>>>>> Stashed changes
      <div className="ml-5">
        {isSuccess &&
          data.map((user: User) => {
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
    </div>
  );
}
