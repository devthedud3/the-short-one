"use client";
import React, { useEffect, useState } from "react";
import { TbClipboard, TbClipboardCheck, TbQrcode } from "react-icons/tb";
import { isValidLink } from "@/lib/utils";
import QRCode from "qrcode.react";

type Props = {};

const Shortener: React.FC<Props> = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
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

      const { shortUrl } = await response.json();
      setShortUrl(shortUrl);
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
          <pre className="p-4 flex border justify-between w-full bg-black text-lime-300 rounded text-xs">
            <p>{shortUrl}</p>
            <div className="flex space-x-4">
              <button
                className="transition"
                onClick={() => handleCopied(shortUrl)}
              >
                {copied ? (
                  <div className="flex space-x-1">
                    <TbClipboardCheck size={15} />
                    <p className="text-xs">Copied</p>
                  </div>
                ) : (
                  <div className="flex space-x-1">
                    <TbClipboard size={15} />
                    <p className="text-xs">Copy</p>
                  </div>
                )}
              </button>
              <button
                className="transition space-x-1 flex"
                onClick={() => setShowQR(!showQR)}
              >
                <TbQrcode size={15} />
                <p>{showQR ? "Hide " : "SHow "}QR</p>
              </button>
            </div>
          </pre>
        </div>
      )}
      {message && <p className="p-3 text-sm text-red-600">{message}</p>}

      <center
        className={`absolute left-0 right-0 transition-opacity delay-150 my-4 rounded-full ${
          showQR ? "opacity-100" : "opacity-0"
        }`}
      >
        <QRCode value={shortUrl} size={100} level="H" />
      </center>
    </div>
  );
};

export default Shortener;
