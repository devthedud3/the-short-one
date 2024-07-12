import Image from "next/image";
import { Shortener } from "./(main)";

export default function Home() {
  return (
    <main className="flex min-h-screen p-36 w-full justify-center">
      <div className="flex flex-col items-center space-y-10">
        <p className="border px-5 py-2 rounded-full font-bold bg-lime-200 text-lime-700 ">
          Simplify your link while increasing your visibility
        </p>
        <div className="relative flex items-end">
          <h2 className="text-6xl font-bold text-transparent font-outline-1 mb-24">
            THE SHORTER ONE
          </h2>
        </div>
        <Shortener />
      </div>
      {/* <div></div> */}
    </main>
  );
}
