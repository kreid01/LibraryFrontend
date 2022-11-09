"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { IBook } from "../../consts/Interfaces";

async function getBook({ queryKey }: any) {
  console.log(queryKey);
  const { data } = await axios.get<IBook>(
    `https://localhost:7147/books/${queryKey[1]}`
  );
  return data as IBook;
}
export default function BookPage({ params }: any) {
  const { data, status } = useQuery(["books", params.id], getBook);

  return (
    <div>
      <h1>{data?.title}</h1>
      <div>
        <h5>{data?.author}</h5>
        <img src={data?.cover} alt="" />
      </div>
    </div>
  );
}
