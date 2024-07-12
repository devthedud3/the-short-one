"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Loader } from "../(main)";

type Props = {
  id: string;
};

export default function Page({ params: { id } }: { params: Props }) {
  const router = useRouter();
  let n = 0;
  useEffect(() => {
    n++;
    if (n > 1) return;
    console.log("checking:", n);
    async function redirect() {
      try {
        const [linkResponse, updateResponse] = await Promise.all([
          fetch(`/api/${id}`, { method: "GET" }),
          fetch(`/api/${id}`, { method: "PUT" }),
        ]);

        const [{ longUrl }, { message }] = await Promise.all([
          linkResponse.json(),
          updateResponse.json(),
        ]);

        longUrl && router.replace(longUrl);
      } catch (err) {
        console.log(err);
      }
    }
    redirect();
  }, [id, router]);
  return (
    <main className="flex">
      <Loader />
    </main>
  );
}
