import Link from "next/link";
import { useDispatch } from "react-redux";
import { IBook } from "../../assets/Interfaces";
import { addToCart } from "../slices/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from "@material-ui/core";

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
    <div className="w-36 h-[47vh] mx-5 my-3 text-center font-medium relative">
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
      <div className="bottom-1 left-0 absolute h-10 w-36">
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleCartAdd(book)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
