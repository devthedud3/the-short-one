"use client";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Shortener({}: Props) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLongUrl(e.target.value);
  }

  function handleCopied(e: string) {
    navigator.clipboard.writeText(e);
    setCopied(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const regex = /^(https?:\/\/|www\.)[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+/;
    console.log(regex.test(longUrl), longUrl);
    if (!regex.test(longUrl)) return;

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: longUrl }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { shortUrl } = await response.json();
      setShortUrl(shortUrl);
    } catch (error) {
      console.error("Error:", error);
    }
    setLongUrl("");
  }

  return (
    <div className="p-2 text-sm ">
      <form className="space-x-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          name="longUrl"
          onChange={handleInputChange}
          className="outline-none p-2 w-64 border"
          placeholder="Enter link"
        />
        <button
          type="submit"
          className="transition p-2  bg-pink-300 border-none text-black"
        >
          THE SHORTER ONE
        </button>
      </form>
      {shortUrl && (
        <div className="mt-2 w-full flex items-center text-sm text-white space-x-4">
          <p>{shortUrl}</p>
          <button
            className={`border p-3 ${copied && "bg-white text-black"}`}
            onClick={() => handleCopied(shortUrl)}
          >
            {copied ? "Copied" : "Copy to Clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}
