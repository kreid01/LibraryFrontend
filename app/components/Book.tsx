import Link from "next/link";
import { useDispatch } from "react-redux";
import { IBook } from "../assets/Interfaces";
import { addToCart } from "../slices/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const Book = ({ book }: any) => {
  const { id, title, author, cover, price, quality } = book || {};
  const dispatch = useDispatch();
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

  return (
    <div className="w-36 h-[45vh] mx-5 my-3 text-center font-medium relative">
      <Link href={`/books/${id}`}>
        {" "}
        <LazyLoadImage
          className="w-36 h-56 rounded-md hover:brightness-60"
          src={cover}
          placeholderSrc={cover}
          effect="blur"
          alt=""
        />
      </Link>
      <h2 className="mb-3">{title}</h2>
      <h5 className="text-gray-500">{author}</h5>
      <p className="text-xs text-gray-400">{condition}</p>
      <p className="text-2xl text-blue-500">£{price}</p>
      <button
        onClick={() => handleCartAdd(book)}
        className="bottom-1 left-0 absolute hover:brightness-60 h-10 w-36 mt-auto bg-blue-900
         rounded-md text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};
