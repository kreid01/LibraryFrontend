"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { IBook } from "../../assets/Interfaces";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addToCart, addBorrowToCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

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
  const { data, status } = useQuery(["books", params.id], getBook);
  const { title, author, cover, price, quality, summary } =
    (data as IBook) || {};

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
    <div className="w-[70vw] mx-auto">
      <div className="pt-10 pb-10 border-b-[1px] border-gray-300 flex">
        <div className="flex-col">
          <img
            className="w-64 h-96 rounded-md"
            src={bookToUpdate?.cover}
            alt=""
          />
          <input
            className="text-xl text-blue-500 mt-3 h-7"
            name="cover"
            value={bookToUpdate?.cover}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="font-bold ml-10">
          <input
            className="text-2xl text-blue-900"
            name="title"
            value={bookToUpdate?.title}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            className="text-2xl text-blue-500"
            name="author"
            value={bookToUpdate?.author}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            name="price"
            value={bookToUpdate?.price}
            onChange={(e) => handleChange(e)}
            className="mt-5 mb-1 text-3xl w-20"
          ></input>
          <p className="text-sm font-normal">
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
          </p>
          <p className="text-sm font-normal">
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
          </p>

          <button
            onClick={deleteBook}
            className=" hover:brightness-60 h-10 w-64 mt-12 bg-red-900 rounded-md text-white"
          >
            Delete
          </button>
          <button
            onClick={editBook}
            className=" hover:brightness-60 h-10 w-64 mt-6 bg-blue-900 rounded-md text-white"
          >
            Cancel
          </button>
          <button
            onClick={submitChanges}
            className=" hover:brightness-60 h-10 w-64 mt-6 bg-blue-900 rounded-md text-white"
          >
            Submit Changes
          </button>
        </div>
      </div>
      <div>
        <h2 className=" border-y-[1px] py-2 text-lg mt-5 font-bold text-blue-900">
          {title} Summary
        </h2>
        <p className="mt-3">{summary}</p>
      </div>
    </div>
  ) : (
    <div className="w-[70vw] mx-auto">
      <div className="pt-10 pb-10 border-b-[1px] border-gray-300 flex">
        <img className="w-64 rounded-md" src={cover} alt="" />
        <div className="font-bold ml-10">
          <h1 className="text-2xl text-blue-900">{title}</h1>
          <h3 className="text-2xl text-blue-500">{author}</h3>
          <h2 className="mt-5 text-3xl ">£{price}</h2>
          <p className="text-sm font-normal">
            Condition -
            <span className="text-blue-500 font-bold">{condition}</span>
          </p>
          <button
            onClick={() => handleCartAdd(data as IBook)}
            className=" hover:brightness-60 h-10 w-64 mt-16 bg-blue-900 rounded-md text-white"
          >
            Add to Cart
          </button>
          <div>
            {" "}
            - or -{" "}
            <button
              onClick={() => handleBorrow(data as IBook)}
              className="block text-blue-500"
            >
              Borrow
            </button>
          </div>
          <button
            onClick={editBook}
            className=" hover:brightness-60 h-10 w-64 mt-16 bg-blue-900 rounded-md text-white"
          >
            Edit
          </button>
        </div>
      </div>
      <div>
        <h2 className=" border-y-[1px] py-2 text-lg mt-5 font-bold text-blue-900">
          {title} Summary
        </h2>
        <p className="mt-3">{summary}</p>
      </div>
    </div>
  );
}
