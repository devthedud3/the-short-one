import Image from "next/image";
import { Shortener } from "./(main)";

export default function Home() {
  return (
    <main className="flex min-h-screen p-24 ">
      <div className="flex flex-col ">
        <h1 className="text-5xl font-bold py-32 gradient-text">
          THE SHORTER ONE
        </h1>
        <Shortener />
      </div>
      <div></div>
    </main>
  );
}
