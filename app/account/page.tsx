"use client";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { JWT } from "../slices/userSlice";

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

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export default function AccountPage() {
  const user = useSelector((state: RootState) => state.user.value);
  const { data, status } = useQuery(["user", user as JWT], getUserById);
  return (
    <div>
      <h1 className="font-bold ml-5 my-5 text-2xl text-blue-900">Account</h1>
    </div>
  );
}
