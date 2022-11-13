"use client";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { JWT } from "../slices/userSlice";
import { Order } from "./Order";
import { IOrder } from "../assets/Interfaces";

async function getUserById(queryKey: any) {
  const { token, userId } = queryKey.queryKey[1];
  const { data } = await axios.get<User>(
    `https://localhost:7147/user/${userId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

async function getUserOrder(queryKey: any) {
  const { userId } = queryKey.queryKey[1];
  const { data } = await axios.get<IOrder[]>(`https://localhost:7147/orders/1`);
  return data;
}

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export default function AccountPage() {
  const user = useSelector((state: RootState) => state.user.value);
  const { data } = useQuery(["orders", user as JWT], getUserOrder);

  return (
    <div>
      <h1 className="font-bold ml-10 my-5 text-2xl text-blue-900">Account</h1>
      {data?.map((order: any) => {
        return <Order key={order.id} order={order} />;
      })}
    </div>
  );
}
