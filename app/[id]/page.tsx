"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type Props = {
  id: string;
};

export default function Page({ params: { id } }: { params: Props }) {
  const [urlId, setUrlId] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function redirect() {
      try {
        const response = await fetch(`http://localhost:3000/api/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { longUrl } = await response.json();
        router.replace("https://www.google.com");
      } catch (err) {
        console.log(err);
      }
    }
    redirect();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-white">
      {urlId && (
        <p>This the ID used to find the target in the database: {id}</p>
      )}
    </main>
  );
}
