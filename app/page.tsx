import Image from "next/image";
import { Shortener } from "./(main)";
import { VscGithub } from "react-icons/vsc";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex px-12 py-20 lg:m-0 lg:p-48 w-full justify-center">
      <div className="absolute px-12 flex justify-between max-w-[1170px] w-full top-4">
        <p className="font-black text-2xl">
          SHORT
          <span className="text-lime-500 border-b-1 text-outline-1 text-tr border-black">
            ER
          </span>
        </p>
        <Link
          className=" hover:animate-pulse"
          href={`${process.env.PROJECT_LINK}`}
          target="_blank"
        >
          <VscGithub size={30} />
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-10">
        <p className="border px-5 py-2 text-xs rounded-full font-bold bg-lime-300 text-lime-700 ">
          Shrink your links, expand your reach!
        </p>
        <div className="flex flex-col pb-24 text-center items-center space-y-2">
          <h2 className="text-7xl font-bold text-transparent font-outline-1">
            THE SHORT ONE
          </h2>
          <p className="text-xs">Shrink your link, expand your reach!</p>
        </div>
        <Shortener />
      </div>
    </main>
  );
}
