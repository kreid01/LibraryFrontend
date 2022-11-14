import { useQuery } from "react-query";
import axios from "axios";

import { JWT } from "../../slices/userSlice";
import { Order } from "./Order";
import { IOrder } from "../../assets/Interfaces";
import { User } from "../../registration/page";

async function getUserOrder(queryKey: any) {
  const { userId, id } = queryKey.queryKey[1];
  let user = 0;
  if (userId) {
    user = userId;
  } else if (id) {
    user = id;
  }
  const { data } = await axios.get<IOrder[]>(
    `https://localhost:7147/orders/${user}`
  );
  return data;
}

interface Props {
  user: JWT | User;
}

export const OrderList: React.FC<Props> = ({ user }) => {
  const { data } = useQuery(["orders", user as JWT | User], getUserOrder);

  return (
    <div>
      {data?.map((order: any) => {
        return <Order key={order.id} order={order} />;
      })}
    </div>
  );
};
