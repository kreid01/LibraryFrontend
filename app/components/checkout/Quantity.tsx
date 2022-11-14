import axios from "axios";
import { useQuery } from "react-query";

async function getBookQuantity({ queryKey }: any) {
  const { data } = await axios.get<number>(
    `https://localhost:7147/books/quantity/${queryKey[1]}`
  );
  return data as number;
}

interface Props {
  id: number;
}

export const Quantity: React.FC<Props> = ({ id }) => {
  const { data, isSuccess } = useQuery<number>(
    ["quantity", id],
    getBookQuantity
  );

  return <div>{data} left!</div>;
};
