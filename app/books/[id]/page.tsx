"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { IBook } from "../../assets/Interfaces";
import { Suspense, useState, lazy } from "react";
import { addToCart, addBorrowToCart } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AvailableConditions } from "./AvailableCondition";
import { Button } from "@material-ui/core";
import { Quantity } from "./Quantity";

const EditBook = lazy(() => import("./EditBook"));

async function getBook({ queryKey }: any) {
  const { data } = await axios.get<IBook>(
    `https://localhost:7147/books/${queryKey[1]}`
  );
  return data as IBook;
}

export default function BookPage({ params }: any) {
  const dispatch = useDispatch();
  const { data, status, isSuccess } = useQuery(["books", params.id], getBook);
  const { title, author, cover, price, quality, summary, id } =
    (data as IBook) || {};
  const user = useSelector((state: RootState) => state.user.value);
  const [bookToUpdate, setBookToUpdate] = useState<IBook>();
  const [isEditing, setIsEditing] = useState(false);

  const editBook = () => {
    setIsEditing((prevState) => !prevState);
    setBookToUpdate(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBookToUpdate((prevData) => ({
      ...(prevData as IBook),
      [e.target.name]: e.target.value,
    }));
  };

  const handleBorrow = (book: IBook) => {
    dispatch(addBorrowToCart(book));
  };

  const handleCartAdd = (book: IBook) => {
    dispatch(addToCart(book));
  };

  const condition =
    quality === "VG"
      ? "Very good"
      : quality === "G"
      ? "Good"
      : quality === "N"
      ? "New"
      : quality === "WR"
      ? "Well read"
      : null;

  return isEditing ? (
    <Suspense fallback={<div>loading...</div>}>
      <EditBook
        handleChange={handleChange}
        bookToUpdate={bookToUpdate as IBook}
        editBook={editBook}
      />
    </Suspense>
  ) : (
    <div className="w-[70vw] mx-auto md:w-[80vw] lg:w-[55vw]">
      <div className="pt-10 pb-10 border-b-[1px] border-gray-300 flex flex-col md:flex-row">
        <img
          className="w-56 h-80  md:h-96 rounded-md md:w-64 mx-auto lg:mx-auto"
          src={cover}
          alt=""
        />
        <div className="font-bold md:ml-5 flex flex-col w-full mx-auto md:">
          <h1 className="text-xl md:text-2xl text-blue-900 mt-5 md:mt-0">
            {title} by <span className="text-blue-500">{author}</span>
          </h1>
          <h3 className="text-xl md:text-2xl  text-blue-500"></h3>
          <h2 className="mt-2 md:mt-5  text-2xl md:text-3xl">£{price}</h2>
          <div className="text-sm font-normal">
            Condition -
            <span className="text-blue-500 font-bold">{condition}</span>
          </div>
          <Quantity id={id} />
          <div className="mt-3 md:mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCartAdd(data as IBook)}
              className="h-10 w-full "
            >
              Add to Cart
            </Button>
          </div>
          <div>
            {" "}
            - or -{" "}
            <button
              onClick={() => handleBorrow(data as IBook)}
              className=" text-blue-500"
            >
              Borrow
            </button>
          </div>
          {isSuccess && <AvailableConditions book={data as IBook} />}
          <div className="mt-6">
            <Button
              onClick={editBook}
              variant="contained"
              color="primary"
              className="  h-10 w-full "
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h2 className=" border-y-[1px] py-2 text-lg mt-5 font-bold text-blue-900">
          {title} Summary
        </h2>
        <div className="mt-3">{summary}</div>
      </div>
    </div>
  );
}
