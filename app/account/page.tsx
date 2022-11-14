"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { OrderList } from "../components/orders/OrderList";

export default function AccountPage() {
  const user = useSelector((state: RootState) => state.user.value);
  console.log(user);

  return (
    <div className="mx-8 md:mx-16 ">
      {" "}
      <div className="ml-5">
        <h1 className="font-bold my-5 text-2xl text-blue-900">Account</h1>
        <OrderList user={user} />{" "}
      </div>
    </div>
  );
}
