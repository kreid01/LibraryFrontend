"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { IBook } from "./assets/Interfaces";
import { Book } from "./components/book/Book";
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

export default function HomePage() {
  const { data } = useQuery("books", getBooks);
  const { data: autobiography } = useQuery("autos", getAutobiographies);

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
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
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
    <div className="w-[100vw] ">
      <div className="mx-auto md:w-[70vw] mt-5 ">
        <div className="mb-5 border-b-[1px] border-blue-900 pb-10 grid grid-cols-2 lg:grid-cols-3 w-[90vw] md:w-[60vw] gap-2 lg:gap-3 mx-auto lg:w-[60vw] lg:mr-[150px]">
          <img
            className="w-52 h-52 lg:h-[20vw] lg:w-[20vw]  rounded-md"
            src="https://images.ctfassets.net/fxjn30k1sseo/3UOtXGcOeUq1r6yvrW6fb5/a27b74f9a7273fe9f3dd6f2ec7f623da/Xmas_homepage_tile_.jpg"
            alt=""
          ></img>
          <img
            className="w-52 h-52  lg:h-[20vw] lg:w-[20vw]  rounded-md"
            src="https://img-cdn.inc.com/image/upload/w_1920,h_1080,c_fill/images/panoramic/GettyImages-577674005_492115_zfpgiw.jpg"
            alt=""
          />
          <img
            className="  lg:h-[20vw] lg:w-[20vw]  rounded-md hidden lg:block"
            src="https://images.ctfassets.net/fxjn30k1sseo/2Orj31RbQUhbRzwAGljz6X/86a048040fe89b8e1e954e93cda46fd5/Sustainability_TopCard_Middle.png"
            alt=""
          />
        </div>
        <h1 className="font-bold ml-5 my-5 text-2xl text-blue-900">
          Featured Books
        </h1>
        <div className="border-b-[1px] border-blue-900 md:w-[60vw] ">
          <Slider {...settings}>
            {data && data?.map((book) => <Book key={book.id} book={book} />)}
          </Slider>
        </div>
        <h1 className="font-bold ml-5 my-5 text-2xl text-blue-900">
          Best Sellers
        </h1>
        <div className="border-b-[1px] border-blue-900  md:w-[60vw] ">
          <Slider {...settings}>
            {autobiography &&
              autobiography?.map((book) => <Book key={book.id} book={book} />)}
          </Slider>
        </div>
      </div>
    </div>
  );
}
