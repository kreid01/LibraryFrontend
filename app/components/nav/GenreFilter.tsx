import React from "react";
import { useDispatch } from "react-redux";
import { handleGenreChange } from "../../slices/filterSlice";
import Link from "next/link";

export const GenreFilter: React.FC = () => {
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleGenreChange(e.target.value as string));
  };

  return (
    <div className="mt-[15px] pl-5 pb-[14px] border-b-2  ">
      <div className="flex justify-around evenly">
        <li className="list-none">
          <Link href="/books">
            <input
              value="Novel"
              className="hidden peer"
              id="Novel"
              type="radio"
              name="genreQuery"
              onChange={handleChange}
            />
          </Link>
          <label
            className="profile-link border-b-2 border-red-200"
            htmlFor="Novel"
          >
            Novels
          </label>
        </li>
        <li className="list-none">
          <Link href="/books">
            <input
              name="genreQuery"
              className="hidden peer"
              id="Autobiography"
              value="Autobiography"
              type="radio"
              onChange={handleChange}
            />
          </Link>
          <label
            htmlFor="Autobiography"
            className="profile-link border-b-2 border-orange-200"
          >
            Autobiographies
          </label>
        </li>
        <li className="list-none">
          <Link href="/books">
            <input
              className="hidden peer"
              id="Educational"
              name="genreQuery"
              value="Educational"
              type="radio"
              onChange={handleChange}
            />
          </Link>
          <label
            className="profile-link border-b-2 border-fuchsia-300"
            htmlFor="Educational"
          >
            Educational
          </label>
        </li>
        <li className="list-none">
          <Link href="/books">
            <input
              className="hidden peer"
              name="genreQuery"
              id="Childrens"
              value="Childrens"
              type="radio"
              onChange={handleChange}
            />
          </Link>
          <label
            className="profile-link  border-b-2 border-yellow-200"
            htmlFor="Childrens"
          >
            Childrens
          </label>
        </li>
      </div>
    </div>
  );
};
