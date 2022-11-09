import Link from "next/link";

export default function SearchBar() {
  return (
    <>
      <input className="w-[60vw] rounded-l-md border-[1px] h-10 my-auto border-gray-300"></input>
      <button className="my-auto w-[10vw] rounded-md bg-blue-800 h-10 -ml-2 text-white font-bold text-lg">
        <Link href="/books">Search</Link>
      </button>
    </>
  );
}
