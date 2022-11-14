import React from "react";
import { Button } from "@material-ui/core";
import { IBook } from "../../assets/Interfaces";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

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

interface Props {
  bookToUpdate: IBook;
  editBook: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const EditBook: React.FC<Props> = ({
  bookToUpdate,
  editBook,
  handleChange,
}) => {
  const queryClient = useQueryClient();

  const deleteBook = () => {
    axios.delete(`https://localhost:7147/books/${bookToUpdate.id}`);
  };

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

  const submitChanges = () => {
    editBook();
    mutate(bookToUpdate as IBook);
  };

  return (
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
    </div>
  );
};

export default EditBook;
