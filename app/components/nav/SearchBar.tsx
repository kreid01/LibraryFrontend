import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { handleSearchChange } from "../slices/filterSlice";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleSearchChange(e.target.value as string));
  };

  return (
    <>
      <input
        onChange={(e) => handleChange(e)}
        className="w-[45vw] mg:w-[60vw] rounded-l-md border-[1px] h-10 my-auto border-gray-300"
      ></input>
      <Button
        style={{
          fontWeight: "bold",
          height: "40px",
          margin: "auto 0",
          marginLeft: "-5px",
        }}
        color="primary"
        type="submit"
        variant="contained"
      >
        <Link href="/books">Search</Link>
      </Button>
    </>
  );
};
