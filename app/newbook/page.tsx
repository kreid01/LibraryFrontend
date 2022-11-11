"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { IBook } from "../consts/Interfaces";
import { useForm } from "react-hook-form";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@material-ui/core";

const addBook = async (data: IBook) => {
  const { data: response } = await axios.post(
    `https://localhost:7147/books?Title=${data.title}&Quality=${data.quality}&Author=${data.author}&Pages=${data.pages}&Price=${data.price}&Genre=${data.genre}&Summary=${data.summary}&Published=${data.published}&IsAvailable=true&Cover=${data.cover}`
  );
  return response.data;
};

export default function CreateBook() {
  const initialState = {
    title: "",
    author: "",
    quality: "",
    pages: 0,
    price: 0.0,
    genre: "",
    summary: "",
    published: "",
    cover: "",
  };
  const [bookDetails, setBookDetails] = useState(initialState);
  const { register, handleSubmit } = useForm<IBook>({
    mode: "onChange",
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(addBook, {
    onSuccess: (data) => {
      const message = "success";
      setBookDetails(initialState);
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const onSubmit = (data: IBook) => {
    const book = {
      ...data,
    };
    mutate(book);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto w-[80vw]">
      <h1 className="font-bold ml-20 my-5 text-2xl text-blue-900">
        Add a new book
      </h1>
      <DialogContent>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Title
        </label>
        <TextField
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          {...register("title")}
          variant="outlined"
          margin="dense"
          placeholder="Title"
          name="title"
          id="title"
        ></TextField>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Author
        </label>
        <TextField
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          {...register("author")}
          variant="outlined"
          margin="dense"
          placeholder="Author"
          name="author"
        ></TextField>
        <div className="flex w-full">
          <div className="w-full mr-1">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Published
            </label>
            <TextField
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Published"
              {...register("published")}
              variant="outlined"
              margin="dense"
              name="published"
            ></TextField>
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Price
            </label>
            <TextField
              {...register("price")}
              variant="outlined"
              margin="dense"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="decimal"
              placeholder="Price"
              name="price"
            ></TextField>
          </div>
          <div className="w-full ml-1">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Pages
            </label>
            <TextField
              {...register("pages")}
              variant="outlined"
              margin="dense"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              placeholder="Pages"
              name="pages"
            ></TextField>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-full mr-1">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Quality
            </label>
            <Select
              {...register("quality")}
              variant="outlined"
              margin="dense"
              defaultValue="N"
              className="appearance-none block w-full h-10 bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Quality"
              name="quality"
            >
              <MenuItem value="WR">Well read</MenuItem>
              <MenuItem value="G">Good</MenuItem>
              <MenuItem value="VG">Very good</MenuItem>
              <MenuItem value="N">New</MenuItem>
            </Select>
          </div>
          <div className="w-full mr-1">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Genre
            </label>
            <Select
              {...register("genre")}
              variant="outlined"
              margin="dense"
              className="appearance-none block h-10 w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Genre"
              defaultValue="Novel"
              name="genre"
            >
              <MenuItem value="Novel">Novel</MenuItem>
              <MenuItem value="Non-fiction">Non-fiction</MenuItem>
              <MenuItem value="Educational">Educational</MenuItem>
              <MenuItem value="Childrens">Chilrens</MenuItem>
            </Select>
          </div>
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Summary
        </label>
        <TextField
          {...register("summary")}
          variant="outlined"
          margin="dense"
          className="appearance-none block w-full bg-gray-200 resize-none text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Summary"
          name="summary"
        ></TextField>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Cover Image
        </label>
        <TextField
          {...register("cover")}
          variant="outlined"
          margin="dense"
          className="appearance-none block w-full bg-gray-200 resize-none text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Cover Image URL"
          name="cover"
        />
      </DialogContent>
      <img src={bookDetails.cover as string} alt="" />
      <DialogActions>
        <div className="mr-5 font-bold">
          <Button
            style={{ fontWeight: "bold" }}
            color="primary"
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress color="inherit" size={25} /> : null
            }
          >
            Create
          </Button>
        </div>
      </DialogActions>
    </form>
  );
}
