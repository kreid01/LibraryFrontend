"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { IBook } from "../../assets/Interfaces";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addToCart, addBorrowToCart } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AvailableConditions } from "./AvailableCondition";
import { Button } from "@material-ui/core";

async function getBook({ queryKey }: any) {
  const { data } = await axios.get<IBook>(
    `https://localhost:7147/books/${queryKey[1]}`
  );
  return data as IBook;
}

const updateBook = async (data: IBook) => {
  const {
    title,
    author,
    cover,
    price,
    quality,
    summary,
    pages,
    published,
    isAvailable,
    stockNumber,
    genre,
    id,
  } = (data as IBook) || {};
  console.log(data);

  const { data: response } = await axios.put<IBook>(
    `https://localhost:7147/books?Id=${id}&Title=${title}&StockNumber=${stockNumber}&Quality=${quality}&Author=${author}&Pages=${pages}&Price=${price}&Genre=${genre}&Summary=${summary}&Published=${published}&IsAvailable=${isAvailable}&Cover=${cover}`
  );
  return response;
};

export default function BookPage({ params }: any) {
  const dispatch = useDispatch();
  const { data, status, isSuccess } = useQuery(["books", params.id], getBook);
  const { title, author, cover, price, quality, summary } =
    (data as IBook) || {};
  const user = useSelector((state: RootState) => state.user.value);
  const [bookToUpdate, setBookToUpdate] = useState<IBook>();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateBook, {
    onSuccess: (data) => {
      const message = "success";
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const deleteBook = () => {
    axios.delete(`https://localhost:7147/books/${data?.id}`);
  };

  const editBook = () => {
    setIsEditing((prevState) => !prevState);
    setBookToUpdate(data);
  };

  const submitChanges = () => {
    setIsEditing(false);
    mutate(bookToUpdate as IBook);
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
    <div className="w-[70vw] mx-auto md:w-[80vw] lg:w-[55vw]">
      <div className="pt-10 pb-10 border-b-[1px] border-gray-300 flex flex-col md:flex-row  mx-auto">
        <div className="flex-col lg:mx-auto">
          <img
            className="w-48 h-72 md:h-96 rounded-md mx-auto md:w-64"
            src={bookToUpdate?.cover}
            alt=""
          />
          <input
            className="text-xl text-blue-500 mx-auto md:w-64 w-48 mt-3 h-7"
            name="cover"
            value={bookToUpdate?.cover}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="font-bold md:ml-5 w-[70vw] md:w-[50vw] lg:w-[30vw] mx-auto ">
          <div className="flex flex-wrap mx-auto">
            <input
              className="text-xl md:text-2xl w-full h-10 break-words  text-blue-900"
              name="title"
              value={bookToUpdate?.title}
              onChange={(e) => handleChange(e)}
            ></input>
            <input
              className="text-xl md:text-2xl  text-blue-500"
              name="author"
              value={bookToUpdate?.author}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <input
            name="price"
            value={bookToUpdate?.price}
            onChange={(e) => handleChange(e)}
            className="mt-2 md:mt-5  text-2xl md:text-3xl "
          ></input>
          <div className="text-sm font-normal">
            Condition -
            <select
              name="quality"
              onChange={(e) => handleChange(e)}
              className="text-blue-500 font-bold"
            >
              <option value="WR">Well read</option>
              <option value="G">Good</option>
              <option value="VG">Very good</option>
              <option value="N">New</option>
            </select>
          </div>
          <div className="text-sm font-normal">
            Genre -
            <select
              name="genre"
              onChange={(e) => handleChange(e)}
              className="text-blue-500 font-bold"
            >
              <option value="Novel">Novel</option>
              <option value="Autobiography">Autobiography</option>
              <option value="Educational">Educational</option>
              <option value="Childrens">Childrens</option>
            </select>
          </div>
          <div className="mt-2 md:mt-12">
            <Button
              color="primary"
              variant="contained"
              onClick={deleteBook}
              className="h-10 w-full  bg-red-900 rounded-md"
            >
              Delete
            </Button>
          </div>
          <div className="mt-2 md:mt-6">
            <Button
              color="primary"
              variant="contained"
              onClick={editBook}
              className=" h-10 w-full "
            >
              Cancel
            </Button>
          </div>
          <div className="mt-2 md:mt-6">
            <Button
              color="primary"
              variant="contained"
              onClick={submitChanges}
              className="h-10 w-full "
            >
              Submit Changes
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
          <div className="mt-3 md:mt-12">
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
          {user.isAdmin && (
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
          )}
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
