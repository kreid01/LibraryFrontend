"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { IBook } from "./consts/Interfaces";
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

export default function HomePage() {
  const { data } = useQuery("books", getBooks);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="mx-16">
      <h1 className="font-bold ml-5 my-5 text-2xl text-blue-900">
        Featured Books
      </h1>
      <Slider {...settings}>
        {data?.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Slider>
    </div>
  );
}
