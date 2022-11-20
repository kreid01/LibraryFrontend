"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { IBook } from "./assets/Interfaces";
import { Book } from "./components/Book";
import { useQuery } from "react-query";

async function getBooks() {
  const { data } = await axios.get("https://localhost:7147/books", {
    params: {
      SearchQuery: "Haruki",
      PageNumber: 1,
      PageSize: 10,
    },
  });
  return data as IBook[];
}

async function getAutobiographies() {
  const { data } = await axios.get("https://localhost:7147/books", {
    params: {
      GenreFilter: "Autobiography",
      PageNumber: 1,
      PageSize: 10,
    },
  });
  return data as IBook[];
}

async function getEducational() {
  const { data } = await axios.get("https://localhost:7147/books", {
    params: {
      GenreFilter: "Educational",
      PageNumber: 1,
      PageSize: 10,
    },
  });
  return data as IBook[];
}

export default function HomePage() {
  const { data } = useQuery("books", getBooks);
  const { data: autobiography } = useQuery("autos", getAutobiographies);
  const { data: education } = useQuery("education", getEducational);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-[100vw] lg:w-[80vw] mx-auto">
      <div className="mx-auto pt-5 -ml-5 ">
        <div className="mb-5 border-b-[1px] border-blue-900 pb-8 mx-auto">
          <img
            className="w-[100%] mx-auto h-52 rounded-md "
            src="https://www.signsworldwide.com/blog/wp-content/uploads/2016/12/Signs-World-Wide-Christmas-Sale-Banner-Image.jpg"
            alt=""
          ></img>
        </div>
        <div
          className="h-14 bg-gradient-to-r from-sky-500 to-indigo-500 w-[85vw] mx-auto font-bold text-center
        flex flex-col justify-center text-xl text-white"
        >
          Store Delivery only £1.99, Collection is Free!
        </div>
        <h1 className="my-5 text-2xl md:ml-[78px]  text-center md:text-left   text-blue-900 font-bold">
          Featured Books
        </h1>
        <div className="border-b-[1px] mx-auto  h-[55vh]  border-blue-900 md:w-[85vw]">
          <Slider {...settings}>
            {data &&
              education?.map((book) => <Book key={book.id} book={book} />)}
          </Slider>
        </div>
        <h1 className="my-5 text-2xl md:ml-[78px] text-center md:text-left   text-blue-900 font-bold">
          Best Sellers
        </h1>
        <div className="border-b-[1px] mx-auto h-[55vh]  border-blue-900 md:w-[85vw]">
          <Slider {...settings}>
            {autobiography &&
              autobiography?.map((book) => <Book key={book.id} book={book} />)}
          </Slider>
        </div>
        <h1 className="my-5 text-2xl md:ml-[78px] text-center  md:text-left  text-blue-900 font-bold">
          Site Favourites
        </h1>
        <div className="border-b-[1px] mx-auto h-[55vh] overflow-y-hidden  border-blue-900 md:w-[85vw]">
          <Slider {...settings}>
            {data && data?.map((book) => <Book key={book.id} book={book} />)}
          </Slider>
        </div>
      </div>
    </div>
  );
}
