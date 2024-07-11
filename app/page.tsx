import Image from "next/image";
import { Shortener } from "./(main)";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl font-bold py-32 text-white">THE SHORTER ONE</h1>
      <Shortener />
    </main>
  );
}
