import Image from "next/image";
import { Shortener } from "./(main)";
import { VscGithub } from "react-icons/vsc";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex p-12 lg:m-0 lg:p-48 w-full justify-center">
      <Link
        className="absolute top-4 right-4 cursor-pointer hover:animate-pulse"
        href={`${process.env.PROJECT_LINK}`}
        target="_blank"
      >
        <VscGithub size={30} />
      </Link>
      <div className="flex flex-col items-center space-y-10">
        <p className="border px-5 py-2 text-xs rounded-full font-bold bg-lime-200 text-lime-700 ">
          Simplify your link while increasing your visibility
        </p>
        <div className="flex flex-col pb-24 text-center items-center space-y-2">
          <h2 className="text-7xl font-bold text-transparent font-outline-1">
            THE SHORT ONE
          </h2>
          <p className="text-xs">
            Enter a URL, make it shorter, and watch it grow
          </p>
        </div>
        <Shortener />
      </div>
    </main>
  );
}
