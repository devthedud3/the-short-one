import Image from "next/image";
import { Shortener } from "./(main)";

export default function Home() {
  return (
    <main className="flex min-h-screen p-12 lg:m-0 lg:p-48 w-full justify-center">
      <div className="flex flex-col items-center space-y-10">
        <p className="border px-5 py-2 text-xs rounded-full font-bold bg-lime-200 text-lime-700 ">
          Simplify your link while increasing your visibility
        </p>
        <div className="flex flex-col pb-24 text-center">
          <h2 className="text-7xl font-bold text-transparent font-outline-1">
            THE SHORTER ONE
          </h2>
          <p className="text-xs">
            Enter a URL, make it shorter, and see what we mean.
          </p>
        </div>
        <Shortener />
      </div>
      {/* <div></div> */}
    </main>
  );
}
