"use client";
import React, { useEffect, useState } from "react";
import { TbClipboard, TbClipboardCheck } from "react-icons/tb";
import { isValidLink } from "@/lib/utils";

type Props = {};

const Shortener: React.FC<Props> = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (copied || message) {
      const timer = setTimeout(() => {
        setCopied(false);
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied, message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const handleCopied = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShortUrl("");
    const newUrl = isValidLink(longUrl);
    console.log(newUrl);
    if (!newUrl) {
      setMessage("Enter a valid link");
      return;
    }

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUrl }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
      setLongUrl("");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to shorten the URL");
    }
  };

  return (
    <div className="p-2 text-sm w-full">
      <form className="space-x-4 flex border shadow" onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          name="longUrl"
          onChange={handleInputChange}
          className="outline-none p-3 w-64 flex-1"
          placeholder="https://example.com"
        />
        <button
          type="submit"
          className="transition p-3 border-black bg-lime-300 border shadow hover:scale-110"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4 w-full flex items-center justify-between text-sm space-x-4">
          <p className="p-3 flex-1 border-b border-black text-xs">{shortUrl}</p>
          <button
            className="transition border-4 hover:border-black p-3 rounded-full"
            onClick={() => handleCopied(shortUrl)}
          >
            {copied ? (
              <TbClipboardCheck size={15} />
            ) : (
              <TbClipboard size={15} />
            )}
          </button>
        </div>
      )}
      {message && <p className="p-3 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default Shortener;
