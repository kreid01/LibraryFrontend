"use client";
import { useInfiniteQuery } from "react-query";
import { useState, useEffect } from "react";
import "../globals.css";
import { IBook } from "../assets/Interfaces";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Book } from "../components/Book";

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

  return (
    <div>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-5 w-[100vw]">
          <div className="grid grid-cols-4 mx-auto mt-5">
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

