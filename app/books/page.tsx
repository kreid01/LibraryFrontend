"use client";
import { useInfiniteQuery } from "react-query";
import { useState, useEffect } from "react";
import "../globals.css";
import { IBook } from "../assets/Interfaces";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
<<<<<<< Updated upstream
import { Book } from "../components/Book";
=======
import { Book } from "../components/book/Book";
import { Select, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
>>>>>>> Stashed changes

type Query = {
  searchQuery: string;
  genreQuery: string;
};

async function getBooks(queryKey: any, pageParam: number) {
  const { searchQuery, genreQuery } = queryKey;
  const { data } = await axios.get("https://localhost:7147/books", {
    params: {
      SearchQuery: searchQuery,
      GenreFilter: genreQuery,
      PageNumber: pageParam,
      PageSize: 10,
    },
  });
  return data as IBook[];
}
export default function BooksPage() {
  const queryState = useSelector((state: RootState) => state.filter.value);
  const [query, setQuery] = useState({
    searchQuery: "",
    genreQuery: "",
  });

  useEffect(() => {
    setQuery(queryState as Query);
  }, [queryState.genreQuery, queryState.searchQuery]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["books", query as Query],
    queryFn: ({ pageParam = 1 }) => getBooks(query, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

<<<<<<< Updated upstream
  return (
    <div>
=======
  const handleSortChange = (e: any) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      sortQuery: e.target.value,
    }));
  };

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div className="ml-5 h-8 py-7">
        <FontAwesomeIcon icon={faSort} onClick={handleClick} className="mr-3" />
        {open && (
          <Select
            variant="outlined"
            margin="dense"
            style={{ width: "250px" }}
            className="appearance-none block h-10 w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Sort"
            defaultValue=""
            name="sort"
            onChange={handleSortChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Price+">Price Ascending</MenuItem>
            <MenuItem value="Price-">Price Descending</MenuItem>
            <MenuItem value="Release+">Release Year Ascending</MenuItem>
            <MenuItem value="Release-">Release Year Descending</MenuItem>
          </Select>
        )}
      </div>
>>>>>>> Stashed changes
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-5 w-[100vw]">
          <div className="grid grid-cols-2  md:grid-cols-4 w-[85vw] lg:grid-cols-5 lg:w-[80vw] mx-auto mt-5 pr-16">
            {isSuccess &&
              data?.pages.map((page) =>
                page.map((book) => <Book key={book.id} book={book} />)
              )}
          </div>
          <div className="ml-5">
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </div>
          <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </div>
      )}
    </div>
  );
}

