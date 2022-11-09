"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { IBook } from "../consts/Interfaces";
import { useForm } from "react-hook-form";

import {
  Button,
  TextField,
  Dialog,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    console.log(data);
    const book = {
      ...data,
    };
    mutate(book);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {" "}
      <h3>Add a new book</h3>
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
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Quality
      </label>
      <TextField
        {...register("quality")}
        variant="outlined"
        margin="dense"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder="Quality"
        name="quality"
      >
        <MenuItem value="WR">Well read</MenuItem>
        <MenuItem value="G">Good</MenuItem>
        <MenuItem value="VG">Very good</MenuItem>
        <MenuItem value="N">New</MenuItem>
      </TextField>
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
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Genre
      </label>
      <Select
        {...register("genre")}
        variant="outlined"
        margin="dense"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder="Genre"
        name="genre"
      >
        <MenuItem value="Novel">Novel</MenuItem>
        <MenuItem value="Autobiography">Non-fiction</MenuItem>
        <MenuItem value="Educational">Educational</MenuItem>
        <MenuItem value="Childrens">Chilrens</MenuItem>
      </Select>
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
        Cover Image s
      </label>
      <TextField
        {...register("cover")}
        variant="outlined"
        margin="dense"
        className="appearance-none block w-full bg-gray-200 resize-none text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder="Cover Image URL"
        name="cover"
      />
      <img src={bookDetails.cover as string} alt="" />
      <DialogActions>
        <Button
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
      </DialogActions>
    </form>
  );
}
